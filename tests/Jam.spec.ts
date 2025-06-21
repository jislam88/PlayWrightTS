// NEXT STEPS
// Create a custom fixture for the setup and tear down feature
// Create a paralell test run for different browsers
// Integrate with github actions for nightly runs
// Implement BDD for test cases and feature files

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Read test data from CSV for TC#5 Data-Driven Tests
const testDataPath = path.join(__dirname, '..', 'data', 'test-data.csv');
const csvData = fs.readFileSync(testDataPath, 'utf-8');
const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
});

// ***** Setup & Teardown before and after all tests *****
test.beforeEach('Login to SauceDemo Standard Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.LoginStandardUser();
});

test.afterEach('Reset Cart & Logout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.resetCartAndLogout();
});

// ***** Test Cases *****

test.describe('Group One', () => {
    test('TC#1 Add product to Cart and checkout', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('Test');
        await page.locator('[data-test="lastName"]').fill('Jamil');
        await page.locator('[data-test="postalCode"]').fill('11432');
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="total-info-label"]')).toContainText('Price Total');
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        await page.locator('[data-test="back-to-products"]').click();
    });

    test('TC#2 Sort product order', async ({ page }) => {
        await page.getByText('Name (A to Z)Name (A to Z)').click();
        await page.locator('[data-test="product-sort-container"]').selectOption('za');
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    });
});

test.describe('Group Two', () => {
    test('TC#3 Add multiple products to Cart and checkout', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
        await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
        await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(page.locator('[data-test="item-5-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
        await expect(page.locator('[data-test="item-2-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Onesie');
        await expect(page.locator('[data-test="item-3-title-link"] [data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('BlueGreen');
        await page.locator('[data-test="lastName"]').fill('LastName');
        await page.locator('[data-test="postalCode"]').fill('11455');
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="total-info-label"]')).toContainText('Price Total');
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        await page.locator('[data-test="back-to-products"]').click();
    });

    test('TC#4 Remove products from Cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
        await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
        await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
        await expect(page.locator('[data-test="item-5-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
        await expect(page.locator('[data-test="item-2-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Onesie');
        await expect(page.locator('[data-test="item-3-title-link"] [data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
        await page.locator('[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
    });
});

test.describe('Group Three: Data-Driven Tests', () => {
    for (const record of records) {
        test(`TC#5 Checkout with ${record.firstName} ${record.lastName}`, async ({ page }) => {
            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();
            await page.locator('[data-test="checkout"]').click();
            await page.locator('[data-test="firstName"]').fill(record.firstName);
            await page.locator('[data-test="lastName"]').fill(record.lastName);
            await page.locator('[data-test="postalCode"]').fill(record.postalCode);
            
            // Add a 1-second pause
            await page.waitForTimeout(1000);
            
            await page.locator('[data-test="continue"]').click();
            await expect(page.locator('[data-test="total-info-label"]')).toContainText('Price Total');
            await page.locator('[data-test="finish"]').click();
            await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
            await page.locator('[data-test="back-to-products"]').click();
        });
    }
});
