import {loginPageSelectors} from '../selectors/login-page';

/**
 * Automates login into the Demo App.
 *
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 */
export async function login(page) {
    await page.goto('/');
    await page.getByLabel(loginPageSelectors.usernameFieldLabel).fill('admin');
    await page.getByLabel(loginPageSelectors.passwordFieldLabel).fill('password123');
    await page.getByRole('button', loginPageSelectors.signInButton).click();
    await page.getByRole('heading', loginPageSelectors.projectTitle).waitFor();
}