---
title: 日历
group: components
---

# 日历

月视图日历，支持日期选择。

## API

| Prop        | Type             | Description              |                          |
| ----------- | ---------------- | ------------------------ | ------------------------ |
| `locale`    | `string`         | `'en-US'`                | 月份 / 星期的语言区域    |
| `min`/`max` | `Date`           | 可选日期的最小 / 最大值  |                          |
| `onValueChange`  | `(date) => void` | 日期选择回调             |                          |
| `texts`     | `{ months: string[], weekdays: string[], prevMonth: string, nextMonth: string }` | 文本覆盖（见下） |

## Usage

```svelte
<Calendar onValueChange={(d) => console.log(d)} />
```
