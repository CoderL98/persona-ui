import { test, expect } from "@playwright/test";
test.describe("Accordion A11y", () => {
  test("has expand buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[aria-expanded]").first()).toBeVisible();
  });
});
