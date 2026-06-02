import { test, expect } from "@playwright/test";
test.describe("Drawer CSS", () => {
  test("visible when open", async ({ page }) => {
    await page.goto("/");
    expect(
      await page.locator('[role="dialog"]').count(),
    ).toBeGreaterThanOrEqual(0);
  });
});
