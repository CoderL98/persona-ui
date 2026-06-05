/**
 * Apple HIG 主题注册信息
 *
 * 该对象遵循 @persona-ui/lib 的 ThemeDef 契约，消费方在聚合层（docs 站或第三方应用）
 * 把多个 themeDef 收集到 THEMES 数组后，可循环渲染主题切换器。
 *
 * CSS 入口路径（消费方在 app.css 中显式 @import）：
 *   @import '@persona-ui/theme-apple/apple.css';
 *
 * 前置依赖：消费方必须先 @import '@persona-ui/lib/styles.css' 或 core.css
 * （提供 tokens / fonts / motion / utilities / shared 共用层），否则本主题的
 * 引用 token 会落空。
 */
import type { ThemeDef } from "@persona-ui/lib";

/** Apple 标志 SVG path（简化单色版，12×12 viewBox，currentColor 描边） */
const APPLE_ICON_SVG =
  "M9.34 1.49c-.62.07-1.35.41-1.79.92-.39.45-.74 1.17-.61 1.86.66.05 1.35-.34 1.77-.83.4-.46.71-1.16.63-1.95zM12 11.04c-.45.78-1.05 1.55-1.9 1.56-.78.01-1.03-.46-1.92-.46-.89 0-1.16.45-1.91.47-.85.02-1.49-.84-1.94-1.62C3.2 8.78 2.93 5.5 4.6 3.66c.78-.86 2.01-1.41 3.16-1.42.84-.01 1.62.55 2.14.55.51 0 1.46-.67 2.46-.57.42.02 1.6.17 2.35 1.28-2.06 1.13-1.72 4.07-.71 7.54z";

export const themeDef: ThemeDef = Object.freeze({
  id: "apple",
  label: "Apple HIG",
  labelKey: "toggleTheme_apple",
  iconSvg: APPLE_ICON_SVG,
  cssVarPrefix: "pui-apple",
  darkSupport: true,
  packageName: "@persona-ui/theme-apple",
});

export default themeDef;
