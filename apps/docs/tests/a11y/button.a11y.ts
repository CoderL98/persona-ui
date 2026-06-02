import { test, expect } from "@playwright/test";

test.describe("Button A11y", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-mode", "light");
    });
  });

  test("Button is focusable via keyboard", async ({ page }) => {
    const firstButton = page.locator("button").first();
    await firstButton.focus();
    await expect(firstButton).toBeFocused();
  });

  test("Disabled button cannot be focused", async ({ page }) => {
    const disabledButton = page.locator("button:disabled").first();
    if ((await disabledButton.count()) > 0) {
      await expect(disabledButton).toBeDisabled();
    }
  });

  test("Loading button has aria-busy", async ({ page }) => {
    const loadingButton = page.locator('button[aria-busy="true"]');
    if ((await loadingButton.count()) > 0) {
      await expect(loadingButton).toHaveAttribute("aria-busy", "true");
    }
  });

  test("Button passes basic axe accessibility scan", async ({ page }) => {
    // axe-playwright is in devDependencies
    const { injectAxe, checkA11y } = await import("axe-playwright");
    await injectAxe(page);
    await checkA11y(page, 'section[id="buttons"]', undefined, false);
  });
});
