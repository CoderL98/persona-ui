import { test, expect } from "@playwright/test";
test.describe("Sidebar A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-sidebar").first()).toBeVisible();
  });
});
