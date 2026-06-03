---
title: Form
group: components
---

# Form

带 submit 处理、布局选项和 actions 按钮槽位的语义化表单容器。

## Import

```svelte
<script>
  import { Form, FormField, TextField, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop        | Type                          | Default      | Description                |
| ----------- | ----------------------------- | ------------ | -------------------------- |
| `onSubmit`  | `(e: SubmitEvent) => void`    | —            | 表单提交回调               |
| `layout`    | `'vertical' \| 'horizontal'`  | `'vertical'` | 字段布局方向               |
| `disabled`  | `boolean`                     | `false`      | 预留（原生 form 不支持）   |
| `children`  | `Snippet`                     | —            | 表单内容                   |
| `actions`   | `Snippet`                     | —            | 底部操作按钮区             |
| `class`     | `string`                      | —            | 额外 CSS 类                |

## FormField

单个表单字段的 label + helper/error 包装器。

| Prop         | Type      | Default | Description           |
| ------------ | --------- | ------- | --------------------- |
| `label`      | `string`  | —       | 可见 label            |
| `required`   | `boolean` | `false` | 必填星号              |
| `helperText` | `string`  | —       | 字段下方帮助文字      |
| `error`      | `string`  | —       | 错误消息 + alert role  |
| `children`   | `Snippet` | —       | 实际字段              |

## Usage

```svelte
<Form
  layout="vertical"
  onSubmit={(e) => console.log('submit')}
>
  <FormField label="邮箱" required>
    <TextField type="email" placeholder="you@example.com" />
  </FormField>
  <FormField label="密码" error="必填">
    <TextField type="password" />
  </FormField>
</Form>
```

## Accessibility

- 外层 `<form>` 元素处理原生表单提交
- 每个 `FormField` 生成的 `<label>` 通过 `for`/`id` 关联子字段
- 错误文本通过 `role="alert"` 实时播报
- 在任意字段内按 Enter 触发提交
