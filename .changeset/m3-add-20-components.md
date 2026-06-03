---
"@persona-ui/lib": minor
---

feat: 新增 20 个常用组件

补齐缺失的常用组件（对照 shadcn-svelte / Radix / Material UI 调研结果）：

**表单类（6）**：Form、FileUpload / DropZone、InputOTP、ColorPicker、Rating、InputGroup
**数据展示（4）**：Chart、Pagination、Stepper、VirtualList
**导航（3）**：Timeline、BottomNavigation、Breadcrumb 增强
**反馈（3）**：ConfirmDialog、Message、Tour / Guide
**悬浮层（2）**：ContextMenu、HoverCard
**布局 + 排版 + 工具（2）**：Stack / HStack / VStack、CodeBlock

每个组件含：实现 + types + 单测 + 三语 markdown 文档。组件总数从 50 增至 70。
