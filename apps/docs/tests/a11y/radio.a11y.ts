import { test, expect } from "@playwright/test";

test.describe("Radio A11y", () => {
  test("radio group visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-radio-group").first()).toBeVisible();
  });
  test("has radio inputs", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('input[type="radio"]').first()).toBeVisible();
  });
});
