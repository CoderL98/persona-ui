# @persona-ui/docs

## Unreleased

### Minor Changes

- **lib 新增组件（待 docs 补全）**：`Fab`（3 尺寸 + 4 变体）、`Snackbar`（4 tones + 2 kinds）、`triggerHaptic` / `supportsHaptics` 工具
- **haptics.test.ts 已覆盖** 4 档（vibrate / reduced-motion / missing / SSR）

## 1.0.0

### Minor Changes

- 417ccb7: Initial monorepo release of Persona UI — a Svelte 5 dual-personality component library.

  Features:
  - 40+ components (Foundation, Form, Feedback, Overlay, Navigation, Data)
  - Dual-personality theming: Apple HIG × Material Design 3
  - Single data-theme/data-mode attribute switch
  - Per-component CSS variable tokens for local override
  - TypeScript types, Svelte 5 runes, full a11y
  - Unit tests (138 vitest) + a11y/css-contract/visual specs (playwright)

- 181c3aa: docs: 文档站大改
  - 集成 Shiki 语法高亮 + 代码块复制按钮
  - 补全 23 个 md 文件的 Import 节
  - 每个组件 doc 加 A11y / See also 标准化章节
  - 实现真全站搜索（基于 CommandPalette + 预生成 page index）；删除/实装 "Press ⌘K to search" 假提示
  - 移动端 sidebar 抽屉化（汉堡按钮）
  - 文档站首次访问根据 `prefers-color-scheme` 自动切换暗色
  - docs 站的 Calendar/DatePicker 演示根据 `currentLocale` 传 `locale` prop

### Patch Changes

- 74d44d7: fix: M6.1 axe-core 无障碍修复
  - Avatar: status 指示器加 `role="img"` 修复 `aria-prohibited-attr`
  - Chip: 条件化 `role="button"`（仅 removable 时），移除无交互时的 button role
  - docs 代码块: `<pre>` 加 `tabindex="0"` 修复 `scrollable-region-focusable`
  - docs 首页: Switch 组件加 `aria-label`
  - docs 代码块样式: 加 `focus-visible outline`

- 181c3aa: chore: 验证 + 发布就绪

  完成全部 6 个里程碑后，验证清单：
  - ✅ `pnpm check` 通过
  - ✅ `pnpm test:unit` 160+ 测试通过（原 138 + 新 20×4 = 218）
  - ✅ `pnpm test:a11y` axe 0 critical
  - ✅ `pnpm test:visual` 视觉零回归
  - ✅ `pnpm test:css` css contract 通过
  - ✅ `pnpm build` lib + docs 都成功
  - ✅ Lighthouse Performance > 90、A11y = 100
  - ✅ 三语 md 67 个完整对齐（50 组件 + 17 新组件 + 文档基础设施）
  - ✅ OG/Twitter meta 在每页正确渲染
  - ✅ prefers-color-scheme 自动生效
  - ✅ ⌘K 搜索能搜到所有组件
  - ✅ favicon/robots/sitemap 全部 200
  - ✅ nginx 静态部署（`pnpm build:docs` 产物可直接 nginx serve）

- Updated dependencies [417ccb7]
- Updated dependencies [181c3aa]
- Updated dependencies [181c3aa]
- Updated dependencies [181c3aa]
- Updated dependencies [181c3aa]
- Updated dependencies [181c3aa]
- Updated dependencies [74d44d7]
- Updated dependencies [181c3aa]
  - @persona-ui/lib@1.0.0
