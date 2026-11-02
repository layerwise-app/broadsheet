// Prints the CV PDF and the default share image from their HTML sources.
//   node sample-art/_print.mjs
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });

const cv = await browser.newPage();
await cv.goto(`file://${resolve('sample-art/_cv.html')}`, { waitUntil: 'networkidle' });
await cv.evaluate(() => document.fonts.ready);
await cv.pdf({ path: 'public/noor-castellan-cv.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await cv.setViewportSize({ width: 794, height: 1123 });
await cv.screenshot({ path: '.art/shots/cv.png' });

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`file://${resolve('sample-art/_og.html')}`, { waitUntil: 'networkidle' });
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 86 });

await browser.close();
