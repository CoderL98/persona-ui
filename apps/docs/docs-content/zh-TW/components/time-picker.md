---
title: 時間選擇器
group: components
---

# 時間選擇器

提供 12 小時與 24 小時制、可設定分鐘刻度,並完整支援鍵盤操作的時間選擇器。

## 匯入

```svelte
<script>
  import { TimePicker } from '@persona-ui/lib';
</script>
```

## API

| 屬性            | 型別                  | 預設      | 說明                                  |
| -------------- | --------------------- | -------- | ------------------------------------ |
| `value`        | `string`              | —        | 受控值（HH:MM 字串）                  |
| `defaultValue` | `string`              | —        | 非受控預設值                          |
| `format`       | `'12h' \| '24h'`      | `'24h'`  | 時間格式 — 12h 會顯示 AM/PM          |
| `minuteStep`   | `number`              | `5`      | 分鐘刻度（須可整除 60）              |
| `placeholder`  | `string`              | —        | 尚未選取時間時的佔位文字              |
| `label`        | `string`              | —        | 可見標籤                              |
| `helperText`   | `string`              | —        | 輔助文字                              |
| `error`        | `string`              | —        | 錯誤訊息（會設定 `aria-invalid`）     |
| `disabled`     | `boolean`             | `false`  | 停用狀態                              |
| `texts`        | `Record<string, string>` | —     | 覆寫內部顯示文字                      |
| `class`        | `string`              | —        | 額外的 CSS 類別                       |
| `style`        | `string`              | —        | 行內樣式                              |
| `onValueChange`     | `(time: string) => void` | —     | 當使用者選取時間時觸發                |

## 用法

```svelte
<TimePicker label="Start time" format="12h" minuteStep={15} />

<TimePicker
  label="Alarm"
  defaultValue="07:30"
  format="24h"
  minuteStep={5}
/>

<TimePicker label="End time" error="Pick an end time after the start." />
```
