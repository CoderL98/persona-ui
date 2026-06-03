---
title: 时间选择器
group: components
---

# 时间选择器

支持 12 小时制与 24 小时制的时刻选择器，分钟步长可配置，完整支持键盘操作。

## 导入

```svelte
<script>
  import { TimePicker } from '@persona-ui/lib';
</script>
```

## API

| 属性           | 类型                  | 默认     | 说明                                       |
| -------------- | --------------------- | -------- | ------------------------------------------ |
| `value`        | `string`              | —        | 受控值（HH:MM 字符串）                     |
| `defaultValue` | `string`              | —        | 非受控默认值                               |
| `format`       | `'12h' \| '24h'`      | `'24h'`  | 时间格式 —— 12h 显示 AM/PM                 |
| `minuteStep`   | `number`              | `5`      | 分钟步长（必须能整除 60）                  |
| `placeholder`  | `string`              | —        | 未选择时间时的占位文本                     |
| `label`        | `string`              | —        | 可见标签                                   |
| `helperText`   | `string`              | —        | 帮助文本                                   |
| `error`        | `string`              | —        | 错误信息（会设置 `aria-invalid`）          |
| `disabled`     | `boolean`             | `false`  | 禁用状态                                   |
| `texts`        | `Record<string, string>` | —     | 覆盖内部展示字符串                         |
| `class`        | `string`              | —        | 附加的 CSS 类                              |
| `style`        | `string`              | —        | 内联样式                                   |
| `onValueChange`     | `(time: string) => void` | —     | 用户选择时间时触发                         |

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
