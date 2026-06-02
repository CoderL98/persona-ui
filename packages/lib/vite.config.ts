import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  plugins: [svelte({ hot: false })],
  resolve: {
    conditions: ["browser"],
    alias: {
      $lib: path.resolve(__dirname, "src/lib"),
    },
  },
  test: {
    include: ["tests/unit/**/*.{test,spec}.{ts,js}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/unit/setup.ts"],
  },
});
