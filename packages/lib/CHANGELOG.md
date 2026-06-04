# @persona-ui/lib

## Unreleased

### Patch Changes

- fix: 27 个组件用 `crypto.randomUUID()` 替代 `Math.random()` 生成 fallback id，避免 SSR/CSR hydration mismatch 与 ARIA 关联断裂
- fix(toast): 修复 ToastViewport $effect cleanup 误清除所有 toast timer 的 bug；Toast 单例 timer 改用 untrack 写入，闭包不再持有旧值
- fix(list): 实装 `variant="inset"` 变体（原实现被静默忽略）
- fix(docs/search): 删除 SearchModal input 上重复的 `onkeydown={handleKey}`，避免与 svelte:window 双绑导致 ArrowDown/Up 跳 2 步、Enter 触发 2 次 goto
- fix(menu): 删除 Menu.svelte 内部 menu div 上重复的 `onkeydown={handleKeydown}`，避免与 svelte:window 双绑
- fix(layout): skipToContent 链接从 main 内部上移到 layout 第一个 focusable 元素，符合 WCAG 2.4.1 Bypass Blocks；main 加 `tabindex="-1"` 作为锚点焦点目标
- fix: List.svelte inset 变体 class 改 `shadow-(--pui-elevation-1)` 简写（移除 `shadow-[var(--...)]` 违规）
- docs: 补 SectionHeading 三语言文档
- docs: 修正 checkbox / switch / alert 文档中 `onValueChange` / `ondismiss` 为与实现一致的 `onCheckedChange` / `onDismiss`（驼峰）

## 0.1.0 (2026-06-04)

首个 monorepo 发布。Svelte 5 dual-personality 组件库，Apple HIG × Material 3 通过 `data-theme`/`data-mode` 切换。

- 70 个组件（Foundation / Form / Feedback / Overlay / Navigation / Data / Advanced）
- 每个组件含：实现 + types + 单元测试 + 三语 markdown 文档
- 双主题体系：Apple HIG + Material Design 3（light/dark 各 13 套 token）
- 单元测试 410+（vitest）；a11y / css-contract / visual（playwright）
- 类型 / 构建：TypeScript strict + svelte-check 0 errors + lib + docs 双 build
- SSG 文档站（adapter-static）：favicon / og-image / robots / sitemap.xml 齐全
- 三语 SEO：hreflang / canonical / OG / Twitter / og:locale 全部对齐
- ⌘K 全站搜索，prefers-color-scheme 自动

