---
"@persona-ui/lib": patch
---

fix: P0 严重缺陷修复

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
