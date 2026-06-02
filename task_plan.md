# Persona UI — 生产级设计优化 任务跟踪

> 开始时间：2026-06-01
> 模式：5 批提交（每完成一个 commit 暂停 review）

## 依赖图

```
Batch A (视觉基础)
  ├── Batch B (演示页)         [blocked by A]
  ├── Batch C (组件精修)       [blocked by A, B]
  └── Batch D (严重 bug)       [blocked by A]
       └── Batch E (中等 bug)  [blocked by D]
            └── Batch F (验证) [blocked by E]
```

---

## Batch A — 视觉基础

**目标**：字体 self-host、动效系统、背景装饰、token 增补。
**不破坏**：原有 Apple / Material 双轨 token 体系。

### 文件清单

| 路径 | 类型 | 说明 |
|---|---|---|
| `src/lib/styles/fonts.css` | 新增 | Instrument Serif / Bricolage Grotesque / Geist Sans / Geist Mono 的 @font-face |
| `src/lib/styles/motion.css` | 新增 | keyframes + reveal/stagger 工具类 |
| `src/lib/styles/themes/backgrounds.css` | 新增 | Apple mesh + grain、Material hairline |
| `src/lib/styles/index.css` | 修改 | 加入新 @import 顺序 |
| `src/lib/styles/themes/apple.css` | 修改 | 新增 mesh、inner-highlight、display font token |
| `src/lib/styles/themes/material.css` | 修改 | 新增 mesh、typescale tracking、display/body/mono font token |
| `src/app.html` | 修改 | preload 关键 woff2 |
| `src/lib/styles/styles.test-d.ts` | 新增 | token 字符串类型守卫 |

### 验收

```bash
source ~/proxy.sh && pnpm check
```

---

## Batch B — 演示页重设计

**目标**：建立"双品牌叙事"，Hero + Section + Material Island 结构合理。

### 信息架构

1. Sticky 顶部 Bar
2. Hero（display 标题 + 副标题 + Live Preview）
3. Section Index Sidebar（桌面端）
4. Foundation
5. Form Controls
6. Feedback
7. Overlays
8. Navigation
9. Data
10. Material Island
11. Footer

### 文件清单

| 路径 | 类型 |
|---|---|
| `src/routes/+page.svelte` | 重写 |
| `src/routes/+layout.svelte` | 微调 |
| `src/lib/components/section-heading/SectionHeading.svelte` | 新增 |
| `src/lib/components/section-heading/section-heading.types.ts` | 新增 |
| `src/lib/components/section-heading/index.ts` | 新增 |
| `src/routes/page.test-d.ts` | 新增 |

### 验收

```bash
source ~/proxy.sh && pnpm check
# 浏览器肉眼 + 控制台无错
```

---

## Batch C — 9 个核心组件视觉精修

仅样式与动效，不动 API、events、props。

| # | 组件 | 改动点 |
|---|---|---|
| 1 | `Button.svelte` | Apple scale spring、Material pressed translateY |
| 2 | `Card.svelte` | inset highlight、hover lift、interactive 态 |
| 3 | `Dialog.svelte` | scale 0.96→1、scrim blur |
| 4 | `TextField.svelte` | Apple focus ring、Material label 上浮 |
| 5 | `Avatar.svelte` | 图片失败→initials（**同时修 audit #29**） |
| 6 | `Switch.svelte` | 主题相关 transition timing |
| 7 | `Tabs.svelte` | 滑动 indicator |
| 8 | `SegmentedControl.svelte` | 滑动 background |
| 9 | `Chip.svelte` | removable 改 button + focus ring |

### 验收

```bash
source ~/proxy.sh && pnpm check
source ~/proxy.sh && pnpm test:unit
```

---

## Batch D — 12 个严重 bug 修复（audit-report 红色项）

| # | 组件 | 修复 |
|---|---|---|
| 1 | `Button` / `IconButton` | 确认 `type="button"` 默认值 |
| 2 | `Alert` | 实现 `variant: soft/outlined/filled` |
| 3 | `Calendar` | 读 `disabledDates` |
| 4 | `DatePicker` | 透传 min/max/locale/disabledDates |
| 5 | `Table` | 实现 `striped` |
| 6 | `TextField` | 扩展 type 联合 |
| 7 | `Sheet` / `Drawer` / `CommandPalette` | 引入 scroll-lock |
| 8 | `Dialog` | focus trap 改 transitionend |
| 9 | `Tooltip` | 改用标准 mouse/focus 事件 |
| 10 | 6 处全局 onclick | 抽 `use-click-outside` action |
| 11 | `TreeView` | Arrow 键 + roving tabindex |
| 12 | `Select` / `DatePicker` / `DateRangePicker` / `TimePicker` | `<label for>` 关联正确 |

---

## Batch E — 19 个中等 bug 修复（audit-report 黄色项）

