import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { addImages, imageName } from '../scripts/add-images.mjs';

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'add-images-'));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

const png = async (name: string, width: number, height: number) => {
  const path = join(root, name);
  await sharp({
    create: { width, height, channels: 3, background: '#6e1423' }
  })
    .png()
    .toFile(path);
  return path;
};

describe('add-images', () => {
  it('writes three WebP widths, dimensions, and a blur placeholder', async () => {
    const source = await png('Spread 02.PNG', 3000, 2000);
    const manifest = await addImages({ slug: 'a-book', sources: [source], root });
    const entry = manifest['spread-02'];
    expect(entry.widths).toEqual([800, 1600, 2880]);
    expect(entry.width).toBe(2880);
    expect(entry.height).toBe(1920);
    expect(entry.blur).toMatch(/^data:image\/webp;base64,/);
    for (const width of entry.widths) {
      const file = join(root, 'public/work/a-book', `spread-02-${width}.webp`);
      expect((await sharp(file).metadata()).width).toBe(width);
    }
    expect(
      existsSync(join(root, 'src/content/work/a-book.images.json'))
    ).toBe(true);
  });

  it('gives only an image named cover a 1200×630 share JPG', async () => {
    const cover = await png('cover.png', 3000, 2000);
    const other = await png('other.png', 3000, 2000);
    const manifest = await addImages({ slug: 'a-book', sources: [cover, other], root });
    expect(manifest.cover.share).toBe('/work/a-book/cover-share.jpg');
    expect(manifest.other.share).toBeUndefined();
    const meta = await sharp(join(root, 'public/work/a-book/cover-share.jpg')).metadata();
    expect([meta.width, meta.height, meta.format]).toEqual([1200, 630, 'jpeg']);
  });

  it('does not enlarge a small source', async () => {
    const source = await png('small.png', 1000, 500);
    const manifest = await addImages({ slug: 'a-book', sources: [source], root });
    expect(manifest.small.widths).toEqual([800]);
    expect(existsSync(join(root, 'public/work/a-book/small-1600.webp'))).toBe(false);
  });

  it('copies GIFs byte for byte', async () => {
    const source = join(root, 'loop.gif');
    await sharp({ create: { width: 40, height: 20, channels: 3, background: '#000' } })
      .gif()
      .toFile(source);
    const manifest = await addImages({ slug: 'a-book', sources: [source], root });
    expect(manifest.loop.format).toBe('gif');
    expect(manifest.loop.width).toBe(40);
    const [before, after] = await Promise.all([
      readFile(source),
      readFile(join(root, 'public/work/a-book/loop.gif'))
    ]);
    expect(after.equals(before)).toBe(true);
  });

  it('rejects SVG and writes nothing', async () => {
    const good = await png('good.png', 1000, 500);
    const svg = join(root, 'logo.svg');
    await writeFile(svg, '<svg xmlns="http://www.w3.org/2000/svg"/>');
    await expect(
      addImages({ slug: 'a-book', sources: [good, svg], root })
    ).rejects.toThrow(/SVG/);
    expect(existsSync(join(root, 'public/work/a-book'))).toBe(false);
  });

  it('rejects a slug that is not kebab-case', async () => {
    const source = await png('good.png', 1000, 500);
    await expect(
      addImages({ slug: 'A Book', sources: [source], root })
    ).rejects.toThrow(/kebab-case/);
  });

  it('names images from their file names', () => {
    expect(imageName('/x/Final Cover (v2).JPG')).toBe('final-cover-v2');
  });
});
