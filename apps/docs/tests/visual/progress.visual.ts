import { test, expect } from "@playwright/test";

test.describe("Progress Visual Regression", () => {
  const themes = ["apple-light", "apple-dark", "material-light", "material-dark"] as const;

  for (const themeMode of themes) {
    test(`Progress renders in ${themeMode}`, async ({ page }) => {
      const [theme, mode] = themeMode.split("-") as [string, string];
      await page.goto("/");
      await page.evaluate(([t, m]) => {
        document.documentElement.setAttribute("data-theme", t);
        document.documentElement.setAttribute("data-mode", m);
      }, [theme, mode]);
      await page.waitForTimeout(200);

      const section = page.locator('section[id="progress"]');
      await expect(section).toBeVisible();
      await expect(section).toHaveScreenshot(`progress-${themeMode}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});
