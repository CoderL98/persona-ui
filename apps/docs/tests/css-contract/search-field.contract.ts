import { test, expect } from "@playwright/test";
test.describe("SearchField CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-search-field").first()).toBeVisible();
  });
});
