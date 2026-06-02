import { test, expect } from "@playwright/test";

test.describe("Badge CSS", () => {
  test("renders on page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-badge").first()).toBeVisible();
  });
});
