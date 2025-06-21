import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: /.*\.spec\.ts$/,
  timeout: 30000,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1280, height: 720 },
    headless: false,
    launchOptions: {
      slowMo: 500
    },
    actionTimeout: 10000,
    navigationTimeout: 15000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        headless: false,
        launchOptions: {
          slowMo: 500,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 },
        headless: false,
        launchOptions: {
          slowMo: 500,
          args: ['--no-sandbox']
        },
        ignoreHTTPSErrors: true
      }
    },
    {
      name: 'webkit',
      use: { 
        browserName: 'webkit',
        viewport: { width: 1280, height: 720 },
        headless: false,
        launchOptions: {
          slowMo: 500
        },
        ignoreHTTPSErrors: true
      }
    }
  ]
};

export default config;
