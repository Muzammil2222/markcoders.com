const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://techdejure.vercel.app/case-studies', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => {
    // extract main content, strip svgs to save space
    document.querySelectorAll('svg, img').forEach(el => el.remove());
    return document.body.innerHTML;
  });
  console.log(html);
  await browser.close();
})();
