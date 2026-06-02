import { test, expect } from "@playwright/test";
test.describe("ListItem A11y", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pui-list-item").first()).toBeVisible();
  });
});
