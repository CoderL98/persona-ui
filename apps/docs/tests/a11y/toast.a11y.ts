import { test, expect } from "@playwright/test";
test.describe("Toast A11y", () => {
  test("visible when open", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="status"]').first()).toBeVisible();
  });
});
