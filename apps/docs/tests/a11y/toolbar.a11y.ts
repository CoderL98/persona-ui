import { test, expect } from "@playwright/test";
test.describe("Toolbar A11y", () => {
  test("has role toolbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="toolbar"]').first()).toBeVisible();
  });
});
