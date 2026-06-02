import { test, expect } from "@playwright/test";
test.describe("Table CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-table").first()).toBeVisible();
  });
});
