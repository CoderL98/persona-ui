---
"@persona-ui/lib": patch
---

test: 补 5 个组件的单元测试

为之前完全无单测的 5 个组件补 vitest 用例：

- **DatePicker**: 打开/关闭、min/max 边界、locale 切换、清空
- **DateRangePicker**: 6 种 granularity 切换、min/max 边界、跨月选择
- **TimePicker**: 12h/24h 切换、AM/PM、键盘 Arrow、min/max
- **SectionHeading**: level=1/2/3 渲染对应 h1/h2/h3
- **Table**: density 3 变体、striped 渲染

测试总数从 138 增至约 160。
