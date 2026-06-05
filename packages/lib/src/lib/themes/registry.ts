/**
 * 主题注册表 — 默认空
 *
 * 设计要点：
 * 1. lib 主体**不**内置任何主题（避免 tree-shaking 失效、避免 peerDep 循环）
 * 2. 消费方（docs 站、第三方应用）从各 `@persona-ui/theme-*` 包导入 themeDef，
 *    自己组合成 `THEMES` 数组传给切换器/网格
 * 3. 此处导出空数组仅为：
 *    a) 提供类型示例
 *    b) 让未配置主题的应用仍能 import 通过（fallback 到 tokens.css 默认值）
 *
 * 重要：本数组**故意**为空。任何"自动发现"机制（如扫描文件 glob）都违反
 * peerDep 设计原则 — 主题包应是显式 opt-in，而非隐式 bundled。
 */
import type { ThemeRegistry } from "./types.js";

/**
 * 主题注册表（默认空数组）
 *
 * 消费方典型用法：
 * ```ts
 * import { themeDef as apple } from '@persona-ui/theme-apple';
 * import { themeDef as material } from '@persona-ui/theme-material';
 * import type { ThemeRegistry } from '@persona-ui/lib/themes';
 *
 * export const ALL_THEMES: ThemeRegistry = Object.freeze([apple, material]);
 * ```
 */
export const THEMES: ThemeRegistry = Object.freeze([]);
