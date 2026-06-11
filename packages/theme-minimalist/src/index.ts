/**
 * Minimalist 主题注册信息
 *
 * 该对象遵循 @persona-ui/lib 的 ThemeDef 契约,消费方在聚合层(docs 站或第三方应用)
 * 把多个 themeDef 收集到 THEMES 数组后,可循环渲染主题切换器。
 *
 * CSS 入口路径(消费方在 app.css 中显式 @import):
 *   @import '@persona-ui/theme-minimalist/minimalist.css';
 *
 * 前置依赖:消费方必须先 @import '@persona-ui/lib/styles.css' 或 core.css
 * (提供 tokens / fonts / motion / utilities / shared 共用层),否则本主题的
 * 引用 token 会落空。
 */
import type { ThemeDef } from '@persona-ui/lib';

/**
 * Minimalist 极简线条图标(12×12 viewBox, fill 模式以兼容 layout 现有 SVG path 渲染)
 * 三条短水平线,色块宽 10 / 间距 3 / 厚度 1,体现"少即是多"的设计理念。
 */
const MINIMALIST_ICON_SVG = 'M2 2.5h10v1H2zm0 3.5h10v1H2zm0 3.5h10v1H2z';

export const themeDef: ThemeDef = Object.freeze({
  id: 'minimalist',
  label: 'Minimalist',
  labelKey: 'toggleTheme_minimalist',
  iconSvg: MINIMALIST_ICON_SVG,
  cssVarPrefix: 'pui-minimal',
  darkSupport: true,
  packageName: '@persona-ui/theme-minimalist',
});

export default themeDef;
