import { test, expect } from "@playwright/test";

test.describe("IconButton Accessibility", () => {
  test("is focusable", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator("button.pui-icon-button").first();
    await btn.focus();
    await expect(btn).toBeFocused();
  });

  test("has aria-label from label prop", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator("button.pui-icon-button").first();
    await expect(btn).toHaveAttribute("aria-label");
  });
});
