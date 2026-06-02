import { test, expect } from "@playwright/test";
test.describe("Textarea CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-textarea").first()).toBeVisible();
  });
});
