import { test, expect } from "@playwright/test";
test.describe("SegmentedControl A11y", () => {
  test("has radiogroup", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="radiogroup"]').first()).toBeVisible();
  });
});
