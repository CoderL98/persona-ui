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
});

