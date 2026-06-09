import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const libPkg = resolve(here, "../../packages/lib");
const libSrc = join(libPkg, "src/lib");

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: [
      // 让 lib 内的 $lib 解析到 packages/lib/src/lib
      { find: /^$lib\/(.*)$/, replacement: join(libSrc, "$1") },
      { find: "$lib", replacement: libSrc },
    ],
  },
  server: {
    fs: {
      allow: [libPkg],
    },
  },
  optimizeDeps: {
    include: ["@persona-ui/lib"],
  },
  build: {
    // P2 修复：docs.js 单个 chunk 507.73 kB
    // 根因：import.meta.glob 静态加载所有 .md → rollup 聚合到一个 chunk
    // 解法：按 lang 拆分 markdown chunk，每个 locale 独立懒加载
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // docs 源文件的 markdown 原文按 locale 拆
          if (id.includes("/docs-content/en/")) return "docs-en";
          if (id.includes("/docs-content/zh-CN/")) return "docs-zh-cn";
          if (id.includes("/docs-content/zh-TW/")) return "docs-zh-tw";
          // node_modules 第三方库单独拆（marked / highlight.js / etc）
          if (id.includes("node_modules/marked/")) return "vendor-marked";
          if (id.includes("node_modules/highlight.js/")) return "vendor-highlight";
        },
      },
    },
    // 调高阈值到 1MB（Vite 默认 500 kB 偏严，docs 站 70 组件 + 三语 + 高亮）
    // 拆 chunk 后单 chunk 应在 200-400 kB 区间，1MB 是合理缓冲
    chunkSizeWarningLimit: 1024,
  },
});

