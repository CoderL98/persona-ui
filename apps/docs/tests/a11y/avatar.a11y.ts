import { test, expect } from "@playwright/test";

test.describe("Avatar Accessibility", () => {
  test("is visible on page", async ({ page }) => {
    await page.goto("/");
    const av = page.locator(".pui-avatar").first();
    await expect(av).toBeVisible();
  });
});
