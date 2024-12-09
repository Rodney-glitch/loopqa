
# Playwright Test Suite for Demo App

## **Overview**
This Playwright-driven test suite is designed to:
- Leverage **data-driven testing** for scalability and maintainability.
- Dynamically adapt test cases using JSON data, minimizing code duplication.
- Provide parallel execution for faster test runs.

The suite automates functional tests for tasks, columns, and tags in a **Demo App**.

---

## **Folder Structure**

```
.
├── commands/
│   ├── ui/
│       ├── tasks.js        # Helper functions for verifying tasks and tags
├── data/
│   ├── test-case-data.json # Data file for all test scenarios
├── selectors/
│   ├── login-page.js       # Selectors for the login page
│   ├── main-page.js        # Selectors for the main page
├── setup/
│   ├── login.js            # Login function
├── tests/
│   ├── loopqa.spec.js      # Main test suite
├── playwright.config.js    # Playwright configuration
├── README.md               # Documentation
```

---

## **Setup Instructions**

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v16 or higher recommended).
2. Install Playwright:
   ```bash
   npm install playwright
   ```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Rodney-glitch/loopqa.git
   cd loopqa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## **How to Run the Tests**

### Run All Tests
Execute all tests:
```bash
  npx playwright test
```

### Run Tests in Parallel
By default, tests run in parallel using `fullyParallel` mode with 6 workers (configured in `playwright.config.js`).

### Debug Tests
Run tests in debug mode:
```bash
  npx playwright test --debug
```

---

## **Configuration**

The suite is configured via `playwright.config.js`:

- **Parallel Execution:**
    - Configured with `workers: 6` for parallel execution.
- **Failure Debugging:**
    - Screenshots and videos are captured on test failures.
- **Base URL:**
    - Set to `https://animated-gingersnap-8cf7f2.netlify.app/`.

---

## **How It Works**

### 1. **Data-Driven Testing**
- Test scenarios are dynamically loaded from the `data/test-case-data.json` file:
```json
[
  {
    "navigateTo": "Web Application",
    "task": {
      "title": "Implement user authentication",
      "column": "To Do",
      "tags": ["Feature", "High Priority"]
    }
  }
]
```

Each entry specifies:
- `navigateTo`: The project or section to navigate.
- `task`: Task details including title, column, and tags.

### 2. **Reusable Functions**
- **Task Verification:**
```javascript
export async function verifyTaskInColumn(page, column, taskName) {
    const taskLocator = page.locator(mainPageSelectors.columnLocator(column)).getByText(taskName);
    await expect(taskLocator).toBeVisible();
    return taskLocator;
}
```
- **Tag Verification:**
```javascript
export async function verifyTaskTags(page, tags, taskLocator) {
    for (const tag of tags) {
        const tagLocator = taskLocator.locator('..').getByText(`${tag}`, {exact: true});
        await expect(tagLocator).toBeVisible();
    }
}
```

### 3. **Parallel Execution**
- Tests are distributed across workers for faster execution:
```javascript
fullyParallel: true,
workers: 6,
```

---


## **Debugging Tips**

- **View Screenshots:** Screenshots of failed tests are stored automatically.
- **View Videos:** Videos of failed tests are retained (`retain-on-failure`).
- **Run in Debug Mode:** Use `--debug` to debug interactively:
  ```bash
  npx playwright test --debug
  ```

---

## **Conclusion**

This Playwright test suite is:
- **Scalable:** Easy to extend by adding new data-driven scenarios.
- **Maintainable:** Modular functions and selectors reduce code duplication.
- **Efficient:** Parallel execution ensures faster test runs.

For further assistance, feel free to reach out or check Playwright’s [documentation](https://playwright.dev/).
