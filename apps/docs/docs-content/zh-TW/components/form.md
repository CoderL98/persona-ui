---
title: Form
group: components
---

# Form

帶 submit 處理、佈局選項和 actions 按鈕槽位的語意化表單容器。

## Import

```svelte
<script>
  import { Form, FormField, TextField, Button } from '@persona-ui/lib';
</script>
```

## API

| Prop        | Type                          | Default      | Description              |
| ----------- | ----------------------------- | ------------ | ------------------------ |
| `onSubmit`  | `(e: SubmitEvent) => void`    | —            | 表單提交回呼             |
| `layout`    | `'vertical' \| 'horizontal'`  | `'vertical'` | 欄位佈局方向             |
| `disabled`  | `boolean`                     | `false`      | 預留（原生 form 不支援） |
| `children`  | `Snippet`                     | —            | 表單內容                 |
| `actions`   | `Snippet`                     | —            | 底部操作按鈕區           |
| `class`     | `string`                      | —            | 額外 CSS 類              |

## FormField

單個表單欄位的 label + helper/error 包裝器。

| Prop         | Type      | Default | Description             |
| ------------ | --------- | ------- | ----------------------- |
| `label`      | `string`  | —       | 可見 label              |
| `required`   | `boolean` | `false` | 必填星號                |
| `helperText` | `string`  | —       | 欄位下方說明文字        |
| `error`      | `string`  | —       | 錯誤訊息 + alert role    |
| `children`   | `Snippet` | —       | 實際欄位                |

## Usage

```svelte
<Form
  layout="vertical"
  onSubmit={(e) => console.log('submit')}
>
  <FormField label="Email" required>
    <TextField type="email" placeholder="you@example.com" />
  </FormField>
  <FormField label="密碼" error="必填">
    <TextField type="password" />
  </FormField>
</Form>
```

## Accessibility

- 外層 `<form>` 元素處理原生表單提交
- 每個 `FormField` 產生的 `<label>` 透過 `for`/`id` 關聯子欄位
- 錯誤文字透過 `role="alert"` 即時播報
- 在任意欄位內按 Enter 觸發提交
