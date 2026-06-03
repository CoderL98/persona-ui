import { test, expect } from "@playwright/test";
test.describe("NavigationRail A11y", () => {
  test("doc page loads", async ({ page }) => {
    await page.goto("/docs/components/navigation-rail");
    await expect(page.locator("h1")).toContainText("NavigationRail");
    await expect(page.locator(".docs-content")).toBeVisible();
  });
});
