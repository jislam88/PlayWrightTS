import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Enter');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
    - link "Sauce Labs Backpack":
      - img "Sauce Labs Backpack"
    - link "Sauce Labs Backpack"
    - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bike Light":
      - img "Sauce Labs Bike Light"
    - link "Sauce Labs Bike Light"
    - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Bolt T-Shirt":
      - img "Sauce Labs Bolt T-Shirt"
    - link "Sauce Labs Bolt T-Shirt"
    - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Fleece Jacket":
      - img "Sauce Labs Fleece Jacket"
    - link "Sauce Labs Fleece Jacket"
    - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Sauce Labs Onesie":
      - img "Sauce Labs Onesie"
    - link "Sauce Labs Onesie"
    - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    - link "Test.allTheThings() T-Shirt (Red)":
      - img "Test.allTheThings() T-Shirt (Red)"
    - link "Test.allTheThings() T-Shirt (Red)"
    - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
    - button "Add to cart"
    `);
});