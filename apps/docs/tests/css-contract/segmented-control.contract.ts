import { test, expect } from "@playwright/test";
test.describe("SegmentedControl CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-segmented-control").first()).toBeVisible();
  });
});
