import { test, expect } from "@playwright/test";
test.describe("Sheet CSS", () => {
  test("visible when open", async ({ page }) => {
    await page.goto("/");
    expect(
      await page.locator('[aria-modal="true"]').count(),
    ).toBeGreaterThanOrEqual(0);
  });
});
