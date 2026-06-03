---
title: 日期選擇器
group: components
---

# 日期選擇器

由 TextField + Popover + Calendar 組合而成的日期選擇器。

## API

| Prop          | Type             | Default         | Description             |
| ------------- | ---------------- | --------------- | ----------------------- |
| `label`       | `string`         | —               | 欄位標籤                |
| `placeholder` | `string`         | `'Pick a date'` | 輸入佔位文字            |
| `locale`      | `string`         | `'en-US'`       | 日期格式語系            |
| `onValueChange`    | `(date) => void` | —               | 日期選擇回呼            |
| `texts`       | `{ pickDate: string }`    | —               | 文字覆寫（見下）        |

## Usage

```svelte
<DatePicker label="Start date" />
```
