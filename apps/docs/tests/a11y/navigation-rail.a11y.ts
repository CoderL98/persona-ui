import { test, expect } from "@playwright/test";
test.describe("NavigationRail A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-navigation-rail").first()).toBeVisible();
  });
});
