---
title: 搜索框
group: components
---

# 搜索框

## Import

```svelte
<script>
  import { 搜索框 } from '@persona-ui/lib';
</script>
```

带前置放大镜图标的搜索样式输入框，可选清除按钮。

## 导入

```svelte
<script>
  import { SearchField } from '@persona-ui/lib';
</script>
```

## API

| 属性           | 类型                  | 默认    | 说明                                         |
| -------------- | --------------------- | ------- | -------------------------------------------- |
| `value`        | `string`              | —       | 受控值                                       |
| `defaultValue` | `string`              | `''`    | 非受控默认值                                 |
| `placeholder`  | `string`              | —       | 占位文本                                     |
| `label`        | `string`              | —       | 可见标签                                     |
| `clearable`    | `boolean`             | `true`  | 当值非空时显示清除（×）按钮                  |
| `disabled`     | `boolean`             | `false` | 禁用状态                                     |
| `texts`        | `Record<string, string>` | —   | 覆盖内部展示字符串                           |
| `class`        | `string`              | —       | 附加的 CSS 类                                |
| `style`        | `string`              | —       | 内联样式                                     |
| `onInput`      | `(value: string, e: Event) => void` | — | 每次按键时触发                       |
| `onClear`      | `(e: MouseEvent) => void` | —   | 点击清除按钮时触发                           |

## 用法

```svelte
<SearchField placeholder="Search components…" />

<SearchField label="Find user" onInput={(v) => console.log(v)} />

<SearchField defaultValue="svelte" clearable />
```
