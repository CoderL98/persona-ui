import { test, expect } from "@playwright/test";
test.describe("EmptyState CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-empty-state").first()).toBeVisible();
  });
});
