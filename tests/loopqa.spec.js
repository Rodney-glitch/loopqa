const { test } = require('@playwright/test');
const {login} = require('../setup/login');
const data = require('../data/test-case-data.json');
const {verifyTaskInColumn, verifyTaskTags} = require('../commands/ui/tasks');

test.describe('Demo App Tests', () => {
    test.beforeEach('Login to Demo page', async ({ page }) => {
        await login(page);
    });

    data.forEach(({ navigateTo, task }) => {
        test(`Verify task "${task.title}" in column "${task.column}" under project "${navigateTo}" is visible`, async ({page}) => {
            // Navigate to the specified section
            await page.getByRole('button', { name: `${navigateTo}` }).click();

            // Locate the task in the correct column
            const taskLocator = await verifyTaskInColumn(page, task.column, task.title);

            // Verify tags
            await verifyTaskTags(page, task.tags, taskLocator);
        });
    });
});

