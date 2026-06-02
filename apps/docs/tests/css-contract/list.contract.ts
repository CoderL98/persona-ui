import { test, expect } from "@playwright/test";
test.describe("List CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-list").first()).toBeVisible();
  });
});
