import { test, expect } from "@playwright/test";
test.describe("Tabs A11y", () => {
  test("has tablist", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="tablist"]').first()).toBeVisible();
  });
});
