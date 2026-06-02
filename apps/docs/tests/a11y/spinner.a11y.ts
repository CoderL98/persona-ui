import { test, expect } from "@playwright/test";
test.describe("Spinner A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-spinner").first()).toBeVisible();
  });
});
