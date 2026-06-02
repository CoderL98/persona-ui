import { test, expect } from "@playwright/test";

test.describe("Kbd Accessibility", () => {
  test("renders kbd element", async ({ page }) => {
    await page.goto("/");
    const kbd = page.locator("kbd.pui-kbd").first();
    await expect(kbd).toBeVisible();
  });
});
