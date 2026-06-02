import { test, expect } from "@playwright/test";

test.describe("TextField Visual Regression", () => {
  const themes = [
    "apple-light",
    "apple-dark",
    "material-light",
    "material-dark",
  ] as const;

  for (const themeMode of themes) {
    test(`TextField renders in ${themeMode}`, async ({ page }) => {
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

      const fieldSection = page.locator(
        'section[aria-labelledby="fields-heading"]',
      );
      await expect(fieldSection).toBeVisible();
      await expect(fieldSection).toHaveScreenshot(
        `text-field-${themeMode}.png`,
        {
          maxDiffPixels: 100,
        },
      );
    });
  }
});
