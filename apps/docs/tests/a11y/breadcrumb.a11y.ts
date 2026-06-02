import { test, expect } from "@playwright/test";
test.describe("Breadcrumb A11y", () => {
  test("has nav aria-label", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('nav[aria-label="Breadcrumb"]').first(),
    ).toBeVisible();
  });
});
