# Persona UI 综合优化执行计划

## 用户决策
- **优先级**：1234 全做（修 P0 阻塞 + 补 P1 组件 + 改 P2 文档 + 重写 audit-report）
- **事件命名**：统一 `on*` + 驼峰（`onopenchange` → `onOpenChange`）
- **新增组件**：全量补充 ~20 个

## 整体时间估算
约 4-6 周（按每天 6-8 小时有效工作计），分 5 个里程碑。

---

## M0：审计报告 + 基础设施（半日）

### M0.1 重写 audit-report.md
- 替换根目录的 `audit-report.md`，标注"已过时"重定向到新报告
- 新报告分：✅ 已修复（12 个） / 🔴 仍存在（8 个） / 🆕 新发现（~20 个） / ⚪ 缺失组件（~20 个）
- 列出"事件命名迁移"清单（约 20+ 个 props 涉及）

### M0.2 修复 docs 构建配置矛盾（CRITICAL）
文件：`apps/docs/src/routes/+layout.ts`、`apps/docs/svelte.config.js`
- 方案：移除 `ssr=false`，每个路由 +page.ts 加 `export const prerender = true;`
- 或方案 B：保留 SPA，配置 `adapter-static fallback: '200.html'`（取决于部署目标）
- **必须先确定部署目标**（Vercel/Netlify/自托管）— 待用户确认

### M0.3 补 favicon / apple-touch-icon / robots.txt / sitemap.xml
- 创建 `apps/docs/static/favicon.png`（32×32 PNG，用现有 P 字母 logo）
- 创建 `apps/docs/static/apple-touch-icon.png`（180×180）
- 创建 `apps/docs/static/robots.txt`
- 创建 `apps/docs/src/routes/sitemap.xml/+server.ts`（基于路由动态生成）

### M0.4 事件命名迁移：API 调研 + changeset
- 全文 grep：`onopenchange|onvaluechange|ondismiss|onclose|oninput|onchange|onfocus|onblur|onsubmit|onclick|onhover|onvisiblechange`（驼峰版）
- 列出全部要改的 props（约 30+ 处）
- 在 `.changeset/` 加 "breaking: rename event props to camelCase" 条目
- 在 README 加迁移指南

---

## M1：P0 严重缺陷修复（2-3 日）

### M1.1 Avatar 修复
文件：`packages/lib/src/lib/components/avatar/Avatar.svelte:56-59`
```svelte
let imgFailed = $state(false);
// img 改为：
{#if src && !imgFailed}
  <img onerror={() => imgFailed = true} ... />
{:else if initials}
  <span>{initials}</span>
```
+ 单元测试覆盖 onerror fallback

### M1.2 Switch 受控模式修复
文件：`packages/lib/src/lib/components/switch/Switch.svelte:53-56`
- 改用 `$derived` 合并 controlled + internal 状态
- 加 `bind:checked` 双向同步
- 测试覆盖 prop 变化

### M1.3 TimePicker 国际化 + 键盘导航
- 用 `Intl.DateTimeFormat` 替代硬编码 AM/PM
- 加 ArrowUp/Down 步进、Enter 确认、Esc 取消
- 加 `aria-activedescendant`
- 加 `minTime` / `maxTime` 限制
- 加单元测试

### M1.4 Sidebar SSR hydration 修复
- 把 `viewportWidth` 改为 `untrack` 初始 + `$effect` 后修正
- 避免 fixed 模式视觉跳变

### M1.5 Tooltip 事件修复
文件：`Tooltip.svelte:25`
- `onfocusin` → `on:focusin`、`onfocusout` → `on:focusout`（CLAUDE.md 强调的规范）

### M1.6 弹层组件 Esc 关闭 + inert 背景
Dialog/Sheet/Drawer/DatePicker/TimePicker/DateRangePicker/Popover/Menu
- 统一封装 `use:keyboard` action 监听 Esc
- 打开时给 `<svelte:body>` 之外的兄弟加 `inert`（或全局 modal layer）

### M1.7 TreeView 键盘导航
文件：`packages/lib/src/lib/components/tree-view/`
- ArrowUp/Down 切换行
- ArrowRight 展开、ArrowLeft 收起
- Home/End 跳到首尾
- Roving tabindex

### M1.8 Calendar 真正用 locale
- `Intl.DateTimeFormat(locale, { month: 'long' })` 替换硬编码 `t.months`
- 同理 weekdays
- 测试覆盖 locale: 'ja-JP' / 'zh-CN' / 'ar-EG'

### M1.9 Combobox/Select aria-selected
- 让 `aria-selected` 响应 `activeIndex`
- 加 `aria-activedescendant`

### M1.10 DateRangePicker min/max 检查
- `selectDatePart/selectMonth/selectYear` 中加边界判断
- 测试覆盖 min/max 边界

### M1.11 Listbox 假 Event 修复
- 改用函数式 callback `onValueChange(newValue)` 而非手造 Event

