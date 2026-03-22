import fs from 'fs';
import https from 'https';
import path from 'path';
import * as cheerio from 'cheerio';

const getHTML = (url) => new Promise((resolve, reject) => {
    https.get(url, res => {
        let chunk = '';
        res.on('data', d => chunk += d);
        res.on('end', () => resolve(chunk));
    }).on('error', reject);
});

const downloadImage = (url, dest) => new Promise((resolve) => {
    https.get(url, res => {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
    }).on('error', () => { fs.unlink(dest, ()=>{}); resolve(); });
});

(async () => {
    console.log('Starting high-res scrape...');
    let pdLists = [];
    for(let i=1; i<=2; i++) {
        const html = await getHTML(`https://korea.shop-porter.com/product/list.asp?page=${i}&keyword=%ED%83%B1%EC%BB%A4`);
        const $ = cheerio.load(html);
        $('a[href*="product/view.asp"]').each((idx, el) => {
            const h = $(el).attr('href');
            if(!pdLists.includes(h)) pdLists.push(h);
        });
    }
    
    console.log(`Found ${pdLists.length} product pages.`);
    
    let downloaded = 0;
    for (let idx = 0; idx < pdLists.length && idx < 40; idx++) {
        const productUrl = 'https://korea.shop-porter.com' + pdLists[idx];
        try {
            const detailHtml = await getHTML(productUrl);
            const $$ = cheerio.load(detailHtml);
            
            let hiResUrl = '';
            // Porter detail image layout usually uses .view_area .img img or id="detail_img"
            // ID pro_img or class view_img img
            const mainImg = $$('#pro_img, .view_img img, .pro_img img, .img_wrap img, #main_img').first(); 
            if (mainImg.length) hiResUrl = mainImg.attr('src');
            else {
                // Fallback to searching for the highest res
                const anyImg = $$('img[src*="/product/2"]').first();
                if(anyImg.length) hiResUrl = anyImg.attr('src');
            }
            
            if (hiResUrl) {
                if (!hiResUrl.startsWith('http')) hiResUrl = 'https://korea.shop-porter.com' + hiResUrl;
                
                const id = 130 + idx;
                const dest1 = path.join('public', 'images', 'product', `${id}.png`);
                const dest2 = path.join('public', 'images', 'productdetail', 'hero_product', `${id}_heroproduct_1.png`);
                
                await downloadImage(hiResUrl, dest1);
                fs.copyFileSync(dest1, dest2);
                downloaded++;
                console.log(`Successfully upgraded High-Res for ID ${id}`);
            } else {
                console.log(`Failed finding hi-res for ${pdLists[idx]}`);
            }
            
            // Artificial delay to prevent ban
            await new Promise(r => setTimeout(r, 400));
        } catch(e) {
            console.error(`Error on ID ${130+idx}:`, e);
        }
    }
    console.log(`COMPLETED HI-RES SCRAPING. Total upgraded: ${downloaded}`);
})();
