import { test, expect } from "@playwright/test";
test.describe("Progress CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-progress").first()).toBeVisible();
  });
});
