import { test, expect } from "@playwright/test";
test.describe("Checkbox CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="checkbox"]').first()).toBeVisible();
  });
});
