---
title: 滑块
group: components
---

# 滑块

## Import

```svelte
<script>
  import { 滑块 } from '@persona-ui/lib';
</script>
```

支持单值或区间的滑块控件，可选刻度标记，支持键盘操作。

## 导入

```svelte
<script>
  import { Slider } from '@persona-ui/lib';
</script>
```

## API

| 属性           | 类型                          | 默认    | 说明                                              |
| -------------- | ----------------------------- | ------- | ------------------------------------------------- |
| `value`        | `number \| [number, number]`  | —       | 受控值（区间模式为元组）                          |
| `defaultValue` | `number \| [number, number]`  | —       | 非受控默认值                                      |
| `min`          | `number`                      | `0`     | 最小值                                            |
| `max`          | `number`                      | `100`   | 最大值                                            |
| `step`         | `number`                      | `1`     | 步进增量                                          |
| `marks`        | `SliderMark[]`                | —       | 轨道上的刻度标记（必须与 `step` 对齐）            |
| `range`        | `boolean`                     | `false` | 启用双手柄区间模式                                |
| `disabled`     | `boolean`                     | `false` | 禁用状态                                          |
| `label`        | `string`                      | —       | 可见标签                                          |
| `showValue`    | `boolean`                     | `false` | 在标签旁显示当前值                                |
| `class`        | `string`                      | —       | 附加的 CSS 类                                     |
| `style`        | `string`                      | —       | 内联样式                                          |
| `onInputChange`      | `(value, e: Event) => void`   | —       | 拖动过程中触发                                    |
| `onValueChange`     | `(value, e: Event) => void`   | —       | 用户释放手柄时触发                                |

`SliderMark` 结构：`{ value: number, label?: string }`

## 用法

```svelte
<!-- Single value -->
<Slider min={0} max={100} defaultValue={30} showValue />

<!-- Range -->
<Slider range defaultValue={[20, 80]} min={0} max={100} />

<!-- With marks -->
<Slider min={0} max={100} step={25} marks={[
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' }
]} />
```
