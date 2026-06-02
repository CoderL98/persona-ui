import { test, expect } from "@playwright/test";

test.describe("0A.3.5 Material Elevation 0-5", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
    });
  });

  const levels = ["level0", "level1", "level2", "level3", "level4", "level5"];

  for (const level of levels) {
    test(`--pui-md-sys-elevation-${level} is non-empty`, async ({ page }) => {
      const value = await page.evaluate((l) => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue(`--pui-md-sys-elevation-${l}`)
          .trim();
      }, level);
      expect(value).not.toBe("");
    });
  }

  test("dark mode tonal elevation exists", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
      document.documentElement.setAttribute("data-mode", "dark");
    });
    const value = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-md-sys-tonal-elevation-level1")
        .trim();
    });
    expect(value).not.toBe("");
  });
});
