const { chromium, firefox, webkit } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();

// Add stealth plugin to Playwright
chromium.use(stealth);
firefox.use(stealth);
webkit.use(stealth);

module.exports = {
    async run(){
        return new Promise(resolve => {setTimeout(resolve,5000)})
    }
    // async run() {
    //     const userAgents = [
    //         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    //         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    //         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/89.0',
    //         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/89.0'
    //     ];
    //
    //     function getRandomDelay(min = 1000, max = 3000) {
    //         return Math.floor(Math.random() * (max - min + 1)) + min;
    //     }
    //
    //     const browser = await firefox.launch({ headless: false }); // Or 'chromium' or 'webkit'.
    //     const context = await browser.newContext({
    //         userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
    //     });
    //     const page = await context.newPage();
    //
    //     async function humanClick(page, selector) {
    //         const element = await page.waitForSelector(selector);
    //         const box = await element.boundingBox();
    //         const x = box.x + box.width / 2;
    //         const y = box.y + box.height / 2;
    //
    //         await page.mouse.move(x, y);
    //         await page.mouse.down();
    //         await page.waitForTimeout(getRandomDelay(100, 300)); // Small random delay
    //         await page.mouse.up();
    //
    //     }
    //
    //     await page.goto('https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Acceder al Procedimiento")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await page.getByLabel('PROVINCIAS DISPONIBLES').selectOption('/icpplustieb/citar?p=8&locale=es');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Aceptar")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await page.getByLabel('TRÁMITES POLICÍA NACIONAL').selectOption('4096');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Aceptar")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Entrar")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'label:has-text("D.N.I.Campo obligatorio N.I.E")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await page.getByLabel('D.N.I.Campo obligatorio N.I.E').fill('X7239999J');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, '#divIdCitado');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Aceptar")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'label:has-text("Nombre y apellidosCampo")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await page.getByLabel('Nombre y apellidosCampo').fill('TTT ITIT');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'text=Aceptar Volver');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Aceptar")');
    //     await page.waitForTimeout(getRandomDelay()); // Random delay
    //     await humanClick(page, 'button:has-text("Solicitar Cita")');
    //
    //     let exitBtn = await page.getByRole('button', { name: 'Salir' });
    //     if (exitBtn) {
    //         await humanClick(page, 'button:has-text("Salir")');
    //     } else {
    //         console.log('1st Veil Passed');
    //     }
    //
    //     await browser.close();
    // }
}
