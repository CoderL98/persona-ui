import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  // @sveltejs/vite-plugin-svelte v7+ 不再支持 `hot` 选项（移至 Svelte 5 新 API）
  // 旧配置 `svelte({ hot: false })` 会触发 "invalid plugin options 'hot'" 警告
  plugins: [svelte()],
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
