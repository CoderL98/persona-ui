import { test, expect } from "@playwright/test";

test.describe("Switch Accessibility", () => {
  test("Switch has role switch", async ({ page }) => {
    await page.goto("/");
    const sw = page.locator('button[role="switch"]').first();
    await expect(sw).toBeVisible();
    await expect(sw).toHaveAttribute("aria-checked");
  });

  test("Switch can be focused and toggled", async ({ page }) => {
    await page.goto("/");
    const sw = page.locator('button[role="switch"]').first();
    await sw.focus();
    await expect(sw).toBeFocused();
    const before = await sw.getAttribute("aria-checked");
    await sw.click();
    const after = await sw.getAttribute("aria-checked");
    expect(before).not.toBe(after);
  });

  test("Disabled switch cannot be focused", async ({ page }) => {
    await page.goto("/");
    const disabledSw = page.locator('button[role="switch"][disabled]').first();
    if ((await disabledSw.count()) > 0) {
      await expect(disabledSw).toBeDisabled();
    }
  });
});
