# @persona-ui/lib

Svelte 5 双主题组件库 —— Apple HIG 与 Material 3，同一套 API。

## 安装

```bash
pnpm add @persona-ui/lib
```

对等依赖：`svelte ^5.0.0`

## 快速上手

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '@persona-ui/lib/styles.css';
</script>

<html data-theme="apple" data-mode="light">
  <slot />
</html>
```

```svelte
<!-- 任意组件内 -->
<script>
  import { Button } from '@persona-ui/lib';
</script>

<Button variant="filled">点击我</Button>
```

## 切换主题

在 `<html>`（或任意容器）上切换 `data-theme` 属性：

```svelte
<html data-theme="apple" data-mode="light">
  <!-- ... -->
</html>
```

| 属性           | 可选值                        | 作用               |
| -------------- | ----------------------------- | ------------------ |
| `data-theme`   | `'apple'` \| `'material'`     | 视觉语言           |
| `data-mode`    | `'light'` \| `'dark'`         | 色彩模式           |

主题可被任意子树覆盖：

```html
<div data-theme="material" data-mode="dark">
  <Button variant="filled">Material 暗色按钮</Button>
</div>
```

## 局部覆盖

每个组件都暴露 CSS 变量令牌，可针对单个实例做样式定制：

```svelte
<Button
  variant="filled"
  style="--pui-button-radius: 2px; --pui-button-bg: oklch(0.5 0.18 145);"
>
  自定义
</Button>
```

具体组件支持的令牌列表请参考各组件文档。

## 组件列表

40+ 组件，分 6 个组：

- **基础（Foundation）** —— Button、IconButton、Card、Divider、Badge、Chip、Avatar、Kbd
- **表单（Form）** —— TextField、Textarea、Checkbox、Radio、Switch、Slider、Select、Combobox、SearchField、DatePicker、TimePicker、DateRangePicker
- **反馈（Feedback）** —— Alert、Banner、Toast、Progress、Spinner、Skeleton、EmptyState
- **浮层（Overlay）** —— Tooltip、Popover、Menu、Dialog、CommandPalette、Drawer
- **导航（Navigation）** —— Tabs、SegmentedControl、Breadcrumb、Toolbar、Sidebar
- **数据（Data）** —— List、Accordion、Table、Calendar、TreeView

所有组件均支持 Svelte 5 snippet API，并将多余属性透传到根元素。

## 按需引入

按需引入可获得最佳打包体积：

```ts
import Button from '@persona-ui/lib/components/button/Button.svelte';
import '@persona-ui/lib/styles.css';
```

库的 `sideEffects: ["**/*.css"]` —— 只有你显式 import 的样式表算副作用。

## 协议

MIT
