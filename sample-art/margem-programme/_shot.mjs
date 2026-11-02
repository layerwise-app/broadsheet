// Dev helper: node _shot.mjs <file.html> <out.png> [scale] — screenshots a source, including `_` files.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
const [file, out, scale = '1'] = process.argv.slice(2);
const html = await readFile(file, 'utf8');
const m = /name="art-size"\s+content="(\d+)x(\d+)"/.exec(html);
const b = await chromium.launch({ channel: 'chrome', headless: true });
const p = await b.newPage({ viewport: { width: +m[1], height: +m[2] }, deviceScaleFactor: +scale });
p.on('pageerror', (e) => console.error(e.message));
await p.goto('file://' + resolve(file), { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.waitForFunction(() => window.artReady !== false, null, { timeout: 60000 });
await p.screenshot({ path: out, clip: { x: 0, y: 0, width: +m[1], height: +m[2] } });
await b.close();
