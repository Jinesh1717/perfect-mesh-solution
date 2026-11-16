import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\jines\\.gemini\\antigravity\\brain\\0417767b-dcc2-4fea-b023-dea1d394940c\\scratch\\screenshots\\post-upgrade';
fs.mkdirSync(outDir, { recursive: true });

async function runVerification() {
  console.log('Launching headless Chrome for verification audit...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--use-gl=angle',
      '--window-size=1440,900'
    ]
  });

  const report = {
    viewports: {},
    consoleErrors: [],
    consoleWarnings: [],
    interactions: {},
    horizontalOverflow: {},
    blankGaps: []
  };

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`\nVerifying viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    const pageErrors = [];
    const pageWarnings = [];

    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        pageErrors.push(text);
        if (!report.consoleErrors.includes(text)) report.consoleErrors.push(text);
      } else if (type === 'warning') {
        pageWarnings.push(text);
        if (!report.consoleWarnings.includes(text)) report.consoleWarnings.push(text);
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(err.message);
      if (!report.consoleErrors.includes(err.message)) report.consoleErrors.push(err.message);
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));

    // Capture initial hero screenshot
    await page.screenshot({ path: path.join(outDir, `${vp.name}-hero.png`) });

    // Check horizontal overflow
    const overflowCheck = await page.evaluate(() => {
      const docEl = document.documentElement;
      const body = document.body;
      const maxScrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
      const clientWidth = docEl.clientWidth;
      const hasHorizontalScroll = maxScrollWidth > clientWidth + 1;
      
      const overflowingElements = [];
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > clientWidth + 5) {
          overflowingElements.push({
            tag: el.tagName,
            id: el.id,
            className: el.className?.slice ? el.className.slice(0, 50) : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
          if (overflowingElements.length >= 5) break;
        }
      }
      return { clientWidth, maxScrollWidth, hasHorizontalScroll, overflowingElements };
    });

    report.horizontalOverflow[vp.name] = overflowCheck;

    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`  Calibrated scroll height: ${scrollHeight}px`);

    const scrollSteps = 6;
    for (let step = 1; step <= scrollSteps; step++) {
      const targetScroll = Math.round((scrollHeight / scrollSteps) * step);
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetScroll);
      await new Promise(r => setTimeout(r, 400));

      if (step === 2 || step === 4 || step === scrollSteps) {
        await page.screenshot({ path: path.join(outDir, `${vp.name}-scroll-${step}.png`) });
      }
    }

    report.viewports[vp.name] = {
      scrollHeight,
      errors: pageErrors,
      warnings: pageWarnings,
    };

    if (vp.name === 'desktop-1440') {
      console.log('Testing interactive features on desktop-1440...');
      
      // 1. Test Category Tab Click
      try {
        const tabClicked = await page.evaluate(() => {
          const tabs = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('Retractable') || b.textContent?.includes('Pleated'));
          if (tabs.length > 0) {
            tabs[0].click();
            return true;
          }
          return false;
        });
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(outDir, 'test-category-tab.png') });
        report.interactions.categoryTab = tabClicked;
      } catch (e) {
        report.interactions.categoryTabError = e.message;
      }

      // 2. Test Calculator Preset click & Live Price Update
      try {
        const calcResult = await page.evaluate(() => {
          const calc = document.querySelector('#calculator');
          if (!calc) return { found: false };
          const presetBtn = Array.from(calc.querySelectorAll('button')).find(b => b.textContent?.includes('Master Balcony'));
          if (presetBtn) presetBtn.click();
          const priceText = calc.querySelector('.font-black')?.textContent || '';
          return { found: true, priceText };
        });
        await new Promise(r => setTimeout(r, 400));
        report.interactions.calculator = calcResult;
      } catch (e) {
        report.interactions.calculatorError = e.message;
      }

      // 3. Test Contact Form with Zod validation and Lead Save
      try {
        const formResult = await page.evaluate(async () => {
          const form = document.querySelector('#contact form');
          if (!form) return { found: false };
          const nameInput = form.querySelector('input[name="name"]');
          const phoneInput = form.querySelector('input[name="phone"]');
          const locationInput = form.querySelector('input[name="location"]');
          const submitBtn = form.querySelector('button[type="submit"]');

          if (nameInput && phoneInput && submitBtn) {
            nameInput.value = 'Dr. Aditi Varma';
            phoneInput.value = '+91 98450 12345';
            if (locationInput) locationInput.value = 'Sadashivanagar Bengaluru';
            submitBtn.click();
            return { found: true, submitted: true };
          }
          return { found: true, submitted: false };
        });
        await new Promise(r => setTimeout(r, 1200));
        report.interactions.contactForm = formResult;
      } catch (e) {
        report.interactions.contactFormError = e.message;
      }
    }

    await page.close();
  }

  // Check /admin dashboard with PIN unlock
  console.log('\nChecking /admin dashboard with security PIN...');
  const adminPage = await browser.newPage();
  await adminPage.setViewport({ width: 1440, height: 900 });
  await adminPage.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Enter PIN mesh2026
  await adminPage.type('input[type="password"]', 'mesh2026');
  await adminPage.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 800));
  await adminPage.screenshot({ path: path.join(outDir, 'admin-dashboard-unlocked.png') });

  const adminData = await adminPage.evaluate(() => {
    const tableRows = Array.from(document.querySelectorAll('tbody tr')).map(tr => {
      const cells = Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim());
      return cells;
    });
    return { rows: tableRows };
  });
  report.admin = adminData;
  await adminPage.close();

  await browser.close();

  fs.writeFileSync(
    path.join(outDir, 'verification-report.json'),
    JSON.stringify(report, null, 2)
  );
  console.log('\nVerification complete! Report written to verification-report.json');
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
