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
 * 用法：
 *   node ./scripts/inject-tokens-shim.mjs <theme-id>          # 注入模式（默认）
 *   node ./scripts/inject-tokens-shim.mjs <theme-id> --check  # 仅检测，不写文件
 *   node ./scripts/inject-tokens-shim.mjs --check             # 检测整个 monorepo
 *
 * --check 模式（反向检测）：只读 lib tokens.css + manifest，输出
 *   "manifest 有但 tokens.css 未定义"的项。主题作者在 lib 升级前
 *   预先知道"如果我 build，会缺哪些 token"。
 *   不写任何文件。退出码：0=全匹配，1=有缺失。
 *
 * 前置：
 *   1. pnpm --filter @persona-ui/lib build （提供 dist/tokens-manifest.json）
 *   2. 主题 build 已跑（提供 dist/{id}.css）— 仅注入模式需要
 *
 * 零依赖：仅用 node:fs / node:path / node:url 内置模块
 *        （与 copy-theme-css.mjs / build-tokens-manifest.mjs 风格保持一致）
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// -----------------------------------------------------------------------------
// 1. 解析参数
// -----------------------------------------------------------------------------
const args = process.argv.slice(2);
const CHECK_MODE = args.includes("--check");
const positional = args.filter((a) => !a.startsWith("--"));

if (positional.length === 0 && !CHECK_MODE) {
  console.error("usage: node inject-tokens-shim.mjs <theme-id> [--check]");
  console.error("       node inject-tokens-shim.mjs --check   (扫描所有主题包)");
  process.exit(1);
}

// -----------------------------------------------------------------------------
// 2. 路径常量
// -----------------------------------------------------------------------------
const libManifestPath = resolve(ROOT, "packages/lib/dist/tokens-manifest.json");
const libTokensCss = resolve(ROOT, "packages/lib/dist/styles/tokens.css");

// -----------------------------------------------------------------------------
// 3. 守卫：lib build 必须先
// -----------------------------------------------------------------------------
if (!existsSync(libManifestPath)) {
  console.error(`✗ ${libManifestPath} 不存在`);
  console.error(`  请先跑 \`pnpm --filter @persona-ui/lib build\`（生成 dist/tokens-manifest.json）`);
  process.exit(1);
}
if (!existsSync(libTokensCss)) {
  console.error(`✗ ${libTokensCss} 不存在`);
  console.error(`  请先跑 \`pnpm --filter @persona-ui/lib build\``);
  process.exit(1);
}

// -----------------------------------------------------------------------------
// 4. 解析 manifest + tokens.css
// -----------------------------------------------------------------------------
const manifest = JSON.parse(readFileSync(libManifestPath, "utf-8"));
const semanticTokens = manifest.tokens.semantic;
const libCss = readFileSync(libTokensCss, "utf-8");

/**
 * 从 tokens.css 文本中提取指定 token 名的完整定义行
 * @param {string} name - 不带 `--` 前缀的 token 名（已带 pui- 前缀）
 * @returns {string | null} 完整定义行，未找到返 null
 */
function extractTokenDefinition(name) {
  const re = new RegExp(`--${name}\\s*:\\s*([^;]+);`);
  const m = libCss.match(re);
  if (!m) return null;
  return `--${name}: ${m[1].trim()};`;
}

/**
 * 计算"manifest 有但 tokens.css 未定义"的 token 列表
 * （这就是"反向检测"的核心——lib 升级时这里变化）
 */
function findMissingTokens() {
  const missing = [];
  for (const token of semanticTokens) {
    if (extractTokenDefinition(token) === null) {
      missing.push(token);
    }
  }
  return missing;
}

// -----------------------------------------------------------------------------
// 5. --check 模式：只检测，不写
// -----------------------------------------------------------------------------
if (CHECK_MODE) {
  const themesToCheck = positional.length > 0
    ? positional
    : readdirSync(resolve(ROOT, "packages"), { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name.startsWith("theme-"))
        .map((d) => d.name.replace(/^theme-/, ""));

  console.log(`\n  lib tokens-manifest v${manifest.version} — ${semanticTokens.length} semantic tokens\n`);

  let totalMissing = 0;
  for (const themeId of themesToCheck) {
    const distCssPath = resolve(ROOT, `packages/theme-${themeId}/dist/${themeId}.css`);
    const hasDist = existsSync(distCssPath);
    if (!hasDist) {
      console.log(`  ${themeId.padEnd(16)} ⚠ no dist/${themeId}.css (run theme build first)`);
      continue;
    }
    const distCss = readFileSync(distCssPath, "utf-8");
    let themeCovered = 0;
    const themeMissing = [];
    for (const token of semanticTokens) {
      if (new RegExp(`--${token}:`).test(distCss)) themeCovered++;
      else themeMissing.push(token);
    }
    totalMissing += themeMissing.length;
    const status = themeMissing.length === 0 ? "✓" : "✗";
    console.log(`  ${themeId.padEnd(16)} ${status} ${themeCovered}/${semanticTokens.length}`);
    if (themeMissing.length > 0 && themeMissing.length <= 10) {
      for (const t of themeMissing) {
        console.log(`                  - --${t}`);
      }
    } else if (themeMissing.length > 10) {
      for (const t of themeMissing.slice(0, 5)) {
        console.log(`                  - --${t}`);
      }
      console.log(`                  ... and ${themeMissing.length - 5} more`);
    }
  }

  // 反向：lib 端的 manifest vs tokens.css（用于检测 lib build 自身不一致）
  const libMissing = findMissingTokens();
  console.log("");
  console.log("  lib internal check (manifest vs tokens.css):");
  if (libMissing.length === 0) {
    console.log("    ✓ all 83 semantic tokens defined in tokens.css");
  } else {
    console.log(`    ✗ ${libMissing.length} tokens in manifest but NOT in tokens.css:`);
    for (const t of libMissing) {
      console.log(`      - --${t}`);
    }
    totalMissing += libMissing.length;
  }

  console.log("");
  if (totalMissing === 0) {
    console.log("  ✓ all themes fully cover manifest");
    process.exit(0);
  } else {
    console.log(`  ✗ ${totalMissing} total missing tokens across themes + lib`);
    process.exit(1);
  }
}

// -----------------------------------------------------------------------------
// 6. 注入模式（默认）
// -----------------------------------------------------------------------------
const themeId = positional[0];
if (!themeId) {
  console.error("usage: node inject-tokens-shim.mjs <theme-id>");
  process.exit(1);
}

const themeDir = resolve(ROOT, `packages/theme-${themeId}`);
const distCssPath = resolve(themeDir, `dist/${themeId}.css`);

if (!existsSync(distCssPath)) {
  console.error(`✗ ${distCssPath} 不存在`);
  console.error(`  请先跑主题 build（tsc + copy-theme-css）`);
  process.exit(1);
}

// 生成 shim CSS 块
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

// 追加到 dist CSS
const existing = readFileSync(distCssPath, "utf-8");
writeFileSync(distCssPath, existing + shim);

console.log(`✓ injected ${shimLines.length} tokens into dist/${themeId}.css`);
if (missing > 0) {
  console.log(`  ⚠ ${missing} tokens skipped (defined in manifest but not in lib tokens.css)`);
}
