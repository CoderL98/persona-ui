import { test, expect } from "@playwright/test";
test.describe("Menu A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-menu").first()).toBeVisible();
  });
});
