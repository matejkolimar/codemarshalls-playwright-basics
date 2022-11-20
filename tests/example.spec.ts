import { test, expect } from '@playwright/test'

test('Test selektorov na Code Marshalls stránke', async ({ page }) => {
  await page.goto('https://www.codemarshalls.com/')
  // id selector
  await page.locator('id=menu-item-348').waitFor({ timeout: 5000 })
  await page.locator('id=menu-item-348').click()
  // css selector
  // TODO replace with id selector when avaliable */
  await page.locator('.section-content > .row-large > div:nth-child(2) > div .icon-box:nth-of-type(3) img').waitFor({ timeout: 5000 })
  // xpath selector
  await page.locator("xpath=//section[@class='section #contact']/div[2]//h1").waitFor({ timeout: 5000 })
  await page.locator("xpath=//h3[text()='Portfolio']").waitFor({ timeout: 5000 })
  await page.locator("//h3[starts-with(text(), 'Port')]").waitFor({ timeout: 5000 })
  // text selector
  await page.locator('text=Mercedes-Benz').waitFor({ timeout: 5000 })
  await expect(page.locator('id=top-link')).toHaveAttribute('aria-label', 'Go to top')
})

test('Úspešné vyplnenie formulára', async ({ page }) => {
  await page.goto('https://www.codemarshalls.com/blog/playwright-sandbox/')
  await page.locator('id=meno').fill('Matej');
  await page.locator('id=email').fill('mato@codemarshalls.com');
  await page.locator('id=predmet').fill('Uspesne vyplnenie formulara');
  await page.locator('id=sprava').fill('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
  await page.locator('id=odoslat').click();
  await expect(page.locator('.wpcf7-response-output')).toHaveText('Ďakujeme za správu!');

});

test('Kontrola zle vyplnených údajov ', async ({ page }) => {
  await page.goto('https://www.codemarshalls.com/blog/playwright-sandbox/')
  await page.locator('id=meno').fill('');
  await page.locator('id=email').fill('email');
  await page.locator('id=odoslat').click();
  await expect(page.locator('.wpcf7-not-valid-tip >> nth=0')).toHaveText("Potrebné pole.");
  await expect(page.locator('.wpcf7-not-valid-tip >> nth=1')).toHaveText('Nesprávna emailová adresa.');
});

test('Kontrola správneho zobrazenia textu a obrázka v rozbaľovaciom menu', async ({ page }) => {
  await page.goto('https://www.codemarshalls.com/blog/playwright-sandbox/')
  await page.locator('.rozbalovacia-polozka-1').click();
  await expect(page.locator('.vnoreny-text').locator('..')).toHaveAttribute('style', 'display: block;')
  await page.locator('.rozbalovacia-polozka-2').click();
  await expect(page.locator('.vnoreny-obrazok').locator('..')).toHaveAttribute('style', 'display: block;')
});

test('Kontrola správnej postupnosti slajdru', async ({ page }) => {
  // konštanty
  const nextButton = page.locator('.next')
  const previousButton = page.locator('.previous')
  await page.goto('https://www.codemarshalls.com/blog/playwright-sandbox/')
  await page.locator('.timeline-horizontal').scrollIntoViewIfNeeded({ timeout: 5000 })
  // smer z ľava do prava
  await expect(page.locator('.prvy-slajd')).toContainText('1999')
  await nextButton.click()
  await expect(page.locator('.druhy-slajd')).toContainText('2001')
  await nextButton.click();
  await expect(page.locator('.treti-slajd')).toContainText('2007')
  await nextButton.click();
  await expect(page.locator('.stvrty-slajd')).toContainText('2015')
  // smer z prava do ľava
  await previousButton.click()
  await expect(page.locator('.treti-slajd')).toContainText('2007')
  await previousButton.click()
  await expect(page.locator('.druhy-slajd')).toContainText('2001')
  await previousButton.click()
  await expect(page.locator('.prvy-slajd')).toContainText('1999')
});