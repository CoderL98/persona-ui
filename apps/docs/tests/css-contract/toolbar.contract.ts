import { test, expect } from "@playwright/test";
test.describe("Toolbar CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-toolbar").first()).toBeVisible();
  });
});
