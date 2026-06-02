import { test, expect } from "@playwright/test";
test.describe("ListItem CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-list-item").first()).toBeVisible();
  });
});
