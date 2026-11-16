import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\jines\\.gemini\\antigravity\\brain\\0417767b-dcc2-4fea-b023-dea1d394940c\\scratch\\screenshots\\issues-audit';
fs.mkdirSync(outDir, { recursive: true });

async function inspect() {
  console.log('Launching headless Chrome to inspect live and local sites...');
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

  const urls = [
    { name: 'local', url: 'http://localhost:3000' },
    { name: 'live', url: 'https://perfect-mesh-solution-s9l5.vercel.app' }
  ];

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'mobile-390', width: 390, height: 844 }
  ];

  for (const target of urls) {
    for (const vp of viewports) {
      console.log(`\nInspecting ${target.name} at ${vp.name}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      try {
        await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 30000 });
      } catch (e) {
        console.log(`Navigation error for ${target.url}:`, e.message);
        await page.close();
        continue;
      }

      await new Promise(r => setTimeout(r, 1000));

      // 1. Hero
      await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-01-hero.png`) });

      // 2. Mosquito Story
      const storyEl = await page.$('#story');
      if (storyEl) {
        await storyEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-02-story.png`) });
      }

      // 3. Craftsmanship / Exploded View
      const craftEl = await page.$('#craftsmanship');
      if (craftEl) {
        await craftEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-03-exploded.png`) });
        
        // Inspect element overlap and bounding boxes in ProductStory
        const craftMetrics = await page.evaluate(() => {
          const section = document.querySelector('#craftsmanship');
          if (!section) return null;
          const header = section.querySelector('h2');
          const modelBox = section.querySelector('.relative.w-64') || section.querySelector('[class*="w-64"]') || section.querySelector('[class*="w-80"]');
          const bottomText = section.querySelector('.absolute.bottom-12') || section.querySelector('[class*="bottom-"]');
          const winHeight = window.innerHeight;

          return {
            windowHeight: winHeight,
            headerRect: header ? header.getBoundingClientRect() : null,
            modelRect: modelBox ? modelBox.getBoundingClientRect() : null,
            bottomTextRect: bottomText ? bottomText.getBoundingClientRect() : null,
          };
        });
        console.log(`  [${target.name}-${vp.name}] Craftsmanship metrics:`, JSON.stringify(craftMetrics));
      }

      // 4. Experience section
      const expEl = await page.$('#experience');
      if (expEl) {
        await expEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-04-experience.png`) });
        
        // Check empty space after experience card
        await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-04b-experience-gap.png`) });
      }

      // 5. Products / Categories
      const prodEl = await page.$('#products');
      if (prodEl) {
        await prodEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-05-products.png`) });
      }

      // 6. Showcase
      const showEl = await page.$('#showcase');
      if (showEl) {
        await showEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-06-showcase.png`) });
      }

      // 7. Calculator
      const calcEl = await page.$('#calculator');
      if (calcEl) {
        await calcEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-07-calculator.png`) });
      }

      // 8. Contact
      const contactEl = await page.$('#contact');
      if (contactEl) {
        await contactEl.scrollIntoView();
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(outDir, `${target.name}-${vp.name}-08-contact.png`) });
      }

      await page.close();
    }
  }

  await browser.close();
  console.log('\nInspection screenshots saved to scratch/screenshots/issues-audit');
}

inspect().catch(console.error);