### M1.12 TextField/Textarea 事件透传
- 改为 Svelte 5 标准 event modifier：`oninput`/`onchange` 用 `onevent` 形式
- 验证 form 表单提交可用

---

## M2：补 5 个缺失单元测试（1 日）

| 组件 | 测试用例 |
|---|---|
| `DatePicker` | 打开/关闭、min/max 边界、locale 切换、清空 |
| `DateRangePicker` | 6 种 granularity、min/max 边界、跨月选择 |
| `TimePicker` | 12h/24h 切换、AM/PM、键盘 Arrow、min/max |
| `SectionHeading` | level=1/2/3 渲染对应 h1/h2/h3 |
| `Table` | density 3 变体、striped 渲染 |

---

## M3：P1 新增 20 个组件（2-3 周）

按用户需求"全量补充"。每个组件含：实现 + types + 单测 + md 文档 + i18n 三语。

### M3.1 表单类（6 个）
1. **Form**（`form/Form.svelte` + `form/FormField.svelte`）
   - Context 管理 values/errors/touched
   - 集成原生 form submit
   - `use:enhance` 模式
2. **FileUpload / DropZone**（`file-upload/FileUpload.svelte`）
   - 拖放、单/多文件、accept、maxSize
   - 上传进度
3. **InputOTP**（`input-otp/InputOTP.svelte`）
   - N 位 OTP 自动 focus 切换
   - 粘贴自动填充
4. **ColorPicker**（`color-picker/ColorPicker.svelte`）
   - HEX/HSL/RGB 输入 + 拾色器面板
5. **Rating**（`rating/Rating.svelte`）
   - 星/心/自定义图标
   - half-star 支持
   - 键盘 Arrow
6. **InputGroup**（`input-group/InputGroup.svelte`）
   - 前后缀 addons（与 TextField 集成）

### M3.2 数据展示（4 个）
7. **Chart**（`chart/Chart.svelte`）— 纯 SVG 折线/柱状/饼（不依赖外部 chart 库）
8. **Pagination**（`pagination/Pagination.svelte`）— 页码 + 跳转 + 每页大小
9. **Stepper**（`stepper/Stepper.svelte` + `stepper/Step.svelte`）— 步骤条
10. **VirtualList**（`virtual-list/VirtualList.svelte`）— 大列表虚拟滚动

### M3.3 导航（3 个）
11. **Timeline**（`timeline/Timeline.svelte`）— 垂直/水平时间线
12. **BottomNavigation**（`bottom-navigation/BottomNavigation.svelte`）— 移动端底部
13. **Breadcrumb 增强** — 自定义 separator/图标（已有基础）

### M3.4 反馈（3 个）
14. **ConfirmDialog**（`confirm-dialog/ConfirmDialog.svelte`）— 命令式 `confirm()`
15. **Message**（`message/Message.svelte`）— 顶部 Message bar
16. **Tour / Guide**（`tour/Tour.svelte`）— 新手指引浮层 + 高亮目标

### M3.5 悬浮层（2 个）
17. **ContextMenu**（`context-menu/ContextMenu.svelte`）— 右键菜单
18. **HoverCard**（`hover-card/HoverCard.svelte`）— 悬停卡片（带 delay）

### M3.6 布局 + 排版 + 工具（2 个）
19. **Stack / HStack / VStack**（`stack/Stack.svelte`）— 布局原语
20. **CodeBlock**（`code-block/CodeBlock.svelte`）— 带 Shiki 高亮 + 复制按钮

---

## M4：P2 文档/官网大改（3-5 日）

### M4.1 代码高亮 + 复制按钮
- 装 `shiki`（已支持 Svelte 5）
- 改 `[...slug]/+page.svelte` 渲染逻辑：把 ``` 块走 shiki，其他 markdown 走 marked
- 给所有 `<pre>` 加复制按钮（封装 `CodeBlock`）

### M4.2 23 个 md 补 Import 节
- 检查每个组件 md，缺的补 `## Import` 章节
- 模板化

### M4.3 每个组件 md 加 A11y / See also
- 标准化 markdown 模板：
  ```
  # {Title}
  {1-2 句描述}
  ## Import
  ## Basic Usage
  ## API
  ## States
  ## Accessibility (键盘行为 + ARIA 角色)
  ## Related Components
  ```
- 批量补全（约 50 个 md 文件）

### M4.4 全站搜索（基于已渲染的 marked 内容）
- 在 layout 注册 CommandPalette（已有 `command-palette/CommandPalette.svelte`）
- 监听 `metaKey+K` / `ctrl+K`
- 内容索引：在 `lib/docs.ts` 预生成所有 md 的标题 + 内容摘要
- 去掉/实现 "Press ⌘K to search" 提示

### M4.5 SEO meta
- `[...slug]/+page.svelte` 补：
  - `<meta name="description">`
  - `<meta property="og:title|og:description|og:image|og:url|og:type">`
  - `<meta name="twitter:card|twitter:title|twitter:description">`
  - `<link rel="canonical">`
  - 三语 `<link rel="alternate" hreflang>`
