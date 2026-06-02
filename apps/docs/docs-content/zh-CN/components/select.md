---
title: 选择器
group: components
---

# 选择器

下拉选择器，同时支持页面内 listbox 渲染与原生 `<select>` 渲染两种模式。

## 导入

```svelte
<script>
  import { Select } from '@persona-ui/lib';
</script>
```

## API

| 属性           | 类型             | 默认    | 说明                                              |
| -------------- | ---------------- | ------- | ------------------------------------------------- |
| `value`        | `string`         | —       | 受控的选中值                                      |
| `defaultValue` | `string`         | —       | 非受控默认值                                      |
| `options`      | `SelectOption[]` | —       | 在 listbox 中渲染的选项                           |
| `native`       | `boolean`        | `false` | 使用平台原生 `<select>` 替代 listbox              |
| `name`         | `string`         | —       | 表单字段名（原生模式下用于提交）                  |
| `placeholder`  | `string`         | —       | 未选中时显示的占位文本                            |
| `label`        | `string`         | —       | 可见标签                                          |
| `helperText`   | `string`         | —       | 帮助文本                                          |
| `error`        | `string`         | —       | 错误信息（会设置 `aria-invalid`）                 |
| `disabled`     | `boolean`        | `false` | 禁用状态                                          |
| `texts`        | `Record<string, string>` | — | 按实例覆盖任何内部展示字符串                     |
| `class`        | `string`         | —       | 附加的 CSS 类                                     |
| `style`        | `string`         | —       | 内联样式                                          |
| `onchange`     | `(value: string, e: Event) => void` | — | 选择变更处理函数                          |

`SelectOption` 结构：`{ value: string, label: string, disabled?: boolean }`

## 原生模式

设置 `native` 可渲染平台原生的 `<select>` —— 在移动端尤为有用，因为系统选择器提供更好的体验。

```svelte
<Select
  native
  name="country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'cn', label: 'China' },
    { value: 'jp', label: 'Japan' }
  ]}
/>
```

## 用法

```svelte
<Select
  label="Favorite framework"
  placeholder="Pick one"
  defaultValue="svelte"
  options={[
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ]}
/>
```
