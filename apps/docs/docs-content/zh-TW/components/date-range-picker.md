---
title: 日期範圍選擇器
group: components
---

# 日期範圍選擇器

以日曆為基礎的日期範圍選擇器,粒度可設定（年、月、日、時、分、秒）。

## 匯入

```svelte
<script>
  import { DateRangePicker } from '@persona-ui/lib';
</script>
```

## API

| 屬性            | 型別                  | 預設        | 說明                                                                  |
| -------------- | --------------------- | ----------- | -------------------------------------------------------------------- |
| `value`        | `DateRangeValue`      | —           | 受控值 — `{ start, end }`                                            |
| `defaultValue` | `DateRangeValue`      | —           | 非受控預設值                                                          |
| `granularity`  | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second'` | `'day'` | 選取粒度                                                              |
| `min`          | `Date`                | —           | 最小可選日期                                                          |
| `max`          | `Date`                | —           | 最大可選日期                                                          |
| `locale`       | `string`              | `'en-US'`   | 日期格式化的語系                                                      |
| `placeholder`  | `string`              | —           | 尚未選取範圍時的佔位文字                                              |
| `label`        | `string`              | —           | 可見標籤                                                              |
| `helperText`   | `string`              | —           | 輔助文字                                                              |
| `error`        | `string`              | —           | 錯誤訊息（會設定 `aria-invalid`）                                     |
| `disabled`     | `boolean`             | `false`     | 停用狀態                                                              |
| `texts`        | `Record<string, string>` | —       | 覆寫內部顯示文字                                                      |
| `footer`       | `Snippet`             | —           | 自訂頁尾內容（例如預設快捷選項）                                      |
| `class`        | `string`              | —           | 額外的 CSS 類別                                                       |
| `style`        | `string`              | —           | 行內樣式                                                              |
| `onchange`     | `(range: DateRangeValue) => void` | — | 當使用者選取範圍時觸發（值一律為完整的 `Date` 物件）                  |

`DateRangeValue` 結構:`{ start: Date \| null, end: Date \| null }`

## 粒度

依範圍需求選擇最低的精細度：

```svelte
<!-- Year-only: pick "2024 — 2025" -->
<DateRangePicker granularity="year" />

<!-- With time -->
<DateRangePicker granularity="hour" />
<DateRangePicker granularity="minute" />
```

## 用法

```svelte
<DateRangePicker
  label="Trip dates"
  defaultValue={{ start: new Date('2026-06-01'), end: new Date('2026-06-10') }}
/>
```
