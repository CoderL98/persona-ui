import { test, expect } from "@playwright/test";

test.describe("Combobox A11y", () => {
  test("visible on page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-combobox").first()).toBeVisible();
  });
});
