/**
 * 主题注册中心 — 类型契约层
 *
 * 设计目标：让 lib 主体保持"主题无关"，仅暴露类型契约与一个空注册表。
 * 真正的 theme 描述（cssVarPrefix、icon、label 等）由各主题包（@persona-ui/theme-*）
 * 通过 `themeDef: ThemeDef` 导出，消费方（docs 站、第三方应用）在自己的聚合层
 * 把多个 themeDef 收集到 `THEMES` 数组，循环渲染主题切换器与 specimen 网格。
 *
 * 关键约束：
 * 1. 本文件**只**包含类型 + JSDoc；不包含任何主题实现
 * 2. 主题 cssVarPrefix 必须全局唯一（CSS 选择器 [data-theme={id}] 即约定）
 * 3. ThemeDef 字段冻结（readonly），运行时误改不会跨包污染
 */

/** 主题亮暗模式：light / dark 二选一，与 [data-mode] 属性对齐 */
export type ThemeMode = "light" | "dark";

/**
 * 主题描述契约 — 一个主题 = 一个 ThemeDef 对象
 *
 * 消费方应通过 `Object.freeze()` 或 `as const` 锁定字段，避免运行时误改。
 */
export interface ThemeDef {
  /** 主题唯一 id，映射到 `[data-theme={id}]` DOM 属性（kebab-case，例：'apple'、'material'、'fluent'） */
  readonly id: string;

  /** 主题显示名（fallback 标签，优先级低于 i18n labelKey） */
  readonly label: string;

  /**
   * i18n 键名（docs 站消费），约定 `toggleTheme_{id}` 形式
   * 例：id='apple' → i18n key='toggleTheme_apple'
   */
  readonly labelKey: string;

  /**
   * 切换器图标 SVG path d 属性（不含外层 svg 标签），便于在按钮内联渲染
   * 建议 12×12 viewBox 单色 currentColor
   */
  readonly iconSvg: string;

  /**
   * 该主题专属 CSS 变量前缀（不含 `--`），用于样式隔离与文档检索
   * 例：'pui-apple' / 'pui-md-sys' / 'pui-fluent'
   * 警告：必须全局唯一，重复会导致主题间样式污染
   */
  readonly cssVarPrefix: string;

  /**
   * 是否为默认主题（多个 default 时取第一个）
   * 仅文档/演示用，lib 内部不依赖此字段
   */
  readonly isDefault?: boolean;

  /**
   * 是否支持 dark mode（true → 该主题的 [data-mode='dark'] 块存在）
   * false 的主题在 dark 模式下回退到 light 视觉（或父级主题）
   */
  readonly darkSupport: boolean;

  /**
   * 主题包 npm 名（用于 peerDependency 检查与 docs 站"未装主题包"诊断）
   * 例：'@persona-ui/theme-apple'
   * 可选：纯 CSS 主题可省略
   */
  readonly packageName?: string;
}

/**
 * 主题聚合器：消费方（docs 站、第三方应用）从各 theme 包收集 ThemeDef
 *
 * 使用示例：
 * ```ts
 * import { themeDef as apple } from '@persona-ui/theme-apple';
 * import { themeDef as material } from '@persona-ui/theme-material';
 * export const ALL_THEMES: readonly ThemeDef[] = [apple, material];
 * ```
 *
 * 约束：消费方应用 `Object.freeze()` 锁定整个数组，防止运行时 push/pop 造成主题错乱
 */
export type ThemeRegistry = readonly ThemeDef[];
