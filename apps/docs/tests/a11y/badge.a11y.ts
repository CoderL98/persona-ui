import { test, expect } from "@playwright/test";

test.describe("Badge Accessibility", () => {
  test("is visible on page", async ({ page }) => {
    await page.goto("/");
    const badge = page.locator(".pui-badge").first();
    await expect(badge).toBeVisible();
  });
});
