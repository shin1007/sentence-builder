const path = require('path');
const { chromium } = require('playwright');

const HTML = 'file://' + path.join(__dirname, 'icon.html');
const OUT = path.join(__dirname, '..', '..', 'public');

async function shoot(page, { className, size, outFile }) {
  const ratio = size / 512;
  await page.evaluate(({ cls, size, ratio }) => {
    document.getElementById('stage').className = 'stage ' + cls;
    const frame = document.getElementById('frame');
    frame.style.width = size + 'px';
    frame.style.height = size + 'px';
    document.getElementById('scaler').style.transform = `scale(${ratio})`;
  }, { cls: className, size, ratio });
  await page.setViewportSize({ width: size, height: size });
  const el = await page.$('#frame');
  await el.screenshot({ path: path.join(OUT, outFile) });
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
  await page.goto(HTML);

  const jobs = [
    { className: 'plain', size: 512, outFile: 'icon-512.png' },
    { className: 'plain', size: 192, outFile: 'icon-192.png' },
    { className: 'mask', size: 512, outFile: 'icon-512-maskable.png' },
    { className: 'mask', size: 192, outFile: 'icon-192-maskable.png' },
    { className: 'mask', size: 180, outFile: 'apple-touch-icon.png' },
    { className: 'plain', size: 48, outFile: 'favicon-48.png' },
    { className: 'plain', size: 32, outFile: 'favicon-32.png' },
  ];

  for (const job of jobs) {
    await shoot(page, job);
    console.log('wrote', job.outFile);
  }

  await browser.close();
})();
