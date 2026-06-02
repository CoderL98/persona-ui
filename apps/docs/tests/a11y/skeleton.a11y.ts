import { test, expect } from "@playwright/test";
test.describe("Skeleton A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator(".pui-skeleton").count()).toBeGreaterThan(0);
  });
});
