const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    workers: 6,
    use: {
        baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
});
