# @persona-ui/lib

## Unreleased

### Major Changes (BREAKING)

- **refactor(lib)!: 12 个事件回调 prop 重命名为驼峰**（按 CLAUDE.md 第 2 条要求）
  - `Button` / `Card` / `Chip` / `IconButton` / `ListItem`：`onclick` → `onClick`
  - `Textarea` / `TextField`：`oninput` / `onchange` / `onfocus` / `onblur` → `onInput` / `onChange` / `onFocus` / `onBlur`
  - Svelte 5 中 DOM 元素（`<button>`、`<input>` 等）的 `onclick` 属性保持小写不变，仅组件 prop 重命名
  - 迁移示例：`<Button onclick={fn}>` → `<Button onClick={fn}>`；`<TextField oninput={fn}>` → `<TextField onInput={fn}>`

### Minor Changes

- **feat(apple): 1:1 复刻 iOS 17 HIG 缺失的 4 类 token** — System Fill（4 档 light+dark）、Semantic Icon（4 档）、Content Margins（3 档）、Dynamic Type Scale（11 档 size+line-height）、Motion Timings（sheet 400ms / alert 200ms / page 350ms / `cubic-bezier(0.32, 0.72, 0, 1)`）
- **feat(material): 1:1 复刻 MD3 2024 缺失的 motion + 扩展色板** — 5 条标准 motion easing、6 档 motion duration、Success / Warning / Info 色板（light + dark 各 12 token）

### Patch Changes

- fix: 27 个组件用 `crypto.randomUUID()` 替代 `Math.random()` 生成 fallback id，避免 SSR/CSR hydration mismatch 与 ARIA 关联断裂
- refactor(lib): 28 个组件改用 Svelte 5.20+ 内置 `$props.id()` 替代自建 `uniqueId()`，编译时位置 hash 稳定 SSR/CSR
- fix(toast): 修复 ToastViewport $effect cleanup 误清除所有 toast timer 的 bug；Toast 单例 timer 改用 untrack 写入，闭包不再持有旧值
- fix(list): 实装 `variant="inset"` 变体（原实现被静默忽略）
- fix(docs/search): 删除 SearchModal input 上重复的 `onkeydown={handleKey}`，避免与 svelte:window 双绑导致 ArrowDown/Up 跳 2 步、Enter 触发 2 次 goto
- fix(menu): 删除 Menu.svelte 内部 menu div 上重复的 `onkeydown={handleKeydown}`，避免与 svelte:window 双绑
- fix(layout): skipToContent 链接从 main 内部上移到 layout 第一个 focusable 元素，符合 WCAG 2.4.1 Bypass Blocks；main 加 `tabindex="-1"` 作为锚点焦点目标
- fix(i18n): `store.svelte.ts:28` `setLocale` 加 `if (browser)` 守卫，避免 SSR 读 `localStorage` 抛错
- fix(sitemap): hreflang 改 BCP 47 标准 `zh-CN` / `zh-TW`（之前使用非规范 `zh-cn` / `zh-tw`）
- fix(404): docs 站新增品牌化错误页（75 行，三语 i18n 齐全）
- fix(tailwind): 6 处 `py-[var()]` 等简单 var() 引用改 `py-(--var)` 简写（Card/TextField 复杂表达式保留 `[...]`）
- test: 9 个 9 行占位测试扩展为 33 个真实功能覆盖（Drawer/Menu/Popover/Sheet/Sidebar/Tabs/Tooltip/Toolbar/ListItem）
- docs: 12 个组件 API 表 prop 名同步驼峰（button/icon-button/text-field/textarea × 3 语）
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

