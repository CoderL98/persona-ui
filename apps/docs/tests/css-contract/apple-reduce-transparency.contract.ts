import { test, expect } from "@playwright/test";

test.describe("0A.2.3 Apple Reduced Transparency", () => {
  test("Apple normal mode has blur > 0", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    const blur = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-apple-material-blur")
        .trim(),
    );
    expect(blur).toBe("18px");
  });

  test("data-reduce-transparency sets blur to 0px", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-reduce-transparency", "true");
    });
    const blur = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-apple-material-blur")
        .trim(),
    );
    expect(blur).toBe("0px");
  });

  test("reduce transparency surfaces are opaque", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-reduce-transparency", "true");
    });
    const materialBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-apple-material-regular")
        .trim(),
    );
    // Must not contain 'transparent' keyword — should be solid color
    expect(materialBg).not.toContain("transparent");
  });
});
