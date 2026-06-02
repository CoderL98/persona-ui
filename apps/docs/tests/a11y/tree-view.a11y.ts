import { test, expect } from "@playwright/test";
test.describe("TreeView A11y", () => {
  test("has tree role", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="tree"]').first()).toBeVisible();
  });
});
