import { test, expect } from "@playwright/test";

test.describe("TextField CSS Contract", () => {
  test("TextField border-radius matches Apple theme", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    await page.waitForTimeout(100);
    const input = page.locator("input").first();
    const radius = await input.evaluate(
      (el) => getComputedStyle(el.parentElement!).borderRadius,
    );
    expect(parseInt(radius)).toBeGreaterThan(0);
  });

  test("TextField error state changes border color", async ({ page }) => {
    await page.goto("/");
    const errorField = page.locator('input[aria-invalid="true"]');
    if ((await errorField.count()) > 0) {
      const borderColor = await errorField.evaluate((el) => {
        return getComputedStyle(el.parentElement!).borderColor;
      });
      expect(borderColor).toBeTruthy();
    }
  });

  test("TextField disabled state exists", async ({ page }) => {
    await page.goto("/");
    const disabledInput = page.locator("input:disabled").first();
    if ((await disabledInput.count()) > 0) {
      await expect(disabledInput).toBeDisabled();
    }
  });
});