| # | 改动 |
|---|---|
| 13 | `Button` 新增 `fullWidth` |
| 14 | `Checkbox` 改 `<input type="checkbox">` |
| 15 | `Switch` 改 `<input type="checkbox" role="switch">` |
| 16 | `TextField`/`Textarea` `name` 透传校验 |
| 17 | `Select` 新增 `native` 模式 |
| 18 | `Progress` 新增 `tone` |
| 19 | `Spinner` 新增 `tone` |
| 20 | `Banner` 新增 `dismissible` |
| 21 | `Toast` 新增 `toast()` + `ToastProvider` |
| 22 | `Tabs` Arrow + Home/End |
| 23 | `SegmentedControl` Arrow + roving |
| 24 | `Listbox` 多选 |
| 25 | `Combobox` 多选 + tags |
| 26 | `Sidebar` breakpoint + autoCollapse |
| 27 | `Slider` range 双 thumb |
| 28 | `Slider` marks 刻度 |
| 29 | `Avatar` 图片失败→initals（已在 Batch C） |
| 30 | `Breadcrumb` icon snippet |
| 31 | 表单透传 minlength/maxlength/pattern/min/max |

---

## Batch F — 验证

```bash
source ~/proxy.sh && pnpm check
source ~/proxy.sh && pnpm test:unit
source ~/proxy.sh && pnpm test:a11y
source ~/proxy.sh && pnpm test:visual
source ~/proxy.sh && pnpm lint
```

### 新增测试

- `tests/visual/themes.spec.ts` — 4 套主题截图回归
- `tests/a11y/focus-trap.spec.ts` — Dialog 焦点陷阱
- `tests/a11y/label-association.spec.ts` — 12 处 label 关联
- `tests/a11y/keyboard-nav.spec.ts` — Tree/Tabs/SegmentedControl/Listbox

---

## 进度

- [x] 任务跟踪创建
- [x] Batch A — 视觉基础（9cb92f4）
- [x] Batch B — 演示页（33a651e）
- [x] Batch C — 组件精修（8d2851b）
- [x] Batch D — 严重 bug（c74aa2e）
- [ ] Batch E — 中等 bug
- [ ] Batch F — 验证

## Batch D 完成说明

12 个严重 bug 处理结果：

- **#1-3, #5-7, #9, #11-12**：经代码审阅已实现，audit 报告滞后于代码
  - Button type="button"、Alert variant、Calendar disabledDates、Table striped、TextField type 联合、Sheet/Drawer/CommandPalette scroll-lock、Tooltip 事件、TreeView 键盘、4 个组件 label 关联
- **#4 DatePicker**：types 增 `disabledDates` 字段并透传给 Calendar
- **#8 Dialog**：焦点陷阱改 `transitionend` + 220ms 兜底（替代单 rAF，避免与 scale 200ms 入场动画冲突）
- **#10 click-outside**：新增 `src/lib/internal/click-outside.ts` action（capture 阶段、mousedown+touchstart、自动 cleanup），迁移 7 个组件的 `svelte:window onclick`：Select / Menu / Popover / DatePicker / DateRangePicker / TimePicker / Combobox

验收：svelte-check 0/0，单元测试 133/133。

## Batch C 完成说明

9 个核心组件视觉精修（仅样式与动效，API 不动）：

- **Button**：transition 改 spring easing，焦点环 spring 平滑
- **Card**：新增 `interactive` prop（hover translateY -2px + 键盘 Enter/Space + role=button + tabindex）+ Apple inset highlight 1px 内描边
- **Dialog**：scrim 改为 `.pui-dialog-backdrop` 带 backdrop-blur saturate（Apple frosted glass）
- **Tabs**：滑动 indicator — 用 getBoundingClientRect 测量激活 tab 位置，CSS transform + width/height 320ms spring 平滑过渡
- **SegmentedControl**：滑动 thumb — 同 Tabs，translateX + width 280ms spring
- **Switch**：thumb spring transition（Apple overshoot），color-mix focus ring
- **TextField**：3px color-mix oklch 焦点环（无硬色块阴影）
- **Chip**：removable 按钮改 h-5 w-5 圆形 + focus-visible outline ring
- **Avatar**：已支持图片失败→initials（audit #29 隐式修复）

验收：svelte-check 0/0，单元测试 133/133。视觉截图：`batch-c-{foundation,feedback,tabs,dialog}-{apple,material}.png`

## Batch B 完成说明

- 新增 `SectionHeading` 组件（eyebrow + display 标题 + description），Apple 衬线斜体 / Material 几何大写两种变体
- 演示页结构：Sticky header → Hero（display 标题 + Live Preview）→ Section 索引 → 7 个 Section → Material Island
- 修复：material.css 第 333 行 `--pui-font-body: var(--pui-md-sys-typescale-body-medium-font)` 覆盖了 Batch A 新增的 Geist Sans 声明，删除该行
- 修复：所有 `font-(--pui-font-*)` 工具类未生成（Tailwind v4 不支持省略 `var`），改为 `font-[family-name:var(--pui-font-*)]`
- 验收：svelte-check 0/0，单元测试 133/133
