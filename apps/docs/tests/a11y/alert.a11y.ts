import { test, expect } from "@playwright/test";
test.describe("Alert A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-alert").first()).toBeVisible();
  });
});
