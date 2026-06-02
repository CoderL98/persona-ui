import { test, expect } from "@playwright/test";

test.describe("Textarea A11y", () => {
  test("is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-textarea").first()).toBeVisible();
  });
  test("has focusable textarea", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("textarea").first()).toBeVisible();
  });
});
