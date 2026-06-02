import { test, expect } from "@playwright/test";
test.describe("Tabs CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-tabs").first()).toBeVisible();
  });
});
