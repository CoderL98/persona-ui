import { test, expect } from "@playwright/test";

test.describe("Chip Accessibility", () => {
  test("has role button", async ({ page }) => {
    await page.goto("/");
    const chip = page.locator('[role="button"].pui-chip').first();
    await expect(chip).toBeVisible();
  });

  test("is focusable via keyboard", async ({ page }) => {
    await page.goto("/");
    const chip = page.locator('[role="button"].pui-chip').first();
    await chip.focus();
    await expect(chip).toBeFocused();
  });
});
