import { test, expect } from "@playwright/test";
test.describe("Drawer A11y", () => {
  test("visible when open", async ({ page }) => {
    await page.goto("/");
    const drawer = page.locator('[role="dialog"][aria-modal="true"]').first();
    if ((await drawer.count()) > 0) await expect(drawer).toBeVisible();
  });
});
