import { test, expect } from "@playwright/test";

test.describe("Divider CSS", () => {
  test("renders on page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-divider").first()).toBeVisible();
  });
});
