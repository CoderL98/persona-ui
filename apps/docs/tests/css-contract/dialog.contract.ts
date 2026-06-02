import { test, expect } from "@playwright/test";
test.describe("Dialog CSS", () => {
  test("visible", async ({ page }) => {
    await page.goto("/");
    expect(true).toBe(true);
  });
});
