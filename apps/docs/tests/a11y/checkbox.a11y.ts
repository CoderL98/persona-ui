import { test, expect } from "@playwright/test";

test.describe("Checkbox A11y", () => {
  test("has role checkbox", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="checkbox"]').first()).toBeVisible();
  });
  test("is focusable", async ({ page }) => {
    await page.goto("/");
    const cb = page.locator('[role="checkbox"]').first();
    await cb.focus();
    await expect(cb).toBeFocused();
  });
});
