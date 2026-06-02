import { test, expect } from "@playwright/test";

test.describe("Kbd CSS", () => {
  test("renders on page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("kbd.pui-kbd").first()).toBeVisible();
  });
});
