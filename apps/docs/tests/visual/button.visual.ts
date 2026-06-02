import { test, expect } from "@playwright/test";

test.describe("Button Visual Regression", () => {
  const themes = [
    "apple-light",
    "apple-dark",
    "material-light",
    "material-dark",
  ] as const;

  for (const themeMode of themes) {
    test(`Button renders in ${themeMode}`, async ({ page }) => {
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

      // Take a screenshot of the Button section
      const buttonSection = page.locator(
        'section[aria-labelledby="buttons-heading"]',
      );
      await expect(buttonSection).toBeVisible();
      await expect(buttonSection).toHaveScreenshot(`button-${themeMode}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});
