// Renders the HTML, SVG, and canvas sources in sample-art/<slug>/ to PNGs in
// .art/<slug>/, ready for `pnpm add-images <slug> .art/<slug>`.
//
//   pnpm render-art <slug> [file-name ...]
//
// Each source sets its size in CSS px, rendered at 2×:
//   <meta name="art-size" content="1440x960">  → 2880×1920 PNG
// Pages may call window.artReady = false, then true when a canvas has finished.
// Uses the installed Google Chrome. Web fonts load from Google Fonts at render
// time; the finished images do not depend on them.
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright-core';

const [slug, ...only] = process.argv.slice(2);
if (!slug) {
  console.error('Usage: pnpm render-art <slug> [file-name ...]');
  process.exit(1);
}
const dir = resolve('sample-art', slug);
const out = resolve('.art', slug);
await mkdir(out, { recursive: true });

const files = (await readdir(dir)).filter(
  (file) =>
    file.endsWith('.html') &&
    !file.startsWith('_') &&
    (only.length === 0 || only.includes(file.replace(/\.html$/, '')))
);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const file of files) {
  const html = await readFile(join(dir, file), 'utf8');
  const size = /name="art-size"\s+content="(\d+)x(\d+)"/.exec(html);
  if (!size) throw new Error(`${file} has no <meta name="art-size" content="WxH">`);
  const [width, height] = [Number(size[1]), Number(size[2])];
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  page.on('pageerror', (error) => console.error(`${file}: ${error.message}`));
  await page.goto(`file://${join(dir, file)}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.artReady !== false, null, { timeout: 60000 });
  const overflow = await page.evaluate(() => ({
    w: document.documentElement.scrollWidth,
    h: document.documentElement.scrollHeight
  }));
  if (overflow.w > width || overflow.h > height) {
    console.warn(`${file}: content overflows ${width}×${height} (${overflow.w}×${overflow.h})`);
  }
  const path = join(out, file.replace(/\.html$/, '.png'));
  await page.screenshot({ path, clip: { x: 0, y: 0, width, height } });
  await page.close();
  console.log(`${file} → ${path}`);
}
await browser.close();
