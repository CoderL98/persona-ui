---
title: 开关
group: components
---

# 开关

## Import

```svelte
<script>
  import { 开关 } from '@persona-ui/lib';
</script>
```

带无障碍 `role="switch"` 的开关组件。

## 导入

```svelte
<script>
  import { Switch } from '@persona-ui/lib';
</script>
```

## API

| Prop             | Type                 | Default | Description                |
| ---------------- | -------------------- | ------- | -------------------------- |
| `checked`        | `boolean`            | —       | 受控选中状态               |
| `defaultChecked` | `boolean`            | `false` | 非受控默认值               |
| `disabled`       | `boolean`            | `false` | 禁用状态                   |
| `label`          | `string`             | —       | 可见标签                   |
| `class`          | `string`             | —       | 额外的 CSS 类名            |
| `style`          | `string`             | —       | 内联样式（用于 token 覆盖） |
| `onValueChange`       | `(e: Event) => void` | —       | 变更处理器                 |

其余属性会透传到根 `<div>` 元素。

## 受控与非受控

```svelte
<!-- Controlled -->
<Switch checked={notifications} onValueChange={(e) => toggle()} />

<!-- Uncontrolled -->
<Switch defaultChecked label="Enable notifications" />
```

## 无障碍

- 使用 `role="switch"` 与 `aria-checked`
- 可通过 Tab 聚焦
- 通过 `label` 属性或 `aria-label` 提供可见标签
- 键盘：点击/Enter 切换

## 组件 Tokens

| Token                           | Default                            | Purpose     |
| ------------------------------- | ---------------------------------- | ----------- |
| `--pui-switch-track-bg`         | `var(--pui-ref-gray-30)`           | 关闭时轨道色 |
| `--pui-switch-track-checked-bg` | `var(--pui-color-primary)`         | 开启时轨道色 |
| `--pui-switch-thumb-bg`         | `var(--pui-ref-gray-0)`            | 滑块颜色    |
| `--pui-switch-track-width`      | `44px` (Apple) / `52px` (Material) | 轨道宽度    |
| `--pui-switch-track-height`     | `24px` (Apple) / `32px` (Material) | 轨道高度    |

## 用法

```svelte
<Switch label="Airplane Mode" defaultChecked />
<Switch label="Notifications" disabled />
<Switch style="--pui-switch-track-checked-bg: oklch(0.7 0.2 150);" defaultChecked label="Green toggle" />
```
