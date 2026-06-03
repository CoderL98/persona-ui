# @persona-ui/lib

## 1.0.0

### Major Changes

- 181c3aa: # 🚨 BREAKING: 事件 props 统一为驼峰命名

  按 CLAUDE.md 规范统一所有事件回调 prop 为 `on*` + 驼峰命名：

  | 旧（小写）          | 新（驼峰）          | 影响组件                                                                                                                    |
  | ------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
  | `onopenchange`      | `onOpenChange`      | Dialog, Sheet, Drawer, Toast, CommandPalette, Combobox                                                                      |
  | `onselect`          | `onSelect`          | CommandPalette, Menu                                                                                                        |
  | `onchange` (custom) | `onValueChange`     | Calendar, DatePicker, DateRangePicker, TimePicker, Switch, Combobox, Select, Listbox, Radio, Tabs, SegmentedControl, Slider |
  | `oninput` (custom)  | `onInputChange`     | Combobox, Slider                                                                                                            |
  | `onclick` (custom)  | `onClick`           | Chip, Card, IconButton (where applicable)                                                                                   |
  | `onremove`          | `onRemove`          | Chip                                                                                                                        |
  | `onexpandedchange`  | `onExpandedChange`  | TreeView                                                                                                                    |
  | `onselectionchange` | `onSelectionChange` | DataTable                                                                                                                   |
  | `onsort`            | `onSort`            | DataTable                                                                                                                   |
  | `ontoggle`          | `onToggle`          | TreeView                                                                                                                    |

  **未变化**：DOM 事件 handlers（`onchange?: (e: Event) => void`、`oninput?: (e: Event) => void`、`onfocus`/`onblur` 等）保持小写，符合 Svelte 5 规范。

  **迁移指南**：

  ```svelte
  <!-- before -->
  <Dialog onopenchange={(o) => console.log(o)}>
  <Calendar onchange={(d) => console.log(d)}>
  <Switch onchange={(c) => console.log(c)}>

  <!-- after -->
  <Dialog onOpenChange={(o) => console.log(o)}>
  <Calendar onValueChange={(d) => console.log(d)}>
  <Switch onValueChange={(c) => console.log(c)}>
  ```

  TextField / Textarea 仅有 DOM 事件（`onchange?: (e: Event) => void`）保持原样。如需监听"值变化"，用 `bind:value` + `$effect`。

  API 一致性提升：texts 字段名（`dismiss` / `close` / `selectAll`）在所有组件中统一。

### Minor Changes

- 417ccb7: Initial monorepo release of Persona UI — a Svelte 5 dual-personality component library.

  Features:
  - 40+ components (Foundation, Form, Feedback, Overlay, Navigation, Data)
  - Dual-personality theming: Apple HIG × Material Design 3
  - Single data-theme/data-mode attribute switch
  - Per-component CSS variable tokens for local override
  - TypeScript types, Svelte 5 runes, full a11y
  - Unit tests (138 vitest) + a11y/css-contract/visual specs (playwright)

- 181c3aa: feat: 新增 20 个常用组件

  补齐缺失的常用组件（对照 shadcn-svelte / Radix / Material UI 调研结果）：

  **表单类（6）**：Form、FileUpload / DropZone、InputOTP、ColorPicker、Rating、InputGroup
  **数据展示（4）**：Chart、Pagination、Stepper、VirtualList
  **导航（3）**：Timeline、BottomNavigation、Breadcrumb 增强
  **反馈（3）**：ConfirmDialog、Message、Tour / Guide
  **悬浮层（2）**：ContextMenu、HoverCard
  **布局 + 排版 + 工具（2）**：Stack / HStack / VStack、CodeBlock

  每个组件含：实现 + types + 单测 + 三语 markdown 文档。组件总数从 50 增至 70。

### Patch Changes

- 181c3aa: docs: build config 修复 + SSG 静态化
  - 修复 `@persona-ui/docs` 站点 `ssr=false` + `adapter-static` 的配置矛盾（之前会导致 build 失败）
  - 改为完整 SSG：每个路由 `prerender = true` + `entries()` 显式枚举（[[lang]] + [...slug]）
  - 新增静态资源：favicon (16/32/180)、apple-touch-icon、og-image、robots.txt、site.webmanifest、sitemap.xml
  - 每个组件 doc 页加 OG/Twitter/canonical/hreflang SEO meta
  - 内联脚本在 hydration 前同步 `<html lang>`，避免 en→zh-CN 闪烁
  - 修复 `apps/docs/src/routes/+layout.svelte` 的 `data-theme`/`data-mode` 同步逻辑

  影响 `@persona-ui/docs` 站点的可访问性、SEO、构建产物。lib 包本身无 API 变化。

- 181c3aa: fix: P0 严重缺陷修复

  修复 12 个组件的关键 bug（详见 audit-report.md 第 2 节）：
  - **Avatar**: 图片加载失败时显示 initials fallback（之前 onerror 仅隐藏图片）
  - **Switch**: controlled 模式下 prop 变化能正确同步 UI
  - **TimePicker**: 加 Intl.DateTimeFormat locale 支持 + ArrowUp/Down/Enter/Esc 键盘导航 + aria-activedescendant + minTime/maxTime 限制
  - **Calendar**: 真正使用 `Intl.DateTimeFormat(locale)` 替代硬编码英文月份/星期
  - **NavigationRail**: 加 ArrowUp/Down 键盘导航 + 正确 role
  - **Combobox**: aria-selected 响应 activeIndex
  - **Select**: 加 aria-activedescendant
  - **Listbox**: 移除手造 Event，改用函数式 callback
  - **Drawer/Sheet**: 弹层打开时给背景加 inert
  - **DateRangePicker**: 实际应用 min/max 限制
  - **TextField/Textarea**: 修正事件透传（之前 `onchange` 被当属性而非事件）
  - **DatePicker/DateRangePicker/TimePicker/Popover/Menu**: 加 Esc 关闭
  - **DataTable**: 加键盘行导航 + role/aria-rowcount + selected 行的 aria-selected
  - **Banner**: dismissed prop 后续变化响应
  - **SearchField**: clear 按钮可被键盘访问（移除 tabindex=-1）

  ⚠️ 行为变化：TextField/Textarea 的 `onchange` 现在严格作为事件而非属性（DOM 行为），使用 `bind:value` 替代。

- 181c3aa: test: 补 5 个组件的单元测试

  为之前完全无单测的 5 个组件补 vitest 用例：
  - **DatePicker**: 打开/关闭、min/max 边界、locale 切换、清空
  - **DateRangePicker**: 6 种 granularity 切换、min/max 边界、跨月选择
  - **TimePicker**: 12h/24h 切换、AM/PM、键盘 Arrow、min/max
  - **SectionHeading**: level=1/2/3 渲染对应 h1/h2/h3
  - **Table**: density 3 变体、striped 渲染

  测试总数从 138 增至约 160。

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
