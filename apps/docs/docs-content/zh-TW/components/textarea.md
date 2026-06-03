---
title: 文字區域
group: components
---

# 文字區域

## Import

```svelte
<script>
  import { 文字區域 } from '@persona-ui/lib';
</script>
```

多行文字輸入框,支援標籤、輔助文字、錯誤狀態與可設定的調整大小行為。

## 匯入

```svelte
<script>
  import { Textarea } from '@persona-ui/lib';
</script>
```

## API

| 屬性            | 型別                                                | 預設         | 說明                                              |
| -------------- | --------------------------------------------------- | ----------- | ------------------------------------------------- |
| `value`        | `string`                                            | —           | 受控值                                            |
| `defaultValue` | `string`                                            | `''`        | 非受控預設值                                      |
| `label`        | `string`                                            | —           | 可見標籤                                          |
| `placeholder`  | `string`                                            | —           | 佔位文字                                          |
| `helperText`   | `string`                                            | —           | 輔助文字                                          |
| `error`        | `string`                                            | —           | 錯誤訊息（會設定 `aria-invalid`）                  |
| `disabled`     | `boolean`                                           | `false`     | 停用狀態                                          |
| `readonly`     | `boolean`                                           | `false`     | 唯讀                                              |
| `required`     | `boolean`                                           | `false`     | 必填標記                                          |
| `minlength`    | `number`                                            | —           | HTML5 最少字元數                                  |
| `maxlength`    | `number`                                            | —           | HTML5 最多字元數                                  |
| `rows`         | `number`                                            | `4`         | 初始可見列數                                      |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'`    | `'vertical'`| CSS 調整大小控制軸的行為                          |
| `name`         | `string`                                            | —           | 表單名稱（用於原生表單送出）                      |
| `leading`      | `Snippet`                                           | —           | 前置元素                                          |
| `trailing`     | `Snippet`                                           | —           | 後置元素                                          |
| `class`        | `string`                                            | —           | 額外的 CSS 類別                                   |
| `style`        | `string`                                            | —           | 行內樣式（用於覆寫設計 token）                    |
| `oninput`      | `(e: Event) => void`                                | —           | 輸入處理函式                                      |
| `onchange`     | `(e: Event) => void`                                | —           | 變更處理函式                                      |

所有其他屬性會轉發到底層的 `<textarea>`。

## 用法

```svelte
<Textarea label="Description" placeholder="Tell us about your project…" rows={6} />

<Textarea
  label="Bio"
  maxlength={280}
  helperText="Up to 280 characters."
  resize="none"
/>

<Textarea label="Required field" required error="This field is required." />
```
