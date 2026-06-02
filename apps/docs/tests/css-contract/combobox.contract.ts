import { test, expect } from "@playwright/test";
test.describe("Combobox CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-combobox").first()).toBeVisible();
  });
});
