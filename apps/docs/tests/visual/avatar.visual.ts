import { test, expect } from "@playwright/test";

test.describe("Avatar Visual", () => {
  const themes = [
    "apple-light",
    "apple-dark",
    "material-light",
    "material-dark",
  ] as const;
  for (const themeMode of themes) {
    test(`renders in ${themeMode}`, async ({ page }) => {
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
      await expect(
        page.locator('section[aria-labelledby="avatars-heading"]'),
      ).toHaveScreenshot(`avatar-${themeMode}.png`, { maxDiffPixels: 100 });
    });
  }
});
