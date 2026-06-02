import { test, expect } from "@playwright/test";
test.describe("Popover A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-popover").first()).toBeVisible();
  });
});
