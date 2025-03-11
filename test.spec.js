const {test, expect} = require('@playwright/test');
const {chromium} = require('playwright');

test('click test', async ({page}) => {

    const browser = await chromium.launch({headless: false});
    await page.goto('http://uitestingplayground.com/click');
    const button = page.locator("#badButton");
    await expect(button).toHaveCSS('background-color', 'rgb(0, 123, 255)')
    await button.click();
    await expect(button).toHaveCSS('background-color', 'rgb(33, 136, 56)');
    await page.waitForTimeout(3000); // Подождать 3 секунды
    await browser.close(); // Закрыть браузер

});


