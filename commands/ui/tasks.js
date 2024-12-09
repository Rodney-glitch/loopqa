import {mainPageSelectors} from '../../selectors/main-page';
const {expect} = require('@playwright/test');

/**
 * Verifies that a specific task is visible in a given column and returns the task locator.
 *
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {string} column - The name of the column to search in (e.g., "To Do", "In Progress").
 * @param {string} taskName - The title of the task to verify
 * @returns {import('@playwright/test').Locator} The locator for the located task.
 */
export async function verifyTaskInColumn(page, column, taskName) {
    const taskLocator = page.locator(mainPageSelectors.columnLocator(column)).getByText(taskName);
    await expect(taskLocator).toBeVisible();

    return taskLocator;
}

/**
 * Verifies that a specific task contains the expected tags.
 *
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {string[]} tags - An array of tag names to verify.
 * @param {import('@playwright/test').Locator} taskLocator - The locator for the task card.
 * @returns {Promise<void>} A promise that resolves when all tags are verified to be visible.
 */
export async function verifyTaskTags(page, tags, taskLocator) {
    for (const tag of tags) {
        const tagLocator = taskLocator.locator('..').getByText(`${tag}`, {exact: true});
        await expect(tagLocator).toBeVisible();
    }
}
