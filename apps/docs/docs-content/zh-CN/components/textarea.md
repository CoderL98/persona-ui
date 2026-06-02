---
title: 文本域
group: components
---

# 文本域

一个多行文本输入控件，支持标签、帮助文本、错误状态以及可配置的尺寸调整行为。

## 导入

```svelte
<script>
  import { Textarea } from '@persona-ui/lib';
</script>
```

## API

| 属性           | 类型                                                | 默认        | 说明                                              |
| -------------- | --------------------------------------------------- | ----------- | ------------------------------------------------- |
| `value`        | `string`                                            | —           | 受控值                                            |
| `defaultValue` | `string`                                            | `''`        | 非受控默认值                                      |
| `label`        | `string`                                            | —           | 可见标签                                          |
| `placeholder`  | `string`                                            | —           | 占位文本                                          |
| `helperText`   | `string`                                            | —           | 帮助文本                                          |
| `error`        | `string`                                            | —           | 错误信息（会设置 `aria-invalid`）                 |
| `disabled`     | `boolean`                                           | `false`     | 禁用状态                                          |
| `readonly`     | `boolean`                                           | `false`     | 只读                                              |
| `required`     | `boolean`                                           | `false`     | 必填标记                                          |
| `minlength`    | `number`                                            | —           | HTML5 最少字符数                                  |
| `maxlength`    | `number`                                            | —           | HTML5 最多字符数                                  |
| `rows`         | `number`                                            | `4`         | 初始可见行数                                      |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'`    | `'vertical'`| CSS 调整手柄行为                                  |
| `name`         | `string`                                            | —           | 表单字段名（参与原生表单提交）                    |
| `leading`      | `Snippet`                                           | —           | 前置元素                                          |
| `trailing`     | `Snippet`                                           | —           | 后置元素                                          |
| `class`        | `string`                                            | —           | 附加的 CSS 类                                     |
| `style`        | `string`                                            | —           | 内联样式（用于覆盖 token）                        |
| `oninput`      | `(e: Event) => void`                                | —           | 输入处理函数                                      |
| `onchange`     | `(e: Event) => void`                                | —           | 变更处理函数                                      |

其余属性会透传到底层的 `<textarea>` 元素。

## 用法

```svelte
<Textarea label="Description" placeholder="Tell us about your project…" rows={6} />

<Textarea
  label="Bio"
  maxlength={280}
  helperText="Up to 280 characters."
  resize="none"
/>

<Textarea label="Required field" required error="This field is required." />
```
