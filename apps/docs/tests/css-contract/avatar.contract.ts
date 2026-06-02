import { test, expect } from "@playwright/test";

test.describe("Avatar CSS", () => {
  test("renders on page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-avatar").first()).toBeVisible();
  });
});
