import { expect, type Locator, type Page } from '@playwright/test';
import config from '../tests/playwright.config';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    //***** Page Actions *****
    async goto () {
        await this.page.goto(config.use.baseURL + '/'); 
    }
    
    async LoginStandardUser() {
        await this.usernameInput.fill('standard_user');
        await this.passwordInput.fill('secret_sauce');
        await this.loginButton.click();
    }
}

