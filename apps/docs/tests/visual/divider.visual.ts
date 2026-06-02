import { test, expect } from "@playwright/test";

test.describe("Divider Visual", () => {
  test("renders in apple-light", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-mode", "light");
    });
    await page.waitForTimeout(200);
    await expect(page.locator(".pui-divider").first()).toBeVisible();
  });
});
