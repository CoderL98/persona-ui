---
"@persona-ui/lib": major
---

# 🚨 BREAKING: 事件 props 统一为驼峰命名

按 CLAUDE.md 规范统一所有事件回调 prop 为 `on*` + 驼峰命名：

| 旧（小写）           | 新（驼峰）              | 影响组件                                                       |
| --------------------- | ----------------------- | -------------------------------------------------------------- |
| `onopenchange`        | `onOpenChange`          | Dialog, Sheet, Drawer, Toast, CommandPalette, Combobox         |
| `onselect`            | `onSelect`              | CommandPalette, Menu                                           |
| `onchange` (custom)   | `onValueChange`         | Calendar, DatePicker, DateRangePicker, TimePicker, Switch, Combobox, Select, Listbox, Radio, Tabs, SegmentedControl, Slider |
| `oninput` (custom)    | `onInputChange`         | Combobox, Slider                                               |
| `onclick` (custom)    | `onClick`               | Chip, Card, IconButton (where applicable)                      |
| `onremove`            | `onRemove`              | Chip                                                           |
| `onexpandedchange`    | `onExpandedChange`      | TreeView                                                       |
| `onselectionchange`   | `onSelectionChange`     | DataTable                                                      |
| `onsort`              | `onSort`                | DataTable                                                      |
| `ontoggle`            | `onToggle`              | TreeView                                                       |

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
