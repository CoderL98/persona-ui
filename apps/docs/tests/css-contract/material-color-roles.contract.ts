import { test, expect } from "@playwright/test";

test.describe("0A.3.1 Material 3 Color Roles", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "material");
    });
  });

  const requiredRoles = [
    "--pui-md-sys-color-primary",
    "--pui-md-sys-color-on-primary",
    "--pui-md-sys-color-primary-container",
    "--pui-md-sys-color-on-primary-container",
    "--pui-md-sys-color-secondary",
    "--pui-md-sys-color-on-secondary",
    "--pui-md-sys-color-secondary-container",
    "--pui-md-sys-color-on-secondary-container",
    "--pui-md-sys-color-tertiary",
    "--pui-md-sys-color-on-tertiary",
    "--pui-md-sys-color-tertiary-container",
    "--pui-md-sys-color-on-tertiary-container",
    "--pui-md-sys-color-error",
    "--pui-md-sys-color-on-error",
    "--pui-md-sys-color-error-container",
    "--pui-md-sys-color-on-error-container",
    "--pui-md-sys-color-background",
    "--pui-md-sys-color-on-background",
    "--pui-md-sys-color-surface",
    "--pui-md-sys-color-on-surface",
    "--pui-md-sys-color-surface-variant",
    "--pui-md-sys-color-on-surface-variant",
    "--pui-md-sys-color-outline",
    "--pui-md-sys-color-outline-variant",
    "--pui-md-sys-color-shadow",
    "--pui-md-sys-color-scrim",
    "--pui-md-sys-color-inverse-surface",
    "--pui-md-sys-color-inverse-on-surface",
    "--pui-md-sys-color-inverse-primary",
    "--pui-md-sys-color-surface-dim",
    "--pui-md-sys-color-surface-bright",
    "--pui-md-sys-color-surface-container-lowest",
    "--pui-md-sys-color-surface-container-low",
    "--pui-md-sys-color-surface-container",
    "--pui-md-sys-color-surface-container-high",
    "--pui-md-sys-color-surface-container-highest",
  ];

  for (const role of requiredRoles) {
    test(`${role} is non-empty`, async ({ page }) => {
      const value = await page.evaluate((r) => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue(r)
          .trim();
      }, role);
      expect(value).not.toBe("");
    });
  }
});
