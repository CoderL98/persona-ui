import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.a11y.ts", "**/*.contract.ts", "**/*.visual.ts"],
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
  },
  webServer: {
    command: "pnpm run build && pnpm run preview",
    port: 4173,
    timeout: 30_000,
    reuseExistingServer: !process.env.CI,
  },
});
