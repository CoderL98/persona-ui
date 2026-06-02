---
title: 日期选择器
group: components
---

# 日期选择器

由 TextField + Popover + Calendar 组合而成的日期选择器。

## API

| Prop          | Type             | Default         | Description             |
| ------------- | ---------------- | --------------- | ----------------------- |
| `label`       | `string`         | —               | 字段标签                |
| `placeholder` | `string`         | `'Pick a date'` | 输入占位文本            |
| `locale`      | `string`         | `'en-US'`       | 日期格式语言区域        |
| `onchange`    | `(date) => void` | —               | 日期选择回调            |
| `texts`       | `{ pickDate: string }`    | —               | 文本覆盖（见下）        |

## Usage

```svelte
<DatePicker label="Start date" />
```
