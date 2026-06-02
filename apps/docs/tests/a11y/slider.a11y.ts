import { test, expect } from "@playwright/test";

test.describe("Slider A11y", () => {
  test("is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-slider").first()).toBeVisible();
  });
  test("has range input", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('input[type="range"]').first()).toBeVisible();
  });
});
