// Screenshots pages at 1440 and 390 px for visual review.
//   node sample-art/_shots.mjs <base-url> <path>[,<path>...] [fullPage=1]
import { chromium } from 'playwright-core';
const [base, paths, full = '1'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 900 : 844 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  page.on('pageerror', (e) => console.log('pageerror', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log('console', m.text().slice(0, 200)); });
  for (const path of paths.split(',')) {
    await page.goto(base + path, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    // Scroll through so lazy images load, then return.
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(90); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const info = await page.evaluate(() => ({
      cls: window.__cls,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.style}`).join('; '),
      h: document.documentElement.scrollHeight
    }));
    console.log(width, path, JSON.stringify(info));
    const name = `${path === '/' ? 'home' : path.replace(/^\//, '').replace(/[^a-z0-9]+/g, '-')}-${width}`;
    await page.screenshot({ path: `.art/shots/${name}.png`, fullPage: full === '1' });
  }
  await page.close();
}
await browser.close();
