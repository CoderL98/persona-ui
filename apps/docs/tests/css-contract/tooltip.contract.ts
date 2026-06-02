import { test, expect } from "@playwright/test";
test.describe("Tooltip CSS", () => {
  test("wrapper visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-tooltip-wrapper").first()).toBeVisible();
  });
});
