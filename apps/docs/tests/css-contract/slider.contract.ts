import { test, expect } from "@playwright/test";
test.describe("Slider CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-slider").first()).toBeVisible();
  });
});
