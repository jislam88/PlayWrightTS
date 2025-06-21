import { expect, type Locator, type Page } from '@playwright/test';
import config from '../playwright.config';
import { LoginPage } from './LoginPage';

export class InventoryPage {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly resetLink: Locator;
    readonly logoutLink: Locator;
    readonly swagLabsLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.resetLink = page.locator('[data-test="reset-sidebar-link"]');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.swagLabsLogo = page.getByText('Swag Labs');
    }

    //***** Page Actions *****
    async goto() {
        await this.page.goto(config.use.baseURL + '/inventory.html'); 
    }

    async resetCartAndLogout() {
        await this.menuButton.click();
        await expect(this.resetLink).toBeVisible();
        await this.resetLink.click();
        await this.logoutLink.click();
        await expect(this.swagLabsLogo).toBeVisible();
    }
}
