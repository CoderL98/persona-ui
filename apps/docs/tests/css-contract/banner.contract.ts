import { test, expect } from "@playwright/test";
test.describe("Banner CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-banner").first()).toBeVisible();
  });
});
