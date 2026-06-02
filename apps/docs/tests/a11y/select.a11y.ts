import { test, expect } from "@playwright/test";

test.describe("Select A11y", () => {
  test("has combobox trigger", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[role="combobox"]').first()).toBeVisible();
  });
  test("has aria-expanded", async ({ page }) => {
    await page.goto("/");
    const sel = page.locator('[role="combobox"]').first();
    await expect(sel).toHaveAttribute("aria-expanded");
  });
});
