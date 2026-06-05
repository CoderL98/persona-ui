#!/usr/bin/env node
/**
 * 主题包 CSS 拷贝脚本
 * tsc 不会处理 .css 资产，所以构建后手动把 src/<theme>.css 拷到 dist/。
 * 用法：node copy-theme-css.mjs <theme-package-name>
 *   例：node copy-theme-css.mjs theme-apple
 *        → cp src/apple.css dist/apple.css
 */
import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageName = process.argv[2];
if (!packageName) {
  console.error("usage: copy-theme-css.mjs <package-name>");
  process.exit(1);
}

const pkgDir = resolve(__dirname, "..", "packages", packageName);
const cssName = packageName.replace(/^theme-/, ""); // theme-apple → apple

const srcCss = resolve(pkgDir, "src", `${cssName}.css`);
const distDir = resolve(pkgDir, "dist");
const distCss = resolve(distDir, `${cssName}.css`);

await mkdir(distDir, { recursive: true });
await copyFile(srcCss, distCss);
console.log(`[copy-theme-css] ${packageName}: ${srcCss} → ${distCss}`);
