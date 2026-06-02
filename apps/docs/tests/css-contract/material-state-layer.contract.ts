import { test, expect } from "@playwright/test";

test.describe("0A.3.6 Material State Layer", () => {
  test("Button in Material theme has pui-state-layer class", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
    });
    const btn = page.locator("button.pui-state-layer").first();
    await expect(btn).toBeVisible();
  });

  test("State layer pseudo-element exists on button", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
    });
    // Verify the button has the state-layer class (structural check)
    const btn = page.locator("button.pui-state-layer").first();
    await expect(btn).toBeVisible();
    // Verify ::before computed style has opacity transition
    const hasTransition = await btn.evaluate((el) => {
      const cs = getComputedStyle(el, "::before");
      return cs.transitionProperty.includes("opacity");
    });
    expect(hasTransition).toBe(true);
  });
});
