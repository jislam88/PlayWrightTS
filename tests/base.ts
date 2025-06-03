import { Page } from '@playwright/test';

export class BasePage {
    page: Page;
    username: any;
    password: any;
    loginButton: any;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="standard_user"]');
        this.password = page.locator('[data-test="secret_sauce"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}