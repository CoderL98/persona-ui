---
title: 搜尋框
group: components
---

# 搜尋框

搜尋風格的輸入框,前置放大鏡圖示,並可選擇是否顯示清除按鈕。

## 匯入

```svelte
<script>
  import { SearchField } from '@persona-ui/lib';
</script>
```

## API

| 屬性            | 型別                  | 預設     | 說明                                            |
| -------------- | --------------------- | ------- | ---------------------------------------------- |
| `value`        | `string`              | —       | 受控值                                          |
| `defaultValue` | `string`              | `''`    | 非受控預設值                                    |
| `placeholder`  | `string`              | —       | 佔位文字                                        |
| `label`        | `string`              | —       | 可見標籤                                        |
| `clearable`    | `boolean`             | `true`  | 當輸入框有內容時顯示清除（×）按鈕               |
| `disabled`     | `boolean`             | `false` | 停用狀態                                        |
| `texts`        | `Record<string, string>` | —   | 覆寫內部顯示文字                                |
| `class`        | `string`              | —       | 額外的 CSS 類別                                 |
| `style`        | `string`              | —       | 行內樣式                                        |
| `onInput`      | `(value: string, e: Event) => void` | — | 每次按鍵時觸發                                 |
| `onClear`      | `(e: MouseEvent) => void` | —   | 點擊清除按鈕時觸發                              |

## 用法

```svelte
<SearchField placeholder="Search components…" />

<SearchField label="Find user" onInput={(v) => console.log(v)} />

<SearchField defaultValue="svelte" clearable />
```
