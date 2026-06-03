---
title: 行事曆
group: components
---

# 行事曆

## Import

```svelte
<script>
  import { 行事曆 } from '@persona-ui/lib';
</script>
```

月檢視行事曆，支援日期選擇。

## API

| Prop        | Type             | Description              |                          |
| ----------- | ---------------- | ------------------------ | ------------------------ |
| `locale`    | `string`         | `'en-US'`                | 月份 / 星期的語系        |
| `min`/`max` | `Date`           | 可選日期的最小 / 最大值  |                          |
| `onValueChange`  | `(date) => void` | 日期選擇回呼             |                          |
| `texts`     | `{ months: string[], weekdays: string[], prevMonth: string, nextMonth: string }` | 文字覆寫（見下） |

## Usage

```svelte
<Calendar onValueChange={(d) => console.log(d)} />
```
