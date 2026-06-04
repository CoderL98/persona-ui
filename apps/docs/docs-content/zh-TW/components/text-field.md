---
title: 文字方塊
group: components
---

# 文字方塊

## Import

```svelte
<script>
  import { 文字方塊 } from '@persona-ui/lib';
</script>
```

帶有標籤、輔助文字與錯誤狀態的文字輸入元件。

## 匯入

```svelte
<script>
  import { TextField } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                                   | Default  | Description                    |
| -------------- | ------------------------------------------------------ | -------- | ------------------------------ |
| `value`        | `string`                                               | —        | 受控值                         |
| `defaultValue` | `string`                                               | `''`     | 非受控預設值                   |
| `label`        | `string`                                               | —        | 可見標籤                       |
| `placeholder`  | `string`                                               | —        | 佔位文字                       |
| `helperText`   | `string`                                               | —        | 輔助／說明文字                 |
| `error`        | `string`                                               | —        | 錯誤訊息（會設定 `aria-invalid`） |
| `type`         | `'text' \| 'email' \| 'password' \| 'search' \| 'url'` | `'text'` | 輸入框類型                     |
| `disabled`     | `boolean`                                              | `false`  | 停用狀態                       |
| `readonly`     | `boolean`                                              | `false`  | 唯讀                           |
| `required`     | `boolean`                                              | `false`  | 必填標示                       |
| `leading`      | `Snippet`                                              | —        | 前置圖示／元素                 |
| `trailing`     | `Snippet`                                              | —        | 後置圖示／元素                 |
| `class`        | `string`                                               | —        | 額外的 CSS 類別                |
| `style`        | `string`                                               | —        | 行內樣式                       |
| `oninput`      | `(e: Event) => void`                                   | —        | 輸入處理器                     |
| `onchange`     | `(e: Event) => void`                                   | —        | 變更處理器                     |

其餘屬性會轉發至 `<input>` 元素。

## 受控與非受控

```svelte
<!-- Controlled -->
<TextField value={name} onInput={(e) => name = e.target.value} label="Name" />

<!-- Uncontrolled -->
<TextField defaultValue="John" label="Name" />
```

## 元件 Tokens

| Token                   | Default                     | Purpose     |
| ----------------------- | --------------------------- | ----------- |
| `--pui-field-bg`        | `var(--pui-surface-base)`   | 輸入框背景  |
| `--pui-field-border`    | `var(--pui-outline)`        | 邊框顏色    |
| `--pui-field-radius`    | `var(--pui-radius-control)` | 圓角        |
| `--pui-field-padding-x` | `var(--pui-space-3)`        | 水平內距    |
| `--pui-field-padding-y` | `var(--pui-space-2)`        | 垂直內距    |

## 用法

```svelte
<TextField label="Email" type="email" placeholder="you@example.com" helperText="We'll never share your email." />
<TextField label="Password" type="password" error="Password is required." />
```
