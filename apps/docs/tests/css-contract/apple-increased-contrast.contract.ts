import { test, expect } from "@playwright/test";

test.describe("0A.2.4 Apple Increased Contrast", () => {
  test("normal mode secondary text differs from primary", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-text-primary")
        .trim(),
    );
    const secondary = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-text-secondary")
        .trim(),
    );
    expect(primary).not.toBe(secondary);
  });

  test("data-contrast=more makes secondary text equal to primary", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-contrast", "more");
    });
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-text-primary")
        .trim(),
    );
    const secondary = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-text-secondary")
        .trim(),
    );
    // With increased contrast, secondary = primary (both = --pui-apple-label)
    expect(secondary).toBe(primary);
  });

  test("data-contrast=more uses opaque separator for outline", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-contrast", "more");
    });
    const outline = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-outline")
        .trim(),
    );
    const opaqueSep = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-apple-opaque-separator")
        .trim(),
    );
    expect(outline).toBe(opaqueSep);
  });
});
