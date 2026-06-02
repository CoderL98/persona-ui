import { test, expect } from "@playwright/test";
test.describe("Calendar CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-calendar").first()).toBeVisible();
  });
});
