import { test, expect } from "@playwright/test";
test.describe("TreeView A11y", () => {
  test("doc page loads", async ({ page }) => {
    await page.goto("/docs/components/tree-view");
    await expect(page.locator("h1")).toContainText("TreeView");
    await expect(page.locator(".docs-content")).toBeVisible();
  });
});
