import { test, expect } from "@playwright/test";

test.describe("Button CSS Contract", () => {
  test("default button has border-radius from CSS variable", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    const button = page.locator("button").first();
    const borderRadius = await button.evaluate(
      (el) => getComputedStyle(el).borderRadius,
    );
    // Apple: --pui-radius-control = 14px
    expect(borderRadius).toBe("14px");
  });

  test("local style override changes border-radius", async ({ page }) => {
    await page.goto("/");
    // Find the button with a local override (the "Radius=2px" button)
    const overrideButton = page.locator("button", { hasText: "Radius=2px" });
    if ((await overrideButton.count()) > 0) {
      const borderRadius = await overrideButton.evaluate(
        (el) => getComputedStyle(el).borderRadius,
      );
      expect(borderRadius).toBe("2px");
    }
  });

  test("data-theme switch changes border-radius from apple to material", async ({
    page,
  }) => {
    await page.goto("/");
    // Apple mode
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    await page.waitForTimeout(100);
    const appleRadius = await page
      .locator("button")
      .first()
      .evaluate((el) => getComputedStyle(el).borderRadius);
    // Switch to material
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
    });
    await page.waitForTimeout(100);
    const materialRadius = await page
      .locator("button")
      .first()
      .evaluate((el) => getComputedStyle(el).borderRadius);
    // Apple radius (14px) should differ from Material radius (999px)
    expect(appleRadius).not.toBe(materialRadius);
    expect(materialRadius).toBe("999px");
  });
});
