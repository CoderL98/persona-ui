---
title: 可访问性
group: guide
---

# 可访问性

Persona UI 致力于让所有组件都具备键盘可达性、对屏幕阅读器友好，并尊重用户的偏好设置。

## 键盘策略

- 所有可交互组件都可通过 Tab 键获得焦点。
- Enter/Space 激活按钮、开关、链接。
- 方向键用于在 TabList、RadioGroup、Menu、Listbox、Combobox、Slider、TreeView 中导航。
- Escape 关闭浮层（Dialog、Sheet、Drawer、Popover、Menu、Select 选项、Combobox 选项）。
- 打开的模态对话框会捕获焦点；关闭后焦点会返回触发元素。

## 焦点可见

- 所有可交互元素在 `:focus-visible` 时显示一条 2px 的 `--pui-color-primary` 描边。
- 该描边遵循 `--pui-radius-control` 以保持一致的圆角。
- 使用鼠标点击时不会显示焦点环（遵循原生 `:focus-visible` 行为）。

## ARIA

组件使用以下角色与属性：

| Component  | Role                              | Key Attributes                                                |
| ---------- | --------------------------------- | ------------------------------------------------------------- |
| Button     | `<button>`                        | `aria-busy` (loading), `aria-label`                           |
| IconButton | `<button>`                        | `aria-label` (required)                                       |
| Switch     | `<button role="switch">`          | `aria-checked`                                                |
| Checkbox   | `<button role="checkbox">`        | `aria-checked` (supports `"mixed"`)                           |
| Listbox    | `role="listbox"`                  | `aria-selected` on options                                    |
| Select     | `role="combobox"`                 | `aria-expanded`, `aria-controls`, `aria-haspopup`             |
| Combobox   | `role="combobox"`                 | `aria-expanded`, `aria-autocomplete`, `aria-activedescendant` |
| Dialog     | `role="dialog"`                   | `aria-modal`, `aria-labelledby`, `aria-describedby`           |
| Menu       | `role="menu"`                     | `role="menuitem"` on items                                    |
| Tabs       | `role="tablist"`                  | `role="tab"`, `role="tabpanel"`, `aria-selected`              |
| Progress   | `role="progressbar"`              | `aria-valuenow`, `aria-valuemin`, `aria-valuemax`             |
| Alert      | `role="alert"` or `role="status"` | `aria-live="polite"`                                          |
| Spinner    | `role="status"` or `presentation` | `aria-hidden` (decorative)                                    |
| TreeView   | `role="tree"`                     | `role="treeitem"`, `aria-expanded`, `aria-selected`           |
| Breadcrumb | `<nav aria-label="Breadcrumb">`   | `aria-current="page"`                                         |
| Tooltip    | `role="tooltip"`                  | `aria-describedby` on trigger                                 |

> 注：表头与所有 ARIA 角色、属性值保持英文原样，以便与源码对照。

## 减少动效

Persona UI 通过 `prefers-reduced-motion: reduce` 媒体查询在所有组件中关闭动画、过渡与缩放变换。此规则在 `shared.css` 中以 CSS 强制实现。

## 颜色对比

- 所有语义化的颜色令牌均以 OKLCH 定义，确保可预测的对比度。
- 主色/错误色背景上的文字使用 `--pui-color-on-primary` / `--pui-color-on-error`。
- 增强对比模式（`data-contrast="more"`）会强制次级文字与主级文字对比度一致。
- 焦点环使用强调色，宽度 2px，偏移 2px。

## 标签

- `IconButton` 必须提供 `label` 属性 → `aria-label`。
- `TextField`、`Textarea`、`Select`、`Combobox`、`SearchField` 支持 `label` 与 `aria-label`。
- `Switch`、`Checkbox`、`Radio` 支持 `label` 属性；`RadioGroup` 支持 `label` → `<legend>`。
- 错误信息使用 `role="alert"`，并通过 `aria-describedby` 进行关联。

## 禁用状态

被禁用的组件：

- 不可获得焦点（使用原生 `disabled` 属性或 `pointer-events: none`）。
- 通过 `--pui-opacity-disabled` 设置 38% 的不透明度。
- 不响应点击与键盘事件。