- 准备 1 张 1200×630 og:image

### M4.6 prefers-color-scheme 自动切换
- `+layout.svelte` 首次访问读 `matchMedia('(prefers-color-scheme: dark)')` 设默认 mode
- 保留 localStorage 覆盖

### M4.7 移动端导航抽屉
- docs sidebar 移动端加汉堡按钮
- 用 Dialog 或 Drawer 打开侧栏

### M4.8 i18n 日期/数字本地化
- docs 站 Calendar/DatePicker 等组件展示时根据 `currentLocale` 传 `locale` prop
- 用 `Intl.NumberFormat` / `Intl.DateTimeFormat` 格式化示例

---

## M5：API 一致性收尾（1-2 日）

### M5.1 事件命名批量迁移
对所有组件的 `on*` props 改驼峰：
- `onopenchange` → `onOpenChange`
- `onvaluechange` → `onValueChange`
- `ondismiss` → `onDismiss`
- `onclose` → `onClose`
- `onselect` → `onSelect`
- `oninput`/`onchange`/`onfocus`/`onblur` 已是标准 HTML 事件，保留小写（这是 Svelte 5 规范）
- 全文 grep 替换（约 30+ 处）
- 更新每个 md 文档的 API 表
- 跑全量 test 验证

### M5.2 texts 模式统一
- 检查每个有 `texts` prop 的组件，确认 47 组件 texts 字段名一致（如 `dismiss` / `close` / `selectAll`）
- 不一致的对齐

### M5.3 Storybook 替代品：Playground 增强
- 每个组件 md 头部加 "Live Preview"（已部分实现）
- 用 sandbox iframe 跑代码

---

## M6：质量验证（最后 1 日）

### M6.1 跑全量测试
```bash
pnpm test           # check + unit
pnpm test:a11y      # playwright a11y
pnpm test:visual    # visual regression
pnpm test:css       # css contract
```

### M6.2 构建验证
```bash
pnpm build          # lib + docs 都构建通过
pnpm build:lib      # lib 包发布构建
```

### M6.3 视觉对比
- apple × light / apple × dark / material × light / material × dark 4 组合各组件截图
- 与 design tokens 校对

### M6.4 文档站最终巡检
- 用 Playwright 跑全站 200/404 检查
- 用 axe-core 跑全站 a11y 扫描
- 性能：Lighthouse 跑分（目标 Performance > 90，A11y = 100）

---

## 关键依赖与文件

| 文件 | 用途 |
|---|---|
| `packages/lib/src/lib/components/*/` | 50 个组件源码 |
| `packages/lib/src/lib/internal/` | 4 个工具（class, attrs, click-outside, scroll-lock） |
| `packages/lib/src/lib/styles/` | 6 个 CSS（tokens, themes, motion, fonts, utilities, index） |
| `apps/docs/docs-content/{en,zh-CN,zh-TW}/` | 三语 markdown 文档 |
| `apps/docs/src/lib/i18n/` | i18n 基础设施 |
| `apps/docs/src/routes/[[lang]]/docs/[...slug]/+page.svelte` | md 渲染器 |
| `apps/docs/src/app.html` | 模板（lang/字体/preload） |
| `apps/docs/svelte.config.js` | adapter 配置 |
| `.changeset/` | 版本管理 |

## 关键风险

1. **docs `ssr=false` 与 `adapter-static fallback:undefined` 矛盾** — 必须先确认部署目标
2. **事件命名迁移是 breaking change** — 需在 0.1.0-next.0 → 0.1.0 之间做，不应早 release
3. **新增 20 个组件工作量巨大** — 建议每 2-3 个组件 commit 一次
4. **shiki 体积大**（~500KB），按需动态 import
5. **i18n 4 组合**（apple/material × light/dark）× 50+ 组件 = 视觉测试矩阵巨大

## 验证清单

- [ ] `pnpm check` 通过
- [ ] `pnpm test:unit` 45+ 测试通过（原 45 + 新 20×4 = ~125）
- [ ] `pnpm test:a11y` axe 0 critical
- [ ] `pnpm test:visual` 视觉零回归
- [ ] `pnpm build` lib + docs 都成功
- [ ] Lighthouse Perf > 90、A11y = 100
- [ ] 三语 md 47 个完整对齐（含新增的 listbox + 20 个新组件 = 67）
- [ ] OG/Twitter meta 在每页正确渲染
- [ ] prefers-color-scheme 自动生效
- [ ] ⌘K 搜索能搜到所有组件
- [ ] favicon/robots/sitemap 全部 200

---

## 下一步行动

请确认：
1. docs 部署目标（Vercel/Netlify/自托管）？
2. 是否同意事件命名迁移作为 0.1.0 breaking change？
3. M0-M6 哪个里程碑先开干？
4. 是否需要把 `.changeset/` 加 7 个独立 changeset？
