import { test, expect } from "@playwright/test";
test.describe("Alert CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-alert").first()).toBeVisible();
  });
});
