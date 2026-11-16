import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'd:\\timepass projects\\mesh1\\scratch\\screenshots\\fizzi-verification';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Starting Fizzi Upgrade Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox', '--disable-dev-shm-usage'],
  });

  const errors = [];

  for (const viewport of [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'mobile-390', width: 390, height: 844 },
  ]) {
    console.log(`\n--- Testing ${viewport.name} (${viewport.width}x${viewport.height}) ---`);
    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        console.error(`[Console Error - ${viewport.name}]`, text);
        errors.push({ viewport: viewport.name, text });
      }
    });

    page.on('pageerror', (err) => {
      console.error(`[Page Error - ${viewport.name}]`, err.message);
      errors.push({ viewport: viewport.name, text: err.message });
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));

    // Capture 1: Hero
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-01-hero.png`) });
    console.log(`Saved ${viewport.name}-01-hero.png`);

    // Click finish button in Hero if present
    if (viewport.name === 'desktop-1440') {
      try {
        const finishBtns = await page.$$('button');
        for (const btn of finishBtns) {
          const text = await page.evaluate((el) => el.innerText, btn);
          if (text && text.includes('Champagne Bronze')) {
            await btn.click();
            await new Promise((r) => setTimeout(r, 400));
            await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-01b-hero-finish-bronze.png`) });
            console.log(`Clicked Champagne Bronze finish and captured`);
            break;
          }
        }
      } catch (e) {
        console.log('Hero finish click error:', e.message);
      }
    }

    // Scroll to MosquitoWindowScroll
    await page.evaluate(() => {
      const el = document.getElementById('story');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-02-story-entry.png`) });

    // Scroll mid-way through MosquitoWindowScroll track
    await page.evaluate(() => {
      window.scrollBy({ top: 900, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-02b-story-midflight.png`) });

    // Scroll to ProductStory exploded view
    await page.evaluate(() => {
      const el = document.getElementById('anatomy') || document.getElementById('craftsmanship');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-03-anatomy-entry.png`) });

    // Scroll halfway through exploded view track to trigger full explosion
    await page.evaluate(() => {
      window.scrollBy({ top: 1400, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-03b-anatomy-exploded.png`) });

    // Scroll to Experience
    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const expHeading = headings.find((h) => h.innerText.includes('Uncompromised Living'));
      if (expHeading) {
        expHeading.scrollIntoView({ behavior: 'instant' });
      } else {
        const cat = document.getElementById('categories');
        if (cat) cat.scrollIntoView({ behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-04-experience-categories.png`) });

    // Scroll to Categories focal switcher
    await page.evaluate(() => {
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
        window.scrollBy({ top: 120, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-05-categories-focal.png`) });

    // Test clicking Next product system
    if (viewport.name === 'desktop-1440') {
      try {
        const nextBtn = await page.$('button[aria-label="Next system"]');
        if (nextBtn) {
          await nextBtn.click();
          await new Promise((r) => setTimeout(r, 500));
          await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-05b-categories-switched.png`) });
          console.log(`Switched to next category system and captured screenshot`);
        }
      } catch (e) {
        console.log('Category switch click error:', e.message);
      }
    }

    // Scroll to Showcase before/after slider
    await page.evaluate(() => {
      const el = document.getElementById('showcase');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-06-showcase-slider.png`) });

    // Scroll to InstallationProcess
    await page.evaluate(() => {
      window.scrollBy({ top: 800, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-07-installation.png`) });

    // Scroll to Calculator
    await page.evaluate(() => {
      const el = document.getElementById('calculator');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-08-calculator.png`) });

    // Scroll to Contact
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${viewport.name}-09-contact.png`) });

    // Check horizontal scroll
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`[${viewport.name}] Horizontal scroll overflow:`, hasHorizontalOverflow);

    await page.close();
  }

  await browser.close();

  console.log('\n--- VERIFICATION REPORT SUMMARY ---');
  console.log(`Total Errors Logged: ${errors.length}`);
  if (errors.length > 0) {
    console.log(errors);
  } else {
    console.log('✅ ZERO critical console errors detected!');
  }
}

runVerification().catch(console.error);
