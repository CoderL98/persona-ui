import { test, expect } from "@playwright/test";

test.describe("Card Visual Regression", () => {
  const themes = [
    "apple-light",
    "apple-dark",
    "material-light",
    "material-dark",
  ] as const;

  for (const themeMode of themes) {
    test(`Card renders in ${themeMode}`, async ({ page }) => {
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

      const cardSection = page.locator(
        'section[aria-labelledby="cards-heading"]',
      );
      await expect(cardSection).toBeVisible();
      await expect(cardSection).toHaveScreenshot(`card-${themeMode}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});
