---
title: 单选
group: components
---

# 单选

一组互斥的单选项分组，以及独立的 `Radio` 单选项。

## 导入

```svelte
<script>
  import { RadioGroup, Radio } from '@persona-ui/lib';
</script>
```

## API

### RadioGroup

| 属性           | 类型                                | 默认          | 说明                                   |
| -------------- | ----------------------------------- | ------------- | -------------------------------------- |
| `value`        | `string`                            | —             | 受控的选中值                           |
| `defaultValue` | `string`                            | —             | 非受控默认值                           |
| `name`         | `string`                            | —             | 表单字段名 —— 由所有子单选项共享       |
| `orientation`  | `'horizontal' \| 'vertical'`        | `'vertical'`  | 布局方向                               |
| `disabled`     | `boolean`                           | `false`       | 禁用所有子单选项                       |
| `label`        | `string`                            | —             | 分组标签                               |
| `class`        | `string`                            | —             | 附加的 CSS 类                          |
| `style`        | `string`                            | —             | 内联样式                               |
| `onchange`     | `(value: string, e: Event) => void` | —             | 选择变更处理函数                       |

### Radio

| 属性       | 类型     | 默认    | 说明                  |
| ---------- | -------- | ------- | --------------------- |
| `value`    | `string` | —       | 选中时提交的值        |
| `label`    | `string` | —       | 可见标签              |
| `disabled` | `boolean` | `false` | 禁用状态              |
| `class`    | `string` | —       | 附加的 CSS 类         |
| `style`    | `string` | —       | 内联样式              |

## 用法

```svelte
<RadioGroup label="Choose one" name="plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" defaultChecked />
  <Radio value="team" label="Team" />
</RadioGroup>

<RadioGroup label="Size" orientation="horizontal" defaultValue="m">
  <Radio value="s" label="S" />
  <Radio value="m" label="M" />
  <Radio value="l" label="L" />
</RadioGroup>
```
