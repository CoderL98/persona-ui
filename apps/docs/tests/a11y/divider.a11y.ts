import { test, expect } from "@playwright/test";

test.describe("Divider Accessibility", () => {
  test("has role separator when no children", async ({ page }) => {
    await page.goto("/");
    const sep = page.locator('[role="separator"]').first();
    await expect(sep).toBeVisible();
  });
});
