import { test, expect } from "@playwright/test";
test.describe("Popover CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-popover").first()).toBeVisible();
  });
});
