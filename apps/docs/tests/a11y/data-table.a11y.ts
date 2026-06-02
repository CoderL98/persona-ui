import { test, expect } from "@playwright/test";
test.describe("DataTable A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-data-table").first()).toBeVisible();
  });
});
