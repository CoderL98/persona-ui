import { test, expect } from "@playwright/test";
test.describe("Select Visual", () => {
  const themes = ["apple-light", "material-light"] as const;
  for (const tm of themes) {
    test(tm, async ({ page }) => {
      const [t, m] = tm.split("-") as [string, string];
      await page.goto("/");
      await page.evaluate(
        ([a, b]) => {
          document.documentElement.setAttribute("data-theme", a);
          document.documentElement.setAttribute("data-mode", b);
        },
        [t, m],
      );
      await page.waitForTimeout(200);
      await expect(
        page.locator('section[aria-labelledby="select-heading"]'),
      ).toHaveScreenshot(`select-${tm}.png`, { maxDiffPixels: 100 });
    });
  }
});
