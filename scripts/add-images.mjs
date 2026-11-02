#!/usr/bin/env node
// Prepares source images for a case study.
//
//   pnpm add-images <slug> <image-or-folder> [...more]
//
// For each source it writes, into public/work/<slug>/:
//   <name>-800.webp, <name>-1600.webp, <name>-2880.webp
// and records its dimensions and a tiny blur placeholder in
// src/content/work/<slug>.images.json, which the case study imports.
//
// - An image named `cover` also gets <name>-share.jpg (1200×630) for link previews.
// - GIFs are copied untouched, so their animation survives.
// - SVG is rejected: nothing is written if any source is an SVG.
// - Sources are never enlarged: a narrower source skips the widths above its own.
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

export const WIDTHS = [800, 1600, 2880];
const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class AddImagesError extends Error {}

/** `Spread 02 (final).PNG` becomes `spread-02-final`. */
export function imageName(file) {
  const name = basename(file, extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!name) throw new AddImagesError(`Cannot name an image from "${file}".`);
  return name;
}

async function expand(sources) {
  const files = [];
  for (const source of sources) {
    const path = resolve(source);
    const info = await stat(path).catch(() => null);
    if (!info) throw new AddImagesError(`Source not found: ${source}`);
    if (info.isDirectory()) {
      const entries = await readdir(path);
      for (const entry of entries.sort()) {
        if (!entry.startsWith('.')) files.push(join(path, entry));
      }
    } else {
      files.push(path);
    }
  }
  return files;
}

async function blurOf(input, options) {
  const buffer = await sharp(input, options)
    .resize({ width: 20 })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

export async function addImages({ slug, sources, root = process.cwd() }) {
  if (!slug || !SLUG.test(slug)) {
    throw new AddImagesError(`Slug must be kebab-case, like "harbour-almanac". Got "${slug ?? ''}".`);
  }
  const files = await expand(sources);
  if (files.length === 0) throw new AddImagesError('No source images given.');

  // Check everything first, so a bad source leaves the project untouched.
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (ext === '.svg') {
      throw new AddImagesError(
        `SVG is not accepted: ${basename(file)}. Export it to PNG at 2880 px wide first.`
      );
    }
    if (ext !== '.gif' && !RASTER.has(ext)) {
      throw new AddImagesError(`Unsupported image type: ${basename(file)}.`);
    }
  }

  const outDir = join(root, 'public', 'work', slug);
  const manifestPath = join(root, 'src', 'content', 'work', `${slug}.images.json`);
  await mkdir(outDir, { recursive: true });
  await mkdir(join(root, 'src', 'content', 'work'), { recursive: true });
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'));
  const base = `/work/${slug}`;

  for (const file of files) {
    const name = imageName(file);
    const ext = extname(file).toLowerCase();

    if (ext === '.gif') {
      await copyFile(file, join(outDir, `${name}.gif`));
      const meta = await sharp(file, { animated: true }).metadata();
      manifest[name] = {
        format: 'gif',
        src: `${base}/${name}.gif`,
        width: meta.width,
        height: meta.pageHeight ?? meta.height,
        widths: [],
        blur: await blurOf(file)
      };
      console.log(`  ${name}.gif  kept as is`);
      continue;
    }

    // `rotate()` applies EXIF orientation before the dimensions are read.
    const { data, info } = await sharp(file).rotate().toBuffer({ resolveWithObject: true });
    const widths = WIDTHS.filter((width) => width <= info.width);
    if (widths.length === 0) widths.push(info.width);
    let height = 0;
    for (const width of widths) {
      const out = await sharp(data)
        .resize({ width })
        .webp({ quality: width >= 2880 ? 74 : 80, effort: 5 })
        .toFile(join(outDir, `${name}-${width}.webp`));
      height = out.height;
      console.log(`  ${name}-${width}.webp  ${out.width}×${out.height}  ${Math.round(out.size / 1024)} KB`);
    }
    if (info.width < 2880) {
      console.warn(`  note: ${name} is ${info.width} px wide, so widths above that were skipped.`);
    }

    manifest[name] = {
      format: 'webp',
      base: `${base}/${name}`,
      width: widths.at(-1),
      height,
      widths,
      blur: await blurOf(data)
    };

    if (name === 'cover') {
      const share = await sharp(data)
        .resize(1200, 630, { fit: 'cover', position: 'centre' })
        .flatten({ background: '#f4eee1' })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(join(outDir, 'cover-share.jpg'));
      manifest[name].share = `${base}/cover-share.jpg`;
      console.log(`  cover-share.jpg  1200×630  ${Math.round(share.size / 1024)} KB`);
    }
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`Wrote ${files.length} image(s) to public/work/${slug}/ and src/content/work/${slug}.images.json`);
  return sorted;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [slug, ...sources] = process.argv.slice(2);
  addImages({ slug, sources }).catch((error) => {
    if (error instanceof AddImagesError) {
      console.error(`add-images: ${error.message}`);
      console.error('Usage: pnpm add-images <slug> <image-or-folder> [...more]');
    } else {
      console.error(error);
    }
    process.exit(1);
  });
}
