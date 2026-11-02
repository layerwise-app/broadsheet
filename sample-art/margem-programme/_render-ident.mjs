// Renders the silent ident frame by frame and encodes it. Run from the project root:
//   node sample-art/margem-programme/_render-ident.mjs public/work/margem-programme/ident.mp4 [--sample]
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright-core';

const out = process.argv[2];
const sample = process.argv.includes('--sample');
const FPS = 24, SECONDS = 10;
const dir = sample ? process.env.TMPDIR : await mkdtemp(join(tmpdir(), 'margem-'));
const b = await chromium.launch({ channel: 'chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto('file://' + resolve('sample-art/margem-programme/_ident.html'), { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.artReady === true);
const times = sample ? [0.8, 1.6, 2.4, 3.2, 3.9, 4.8, 5.5, 5.8, 6.3, 6.8, 7.3, 7.7, 8.1, 8.8, 9.7] : Array.from({ length: FPS * SECONDS }, (_, i) => i / FPS);
for (const [i, t] of times.entries()) {
  await p.evaluate((x) => window.frame(x), t);
  await p.screenshot({ path: join(dir, sample ? `idf-${t}.png` : `f${String(i).padStart(4, '0')}.png`) });
}
await b.close();
if (!sample) {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(dir, 'f%04d.png'), '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out], { stdio: 'inherit' });
  await rm(dir, { recursive: true, force: true });
  process.exit(r.status ?? 1);
}
