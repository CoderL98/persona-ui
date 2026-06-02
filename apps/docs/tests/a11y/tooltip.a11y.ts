import { test, expect } from "@playwright/test";
test.describe("Tooltip A11y", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-mode", "light");
    });
  });

  test("wrapper visible", async ({ page }) => {
    await expect(page.locator(".pui-tooltip-wrapper").first()).toBeVisible();
  });

  test("tooltip appears on hover with correct role", async ({ page }) => {
    const wrapper = page.locator(".pui-tooltip-wrapper").first();
    await wrapper.hover();
    await page.waitForTimeout(500);
    const tooltip = page.locator('[role="tooltip"]');
    await expect(tooltip).toBeVisible();
  });
});
