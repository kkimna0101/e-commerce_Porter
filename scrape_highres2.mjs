import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

(async () => {
    console.log('Starting high-res scrape using Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    let pdLists = [];
    for(let i=1; i<=2; i++) {
        await page.goto(`https://korea.shop-porter.com/product/list.asp?page=${i}&keyword=%ED%83%B1%EC%BB%A4`);
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href*="product/view.asp"]'))
                .map(a => a.getAttribute('href'));
        });
        links.forEach(l => { if(!pdLists.includes(l)) pdLists.push(l); });
    }
    
    console.log(`Found ${pdLists.length} product pages.`);
    
    let downloaded = 0;
    for (let idx = 0; idx < pdLists.length && idx < 40; idx++) {
        const productUrl = 'https://korea.shop-porter.com' + pdLists[idx];
        try {
            await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
            
            let hiResUrl = await page.evaluate(() => {
                const img = document.querySelector('.photo-slider .slick-slide:not(.slick-cloned) img');
                return img ? img.getAttribute('src') : null;
            });
            
            if (hiResUrl) {
                if (hiResUrl.startsWith('//')) hiResUrl = 'https:' + hiResUrl;
                else if (!hiResUrl.startsWith('http')) hiResUrl = 'https://korea.shop-porter.com' + hiResUrl;
                
                const id = 130 + idx;
                const dest1 = path.join('public', 'images', 'product', `${id}.png`);
                const dest2 = path.join('public', 'images', 'productdetail', 'hero_product', `${id}_heroproduct_1.png`);
                
                const viewSource = await page.goto(hiResUrl);
                const buffer = await viewSource.buffer();
                
                fs.writeFileSync(dest1, buffer);
                fs.copyFileSync(dest1, dest2);
                
                downloaded++;
                console.log(`Successfully upgraded High-Res for ID ${id}`);
            } else {
                console.log(`Failed finding hi-res for ${pdLists[idx]}`);
            }
        } catch(e) {
            console.error(`Error on ID ${130+idx}:`, e.message);
        }
    }
    
    await browser.close();
    console.log(`COMPLETED HI-RES SCRAPING. Total upgraded: ${downloaded}`);
})();
