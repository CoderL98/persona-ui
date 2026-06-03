---
title: 组合框
group: components
---

# 组合框

## Import

```svelte
<script>
  import { 组合框 } from '@persona-ui/lib';
</script>
```

带自由文本输入的可过滤单选或多选下拉。多选模式下，已选项以可删除的标签形式呈现。

## 导入

```svelte
<script>
  import { Combobox } from '@persona-ui/lib';
</script>
```

## API

| 属性                | 类型                       | 默认    | 说明                                                 |
| ------------------- | -------------------------- | ------- | ---------------------------------------------------- |
| `value`             | `string \| string[]`       | —       | 受控值（`multiple` 时为数组）                        |
| `defaultValue`      | `string \| string[]`       | —       | 非受控默认值                                         |
| `multiple`          | `boolean`                  | `false` | 启用多选并展示标签芯片                               |
| `inputValue`        | `string`                   | —       | 输入框中的受控文本                                   |
| `defaultInputValue` | `string`                   | `''`    | 非受控默认输入文本                                   |
| `options`           | `ComboboxOption[]`         | —       | 可过滤 / 选择的选项                                  |
| `placeholder`       | `string`                   | —       | 输入框占位文本                                       |
| `label`             | `string`                   | —       | 可见标签                                             |
| `helperText`        | `string`                   | —       | 帮助文本                                             |
| `error`             | `string`                   | —       | 错误信息（会设置 `aria-invalid`）                    |
| `disabled`          | `boolean`                  | `false` | 禁用状态                                             |
| `texts`             | `Record<string, string>`   | —       | 按实例覆盖内部展示字符串                             |
| `class`             | `string`                   | —       | 附加的 CSS 类                                        |
| `style`             | `string`                   | —       | 内联样式                                             |
| `onInputChange`           | `(inputValue: string, e: Event) => void` | — | 输入文本变更处理函数                       |
| `onValueChange`          | `(value, e: Event) => void` | —       | 选择变更处理函数                                     |

`ComboboxOption` 结构：`{ value: string, label: string, disabled?: boolean }`

## 用法

```svelte
<!-- Single-select -->
<Combobox
  label="Pick a fruit"
  placeholder="Search…"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]}
/>

<!-- Multi-select -->
<Combobox
  multiple
  label="Tags"
  defaultValue={['svelte', 'tailwind']}
  options={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'typescript', label: 'TypeScript' }
  ]}
/>
```
