/**
 * Material 3 主题注册信息
 *
 * 该对象遵循 @persona-ui/lib 的 ThemeDef 契约，消费方在聚合层（docs 站或第三方应用）
 * 把多个 themeDef 收集到 THEMES 数组后，可循环渲染主题切换器。
 *
 * CSS 入口路径（消费方在 app.css 中显式 @import）：
 *   @import '@persona-ui/theme-material/material.css';
 *
 * 前置依赖：消费方必须先 @import '@persona-ui/lib/styles.css' 或 core.css
 * （提供 tokens / fonts / motion / utilities / shared 共用层），否则本主题的
 * 引用 token 会落空。
 */
import type { ThemeDef } from "@persona-ui/lib";

/** Material 标志 M 字（简化单色版，12×12 viewBox，currentColor 描边） */
const MATERIAL_ICON_SVG =
  "M2 2.5h2.4l1.6 5.6L7.6 2.5h2.4L8 11.5H6L2 2.5zm9 0h2v9h-2v-9z";

export const themeDef: ThemeDef = Object.freeze({
  id: "material",
  label: "Material 3",
  labelKey: "toggleTheme_material",
  iconSvg: MATERIAL_ICON_SVG,
  cssVarPrefix: "pui-md-sys",
  darkSupport: true,
  packageName: "@persona-ui/theme-material",
});

export default themeDef;
