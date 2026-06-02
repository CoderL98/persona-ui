import { test, expect } from "@playwright/test";

test.describe("Switch Visual Regression", () => {
  const themes = [
    "apple-light",
    "apple-dark",
    "material-light",
    "material-dark",
  ] as const;

  for (const themeMode of themes) {
    test(`Switch renders in ${themeMode}`, async ({ page }) => {
      const [theme, mode] = themeMode.split("-") as [string, string];
      await page.goto("/");
      await page.evaluate(
        ([t, m]) => {
          document.documentElement.setAttribute("data-theme", t);
          document.documentElement.setAttribute("data-mode", m);
        },
        [theme, mode],
      );
      await page.waitForTimeout(200);

      const swSection = page.locator(
        'section[aria-labelledby="switches-heading"]',
      );
      await expect(swSection).toBeVisible();
      await expect(swSection).toHaveScreenshot(`switch-${themeMode}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});
