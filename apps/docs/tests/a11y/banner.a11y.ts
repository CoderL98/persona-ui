import { test, expect } from "@playwright/test";
test.describe("Banner A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-banner").first()).toBeVisible();
  });
});
