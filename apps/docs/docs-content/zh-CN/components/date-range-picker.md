---
title: 日期范围选择器
group: components
---

# 日期范围选择器

由日历驱动的日期区间选择器，可配置粒度（年、月、日、时、分、秒）。

## 导入

```svelte
<script>
  import { DateRangePicker } from '@persona-ui/lib';
</script>
```

## API

| 属性           | 类型                  | 默认          | 说明                                                 |
| -------------- | --------------------- | ------------- | ---------------------------------------------------- |
| `value`        | `DateRangeValue`      | —             | 受控值 —— `{ start, end }`                           |
| `defaultValue` | `DateRangeValue`      | —             | 非受控默认值                                         |
| `granularity`  | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second'` | `'day'` | 选择粒度 |
| `min`          | `Date`                | —             | 可选择的最小日期                                     |
| `max`          | `Date`                | —             | 可选择的最大日期                                     |
| `locale`       | `string`              | `'en-US'`     | 日期格式化使用的语言区域                             |
| `placeholder`  | `string`              | —             | 未选择范围时的占位文本                               |
| `label`        | `string`              | —             | 可见标签                                             |
| `helperText`   | `string`              | —             | 帮助文本                                             |
| `error`        | `string`              | —             | 错误信息（会设置 `aria-invalid`）                    |
| `disabled`     | `boolean`             | `false`       | 禁用状态                                             |
| `texts`        | `Record<string, string>` | —         | 覆盖内部展示字符串                                   |
| `footer`       | `Snippet`             | —             | 自定义页脚内容（例如预设快捷方式）                   |
| `class`        | `string`              | —             | 附加的 CSS 类                                        |
| `style`        | `string`              | —             | 内联样式                                             |
| `onValueChange`     | `(range: DateRangeValue) => void` | — | 用户选定范围时触发（取值始终是完整的 `Date` 对象） |

`DateRangeValue` 结构：`{ start: Date \| null, end: Date \| null }`

## 粒度

选择满足需求的最低精度：

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
