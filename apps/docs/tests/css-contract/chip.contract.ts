import { test, expect } from "@playwright/test";

test.describe("Chip CSS", () => {
  test("renders on page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-chip").first()).toBeVisible();
  });
});
