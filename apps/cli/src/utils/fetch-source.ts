import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

/**
 * Source discriminator：
 *   - local:  本地相对/绝对路径（开发调试用）
 *   - remote: HTTPS URL，CLI 会按 raw.githubusercontent.com 协议拼接子文件
 */
export type FetchSource =
  | { kind: "local"; baseDir: string }
  | { kind: "remote"; baseUrl: string };

/**
 * 解析 source 参数为 FetchSource
 *
 * 规则：
 *   - http:// 或 https:// 开头 → remote，baseUrl 去掉末尾文件名
 *   - 其他 → local，baseDir 是 input 所在目录（绝对路径）
 */
export function parseSource(input: string): FetchSource {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    // https://persona-ui.dev/r/theme-apple.json → baseUrl = https://persona-ui.dev/r
    const baseUrl = input.replace(/\/[^/]+\.json$/, "");
    return { kind: "remote", baseUrl };
  }
  const absPath = resolve(input);
  return { kind: "local", baseDir: dirname(absPath) };
}

/**
 * 探测 monorepo 根：向上找 pnpm-workspace.yaml
 * 找不到则返回 process.cwd()
 */
function findMonorepoRoot(): string {
  let dir = process.cwd();
  while (true) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return process.cwd(); // 兜底：根
    dir = parent;
  }
}

/**
 * 把 (source, relPath) 解析为最终的文件绝对路径
 *
 * 设计：relPath 可能是 monorepo 根相对（如 "packages/theme-apple/dist/apple.css"）
 *       也可能是 baseDir 相对（如 "styles/theme.css"）。
 *       先尝试 baseDir + relPath，存在则用；否则回退到 monorepo 根 + relPath。
 */
async function resolveLocalPath(
  baseDir: string,
  relPath: string,
): Promise<string> {
  const primary = resolve(baseDir, relPath);
  if (existsSync(primary)) return primary;

  // 回退：monorepo 根
  const root = findMonorepoRoot();
  const fallback = resolve(root, relPath);
  if (existsSync(fallback)) return fallback;

  throw new Error(
    `文件不存在：尝试 ${primary} 和 ${fallback}（都没找到）`,
  );
}

/**
 * 拉取 source 下某个子路径的文本
 *
 * local  → readFile(baseDir + "/" + relPath)，找不到则回退到 monorepo 根
 * remote → 拼 raw.githubusercontent.com（owner/repo/ref 由环境变量或默认值）
 */
export async function fetchText(
  src: FetchSource,
  relPath: string,
): Promise<string> {
  if (src.kind === "local") {
    const full = await resolveLocalPath(src.baseDir, relPath);
    return readFile(full, "utf-8");
  }

  // remote：用环境变量配置 owner/repo/ref，默认 rcc/persona-ui/main
  const owner = process.env.PUI_REPO_OWNER ?? "rcc";
  const repo = process.env.PUI_REPO_NAME ?? "persona-ui";
  const ref = process.env.PUI_REPO_REF ?? "main";
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${relPath}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`fetch ${url} → HTTP ${res.status}`);
  }
  return res.text();
}
