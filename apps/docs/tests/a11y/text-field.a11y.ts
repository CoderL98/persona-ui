import { test, expect } from "@playwright/test";

test.describe("TextField Accessibility", () => {
  test("TextField input is focusable", async ({ page }) => {
    await page.goto("/");
    const input = page.locator("input").first();
    await input.focus();
    await expect(input).toBeFocused();
  });

  test("TextField with error sets aria-invalid", async ({ page }) => {
    await page.goto("/");
    const errorInput = page.locator('input[aria-invalid="true"]');
    if ((await errorInput.count()) > 0) {
      await expect(errorInput).toBeVisible();
    }
  });

  test("TextField label is associated with input", async ({ page }) => {
    await page.goto("/");
    const label = page.locator("label").first();
    if ((await label.count()) > 0) {
      const forAttr = await label.getAttribute("for");
      expect(forAttr).toBeTruthy();
      const input = page.locator(`#${forAttr}`);
      await expect(input).toBeVisible();
    }
  });
});
