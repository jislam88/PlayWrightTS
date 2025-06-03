import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Configure test files
  testDir: '.',
  testMatch: /.*\.spec\.ts$/,

  // Configure browser launch
  use: {
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1280, height: 720 },
    headless: false,
    launchOptions: {
      slowMo: 500, // Slow down the tests for better visibility
      args: ['--start-maximized']
    },
  },

  // Configure timeouts
  timeout: 30000,

  // Configure workers
  workers: 1, // Run tests sequentially to avoid issues with shared state

  // Configure output
  reporter: 'html',
};

export default config;
