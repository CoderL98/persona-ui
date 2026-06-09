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
    // P2 优化：从 3 桶 (locale) → 9 桶 (locale × 字母段)
    // 71 组件 + 14 guide = 85 文档 → 每 locale ~28 文档，3 字母段 ~9-10 文档
    // 单 chunk 从 150 kB → 50-60 kB（更利于 HTTP/2 流式按需拉取）
    //
    // 字母段划分（与文件名第一个字符匹配）：
    //   A-G  →  docs-{locale}-ag   (~30 文档)
    //   H-N  →  docs-{locale}-hn   (~25 文档)
    //   O-Z  →  docs-{locale}-oz   (~30 文档)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // docs markdown 按 locale × 字母段 9 桶拆
          // Vite 给的 id 形如 ".../docs-content/en/components/accordion.md?raw"
          // 注意：取"文件名第一字符"而非"after 路径第一字符"（after 是 "components/xxx.md"，
          // 第一个字符是 'c' 把所有 components/* 都归到 ag 桶）
          for (const locale of ["en", "zh-CN", "zh-TW"] as const) {
            const tag = `/docs-content/${locale}/`;
            if (id.includes(tag)) {
              const after = id.split(tag)[1] ?? "";
              const afterClean = after.split("?")[0];
              // 提取文件名（最后一段，去 .md）
              const filename = afterClean.split("/").pop()?.replace(/\.md$/, "") ?? "";
              const first = filename[0]?.toLowerCase() ?? "z";
              // 字母段：A-G / H-N / O-Z
              if (first < "h") return `docs-${locale}-ag`;
              if (first < "o") return `docs-${locale}-hn`;
              return `docs-${locale}-oz`;
            }
          }
          // node_modules 第三方库单独拆
          if (id.includes("node_modules/marked/")) return "vendor-marked";
          if (id.includes("node_modules/highlight.js/")) return "vendor-highlight";
        },
      },
    },
    // 调高阈值到 1MB（Vite 默认 500 kB 偏严）
    chunkSizeWarningLimit: 1024,
  },
});

