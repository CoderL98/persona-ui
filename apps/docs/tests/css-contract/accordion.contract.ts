import { test, expect } from "@playwright/test";
test.describe("Accordion CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-accordion").first()).toBeVisible();
  });
});
