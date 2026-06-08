#!/usr/bin/env node
/**
 * inject-tokens-shim.mjs
 *
 * 作用：主题包 build 完成后，从 @persona-ui/lib 的 tokens-manifest.json
 *      读取所有 semantic token，把 lib 默认值（保留 var(--pui-ref-*) 引用）
 *      作为 fallback 块追加到主题 dist/{id}.css 末尾。
 *
 * 目的：避免主题包 src/ 重复声明 83 个 lib 默认 token。
 *      lib 升级加新 token 时，主题 build 自动跟随。
 *
 * 用法：node ./scripts/inject-tokens-shim.mjs <theme-id>
 *       （已挂在主题包 package.json#scripts.build 末尾）
 *
 * 前置：
 *   1. pnpm --filter @persona-ui/lib build （提供 dist/tokens-manifest.json）
 *   2. 主题 build 已跑（提供 dist/{id}.css）
 *
 * 零依赖：仅用 node:fs / node:path / node:url 内置模块
 *        （与 copy-theme-css.mjs / build-tokens-manifest.mjs 风格保持一致）
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// -----------------------------------------------------------------------------
// 1. 解析参数
// -----------------------------------------------------------------------------
const themeId = process.argv[2];
if (!themeId) {
  console.error("usage: node inject-tokens-shim.mjs <theme-id>");
  console.error("  e.g. node inject-tokens-shim.mjs apple");
  process.exit(1);
}

const themeDir = resolve(ROOT, `packages/theme-${themeId}`);
const distCssPath = resolve(themeDir, `dist/${themeId}.css`);
const libManifestPath = resolve(ROOT, "packages/lib/dist/tokens-manifest.json");
const libTokensCss = resolve(ROOT, "packages/lib/dist/styles/tokens.css");

// -----------------------------------------------------------------------------
// 2. 守卫
// -----------------------------------------------------------------------------
if (!existsSync(libManifestPath)) {
  console.error(`✗ ${libManifestPath} 不存在`);
  console.error(`  请先跑 \`pnpm --filter @persona-ui/lib build\`（生成 dist/tokens-manifest.json）`);
  process.exit(1);
}
if (!existsSync(distCssPath)) {
  console.error(`✗ ${distCssPath} 不存在`);
  console.error(`  请先跑主题 build（tsc + copy-theme-css）`);
  process.exit(1);
}

// -----------------------------------------------------------------------------
// 3. 解析 manifest 拿 token 名
// -----------------------------------------------------------------------------
const manifest = JSON.parse(readFileSync(libManifestPath, "utf-8"));
const semanticTokens = manifest.tokens.semantic;

// -----------------------------------------------------------------------------
// 4. 解析 lib tokens.css 拿原始 token 定义
//    策略：每个 manifest token 直接从 tokens.css 里"切出"它的整行定义（含 --pui-{name}: {value};）
//    这样天然处理 var() 引用 + 空 value（var 被清洗后 value 为空字符串，仍要保留）
// -----------------------------------------------------------------------------
const libCss = readFileSync(libTokensCss, "utf-8");

/**
 * 从 tokens.css 文本中提取指定 token 名的完整定义行
 * 关键：保留 token 原本在 css 里的"原始样子"——value 是 var() 引用就保留引用
 * @param {string} name - 不带 `--` 前缀的 token 名
 * @returns {string | null} - 完整定义行 `--pui-{name}: {value};`，未找到返 null
 */
function extractTokenDefinition(name) {
  // name 已带 pui- 前缀（来自 manifest.tokens.semantic），直接拼 --
  // 关键：保留 token 原本在 css 里的"原始样子"——value 是 var() 引用就保留引用
  const re = new RegExp(`--${name}\\s*:\\s*([^;]+);`);
  const m = libCss.match(re);
  if (!m) return null;
  return `--${name}: ${m[1].trim()};`;
}

// -----------------------------------------------------------------------------
// 5. 生成 shim CSS 块
// -----------------------------------------------------------------------------
const shimLines = [];
let missing = 0;
for (const token of semanticTokens) {
  const definition = extractTokenDefinition(token);
  if (definition === null) {
    missing++;
    console.warn(`⚠ manifest 含 --${token} 但 lib tokens.css 未定义，跳过`);
    continue;
  }
  shimLines.push(`  ${definition}`);
}

const shim = `

/* ==========================================================
   AUTO-INJECTED from @persona-ui/lib/tokens-manifest
   ⚠ Do not edit — regenerate via pnpm --filter @persona-ui/theme-${themeId} build
   Token count: ${shimLines.length} (semantic)
   Generated: ${new Date().toISOString()}
   Manifest version: ${manifest.version}
   ========================================================== */
[data-theme='${themeId}'] {
${shimLines.join("\n")}
}
`;

// -----------------------------------------------------------------------------
// 6. 追加到 dist CSS
// -----------------------------------------------------------------------------
const existing = readFileSync(distCssPath, "utf-8");
writeFileSync(distCssPath, existing + shim);

// -----------------------------------------------------------------------------
// 7. 打印摘要
// -----------------------------------------------------------------------------
console.log(`✓ injected ${shimLines.length} tokens into dist/${themeId}.css`);
if (missing > 0) {
  console.log(`  ⚠ ${missing} tokens skipped (defined in manifest but not in lib tokens.css)`);
}
