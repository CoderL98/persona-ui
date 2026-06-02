import { test, expect } from "@playwright/test";

test.describe("0A.2.5 Hit Target (44px)", () => {
  test("Hit target CSS variable is defined on root", async ({ page }) => {
    await page.goto("/");
    const ht = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pui-hit-target-min")
        .trim(),
    );
    expect(ht).toBe("44px");
  });

  test(".pui-button rendered height >= 44px", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
    // Target Persona UI Button (class pui-button), not the header buttons
    const box = await page.locator("button.pui-button").first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test(".pui-button rendered width >= 44px", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
    const box = await page.locator("button.pui-button").first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
  });

  test(".pui-button min-height via computed style", async ({ page }) => {
    await page.goto("/");
    const mh = await page
      .locator("button.pui-button")
      .first()
      .evaluate((el) => {
        return getComputedStyle(el).minHeight;
      });
    // min-height should be 44px via CSS variable or fallback
    expect(parseFloat(mh)).toBe(44);
  });
});
