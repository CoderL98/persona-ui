import { test, expect } from "@playwright/test";
test.describe("DataTable A11y", () => {
  test("doc page loads", async ({ page }) => {
    await page.goto("/docs/components/data-table");
    await expect(page.locator("h1")).toContainText("DataTable");
    await expect(page.locator(".docs-content")).toBeVisible();
  });
});
