import { test, expect } from "@playwright/test";
test.describe("Toast CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="status"]').first()).toBeVisible();
  });
});
