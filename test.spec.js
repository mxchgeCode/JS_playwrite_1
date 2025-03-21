const {test, expect} = require('@playwright/test');
test('checkbox and radio', async ({page}) => {
    await page.goto('https://jqueryui.com/resources/demos/checkboxradio/default.html');
    await page.locator("[for=radio-1]").click();
    await page.locator("[for=checkbox-4]").click();
    await page.locator("[for=checkbox-nested-3]").click();
    await page.locator("[for=checkbox-nested-4]").click();
});


test('click test', async ({page}) => {
    await page.goto('http://uitestingplayground.com/click');
    const button = page.locator("#badButton");
    await expect(button).toHaveCSS('background-color', 'rgb(0, 123, 255)')
    await button.click();
    await expect(button).toHaveCSS('background-color', 'rgb(33, 136, 56)');
    await page.waitForTimeout(3000);
});


test('fill data test', async ({page}) => {
    const login = 'john'
    await page.goto('http://uitestingplayground.com/sampleapp');
    await page.fill(`input[name="UserName"]`, login);
    await page.fill('input[name="Password"]', 'pwd');
    await page.locator('[id="login"]').click();
    await page.waitForTimeout(3000);
    await expect(page.locator("#loginstatus")).toHaveText(`Welcome, ${login}!`);
})

test('get image caption', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await page.locator(".figure").nth(1).hover();
    await expect(page.locator('a[href="/users/2"]')).toBeVisible();
})


test('checkboxes', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const form = page.locator("#checkboxes input")
    const cb1 = form.nth(0);
    const cb2 = form.nth(1);

    await cb1.check();
    await cb2.uncheck();

    await expect(cb1).toBeChecked()
    await expect(cb2).not.toBeChecked()
})


test('screen_shot', async ({page}) => {
    const screenshotPath = 'site.png'
    const containerScreenshotPath = 'container.png'
    await page.goto('http://uitestingplayground.com/sampleapp');
    await page.locator("body").screenshot({path: screenshotPath});
    await page.waitForTimeout(500);
    await page.locator('.container').first().screenshot({path: containerScreenshotPath});
    await page.waitForTimeout(500);
    const fs = require('fs');
    const bodyFileExists = fs.existsSync(screenshotPath);
    const containerFileExists = fs.existsSync(containerScreenshotPath);
    expect(bodyFileExists, `Файл ${screenshotPath} не был создан`).toBe(true);
    expect(containerFileExists, `Файл ${containerScreenshotPath} не был создан`).toBe(true);

})

test('text_copy_paste', async ({page}) => {
    await page.goto('http://uitestingplayground.com/textinput');
    await page.waitForTimeout(500)
    const buttonLocator = page.locator('#updatingButton');
    const buttonText = await buttonLocator.textContent();
    const triple_text = buttonText+buttonText+buttonText;
    await page.fill('#newButtonName', triple_text)
    await page.waitForTimeout(500)
    await expect(page.locator('#updatingButton')).toHaveText(buttonText)
})