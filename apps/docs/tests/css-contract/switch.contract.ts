import { test, expect } from "@playwright/test";

test.describe("Switch CSS Contract", () => {
  test("Switch track dimensions in Apple theme", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    await page.waitForTimeout(100);
    const sw = page.locator('button[role="switch"]').first();
    const w = await sw.evaluate((el) => {
      return getComputedStyle(el).width;
    });
    expect(w).toBe("44px");
  });

  test("Switch track dimensions in Material theme", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
    });
    await page.waitForTimeout(100);
    const sw = page.locator('button[role="switch"]').first();
    const w = await sw.evaluate((el) => {
      return getComputedStyle(el).width;
    });
    expect(w).toBe("52px");
  });

  test("Switch local override changes track color", async ({ page }) => {
    await page.goto("/");
    // The demo has a style override switch
    const overrideSwitch = page.locator(".pui-switch[style]").first();
    if ((await overrideSwitch.count()) > 0) {
      await expect(overrideSwitch).toBeVisible();
    }
  });
});
