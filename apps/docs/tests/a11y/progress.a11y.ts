import { test, expect } from "@playwright/test";
test.describe("Progress A11y", () => {
  test("has role progressbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="progressbar"]').first()).toBeVisible();
  });
});
