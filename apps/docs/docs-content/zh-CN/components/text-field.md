---
title: 文本框
group: components
---

# 文本框

## Import

```svelte
<script>
  import { 文本框 } from '@persona-ui/lib';
</script>
```

带标签、辅助文字与错误状态的文本输入组件。

## 导入

```svelte
<script>
  import { TextField } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                                   | Default  | Description                    |
| -------------- | ------------------------------------------------------ | -------- | ------------------------------ |
| `value`        | `string`                                               | —        | 受控值                         |
| `defaultValue` | `string`                                               | `''`     | 非受控默认值                   |
| `label`        | `string`                                               | —        | 可见标签                       |
| `placeholder`  | `string`                                               | —        | 占位文字                       |
| `helperText`   | `string`                                               | —        | 辅助/说明文字                  |
| `error`        | `string`                                               | —        | 错误信息（会设置 `aria-invalid`） |
| `type`         | `'text' \| 'email' \| 'password' \| 'search' \| 'url'` | `'text'` | 输入框类型                     |
| `disabled`     | `boolean`                                              | `false`  | 禁用状态                       |
| `readonly`     | `boolean`                                              | `false`  | 只读                           |
| `required`     | `boolean`                                              | `false`  | 必填标识                       |
| `leading`      | `Snippet`                                              | —        | 前置图标/元素                  |
| `trailing`     | `Snippet`                                              | —        | 后置图标/元素                  |
| `class`        | `string`                                               | —        | 额外的 CSS 类名                |
| `style`        | `string`                                               | —        | 内联样式                       |
| `oninput`      | `(e: Event) => void`                                   | —        | 输入处理器                     |
| `onchange`     | `(e: Event) => void`                                   | —        | 变更处理器                     |

其余属性会透传到 `<input>` 元素。

## 受控与非受控

```svelte
<!-- Controlled -->
<TextField value={name} onInput={(e) => name = e.target.value} label="Name" />

<!-- Uncontrolled -->
<TextField defaultValue="John" label="Name" />
```

## 组件 Tokens

| Token                   | Default                     | Purpose       |
| ----------------------- | --------------------------- | ------------- |
| `--pui-field-bg`        | `var(--pui-surface-base)`   | 输入框背景    |
| `--pui-field-border`    | `var(--pui-outline)`        | 边框颜色      |
| `--pui-field-radius`    | `var(--pui-radius-control)` | 圆角          |
| `--pui-field-padding-x` | `var(--pui-space-3)`        | 水平内边距    |
| `--pui-field-padding-y` | `var(--pui-space-2)`        | 垂直内边距    |

## 用法

```svelte
<TextField label="Email" type="email" placeholder="you@example.com" helperText="We'll never share your email." />
<TextField label="Password" type="password" error="Password is required." />
```
