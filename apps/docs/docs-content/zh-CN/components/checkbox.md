---
title: 复选框
group: components
---

# 复选框

带标签和说明的二态开关，支持用于部分选中场景的 `indeterminate` 状态。

## 导入

```svelte
<script>
  import { Checkbox } from '@persona-ui/lib';
</script>
```

## API

| 属性             | 类型                                  | 默认    | 说明                                                       |
| ---------------- | ------------------------------------- | ------- | ---------------------------------------------------------- |
| `checked`        | `boolean`                             | —       | 受控的选中状态                                             |
| `defaultChecked` | `boolean`                             | `false` | 非受控默认值                                               |
| `indeterminate`  | `boolean`                             | `false` | 不确定状态（仅视觉区分，并非三态值）                       |
| `disabled`       | `boolean`                             | `false` | 禁用状态                                                   |
| `label`          | `string`                              | —       | 可见标签                                                   |
| `description`    | `string`                              | —       | 标签下方的帮助文本                                         |
| `name`           | `string`                              | —       | 表单字段名 —— 参与原生表单提交                             |
| `value`          | `string`                              | `'on'`  | 选中时提交的表单值                                         |
| `required`       | `boolean`                             | `false` | 必填标记                                                   |
| `class`          | `string`                              | —       | 附加的 CSS 类                                              |
| `style`          | `string`                              | —       | 内联样式                                                   |
| `onValueChange`       | `(checked: boolean, e: Event) => void` | —       | 变更处理函数                                               |

## 状态

- **checked** —— 实心方框，表单提交时携带值
- **unchecked** —— 空方框
- **indeterminate** —— 横线图标；用于子项部分选中的父级
- **disabled** —— 38% 不透明度，禁止指针事件

## 用法

```svelte
<Checkbox label="I agree to the terms" defaultChecked />
<Checkbox label="Subscribe to newsletter" />
<Checkbox indeterminate label="Select all" description="3 of 5 selected" />
<Checkbox disabled label="Locked option" />
```
