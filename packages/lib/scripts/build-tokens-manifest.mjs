#!/usr/bin/env node
/**
 * build-tokens-manifest.mjs
 *
 * 作用：解析 packages/lib/dist/styles/tokens.css，
 *      提取所有 --pui-* CSS 变量名，按 Primitive / Semantic 分层，
 *      写到 packages/lib/dist/tokens-manifest.json。
 *
 * 用途：第三方主题 fork 用 manifest 做"通用 token 全覆盖测试"。
 *      lib 升级加新 token 时，manifest 自动跟随更新，第三方测试会立刻 fail。
 *
 * 前置：必须先跑 `svelte-package`（svelte-package 会把 src/lib 拷到 dist/，
 *       其中包含 styles/tokens.css）。本脚本只解析 dist/ 产物，不动 src/。
 *
 * 用法：node ./scripts/build-tokens-manifest.mjs
 *       （已挂在 packages/lib/package.json#scripts.build 末尾）
 *
 * 零依赖：仅用 node:fs / node:path / node:url 内置模块
 *        （与 scripts/copy-theme-css.mjs 风格保持一致）
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 脚本位于 packages/lib/scripts/，要回到 packages/lib/ 根
const LIB_ROOT = resolve(__dirname, "..");

const TOKENS_CSS = resolve(LIB_ROOT, "dist/styles/tokens.css");
const OUTPUT = resolve(LIB_ROOT, "dist/tokens-manifest.json");
const PKG_JSON = resolve(LIB_ROOT, "package.json");

// -----------------------------------------------------------------------------
// 守卫：svelte-package 必须先跑
// -----------------------------------------------------------------------------
if (!existsSync(TOKENS_CSS)) {
  console.error(`✗ ${TOKENS_CSS} 不存在`);
  console.error(`  请先跑 \`pnpm --filter @persona-ui/lib build\`（svelte-package 会生成 dist/styles/tokens.css）`);
  process.exit(1);
}

// -----------------------------------------------------------------------------
// 1. 读 package.json 拿 version
// -----------------------------------------------------------------------------
const pkg = JSON.parse(readFileSync(PKG_JSON, "utf-8"));
const version = pkg.version;

// -----------------------------------------------------------------------------
// 2. 读 tokens.css + 清洗 var(--xxx) 嵌套
// -----------------------------------------------------------------------------
const css = readFileSync(TOKENS_CSS, "utf-8");
// 防止 var(--pui-color-primary) 这种嵌套被正则重复匹配
// 也不要把 "ref" 之类作为 var(--xxx) 内部的 token 错误抓出
const cleaned = css.replace(/var\(--[^)]+\)/g, "");

// -----------------------------------------------------------------------------
// 3. 提取所有 --pui-* 变量名（裸名，不带 --）
// -----------------------------------------------------------------------------
// (?<![-a-z0-9])  防止把 --pui-xxx-yyy 里的 "xxx" 当独立变量
// --([a-z][a-z0-9-]*)  变量名（小写字母开头，可含数字/连字符）
// \s*:  后面是冒号
const VAR_RE = /(?<![-a-z0-9])--([a-z][a-z0-9-]*)\s*:/g;
const matches = [...cleaned.matchAll(VAR_RE)];
const allVars = [...new Set(matches.map((m) => m[1]))];

// -----------------------------------------------------------------------------
// 4. 按前缀分层
// -----------------------------------------------------------------------------
// Primitive: --pui-ref-*  (基础色板/灰度/间距/动画曲线/圆角/不透明度参考)
// Semantic:  --pui-* 但不是 ref-*  (组件可直接消费的语义化 token)
const primitive = allVars
  .filter((v) => v.startsWith("pui-ref-"))
  .sort();

const semantic = allVars
  .filter((v) => v.startsWith("pui-") && !v.startsWith("pui-ref-"))
  .sort();

// 防御：抓出既不是 primitive 也不是 semantic 的"漏网之鱼"（防止 tokens.css 命名漂移）
const unknown = allVars
  .filter((v) => !v.startsWith("pui-ref-") && !v.startsWith("pui-"))
  .sort();
if (unknown.length > 0) {
  console.warn(`⚠ 发现非 --pui- 前缀的 token（应纳入 manifest 但不分类）：${unknown.join(", ")}`);
}

// -----------------------------------------------------------------------------
// 5. 写 manifest
// -----------------------------------------------------------------------------
const manifest = {
  version,
  generatedAt: new Date().toISOString(),
  source: "dist/styles/tokens.css",
  totals: {
    all: allVars.length,
    primitive: primitive.length,
    semantic: semantic.length,
  },
  tokens: {
    primitive,
    semantic,
  },
};

writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + "\n");

// -----------------------------------------------------------------------------
// 6. 打印摘要
// -----------------------------------------------------------------------------
console.log(`✓ tokens-manifest.json 已生成 (${OUTPUT})`);
console.log(`  version:     ${version}`);
console.log(`  primitive:   ${primitive.length} 个`);
console.log(`  semantic:    ${semantic.length} 个`);
console.log(`  total:       ${allVars.length} 个`);
console.log(`  unknown:     ${unknown.length} 个（非 --pui- 前缀）`);
