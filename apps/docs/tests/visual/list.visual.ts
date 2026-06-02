import { test, expect } from "@playwright/test";

test.describe("List Visual Regression", () => {
  const themes = ["apple-light", "apple-dark", "material-light", "material-dark"] as const;

  for (const themeMode of themes) {
    test(`List renders in ${themeMode}`, async ({ page }) => {
      const [theme, mode] = themeMode.split("-") as [string, string];
      await page.goto("/");
      await page.evaluate(([t, m]) => {
        document.documentElement.setAttribute("data-theme", t);
        document.documentElement.setAttribute("data-mode", m);
      }, [theme, mode]);
      await page.waitForTimeout(200);

      const section = page.locator('section[id="list"]');
      await expect(section).toBeVisible();
      await expect(section).toHaveScreenshot(`list-${themeMode}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});
