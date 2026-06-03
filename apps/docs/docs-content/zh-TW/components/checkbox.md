---
title: 核取方塊
group: components
---

# 核取方塊

帶有標籤與說明文字的二切換開,支援 `indeterminate` 狀態以處理部分選取。

## 匯入

```svelte
<script>
  import { Checkbox } from '@persona-ui/lib';
</script>
```

## API

| 屬性              | 型別                                   | 預設     | 說明                                                  |
| ---------------- | ------------------------------------- | ------- | ---------------------------------------------------- |
| `checked`        | `boolean`                             | —       | 受控的勾選狀態                                        |
| `defaultChecked` | `boolean`                             | `false` | 非受控預設值                                          |
| `indeterminate`  | `boolean`                             | `false` | 不定狀態（外觀與一般不同,並非三態值）                  |
| `disabled`       | `boolean`                             | `false` | 停用狀態                                              |
| `label`          | `string`                              | —       | 可見標籤                                              |
| `description`    | `string`                              | —       | 標籤下方的輔助文字                                    |
| `name`           | `string`                              | —       | 表單名稱 — 用於原生表單送出                          |
| `value`          | `string`                              | `'on'`  | 勾選時送出的表單值                                    |
| `required`       | `boolean`                             | `false` | 必填標記                                              |
| `class`          | `string`                              | —       | 額外的 CSS 類別                                       |
| `style`          | `string`                              | —       | 行內樣式                                              |
| `onValueChange`       | `(checked: boolean, e: Event) => void` | —       | 變更處理函式                                          |

## 狀態

- **checked** — 填滿的方框,於表單送出時帶值
- **unchecked** — 空方框
- **indeterminate** — 橫線圖示;用於群組中只有部分子項目被選取時的父層
- **disabled** — 38% 透明度,不接收指標事件

## 用法

```svelte
<Checkbox label="I agree to the terms" defaultChecked />
<Checkbox label="Subscribe to newsletter" />
<Checkbox indeterminate label="Select all" description="3 of 5 selected" />
<Checkbox disabled label="Locked option" />
```
