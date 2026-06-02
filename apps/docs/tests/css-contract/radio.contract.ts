import { test, expect } from "@playwright/test";
test.describe("Radio CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-radio-group").first()).toBeVisible();
  });
});
