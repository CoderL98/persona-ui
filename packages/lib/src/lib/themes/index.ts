/**
 * 主题公共 API 入口
 *
 * 对外暴露：
 * - 类型：ThemeDef / ThemeMode / ThemeRegistry
 * - 默认注册表：THEMES（空数组，消费方自行组合）
 *
 * 不暴露：
 * - 任何具体主题实现（由 `@persona-ui/theme-*` 包提供）
 * - 任何 CSS（由各主题包 styles 入口提供）
 */

// ── 类型契约 ──
export type { ThemeDef, ThemeMode, ThemeRegistry } from "./types.js";

// ── 默认注册表（空，消费方应自行聚合） ──
export { THEMES } from "./registry.js";
