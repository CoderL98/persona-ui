import { test, expect } from "@playwright/test";
test.describe("DataTable CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-data-table").first()).toBeVisible();
  });
});
