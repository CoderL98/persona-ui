---
title: 滑桿
group: components
---

# 滑桿

單值或範圍滑桿,支援刻度標記與鍵盤操作。

## 匯入

```svelte
<script>
  import { Slider } from '@persona-ui/lib';
</script>
```

## API

| 屬性            | 型別                          | 預設     | 說明                                          |
| -------------- | ----------------------------- | ------- | -------------------------------------------- |
| `value`        | `number \| [number, number]`  | —       | 受控值（範圍模式為 tuple）                    |
| `defaultValue` | `number \| [number, number]`  | —       | 非受控預設值                                  |
| `min`          | `number`                      | `0`     | 最小值                                        |
| `max`          | `number`                      | `100`   | 最大值                                        |
| `step`         | `number`                      | `1`     | 步進值                                        |
| `marks`        | `SliderMark[]`                | —       | 軌道上的刻度標記（必須對齊 `step`）           |
| `range`        | `boolean`                     | `false` | 啟用雙拖桿範圍模式                            |
| `disabled`     | `boolean`                     | `false` | 停用狀態                                      |
| `label`        | `string`                      | —       | 可見標籤                                      |
| `showValue`    | `boolean`                     | `false` | 在標籤旁顯示目前數值                          |
| `class`        | `string`                      | —       | 額外的 CSS 類別                               |
| `style`        | `string`                      | —       | 行內樣式                                      |
| `oninput`      | `(value, e: Event) => void`   | —       | 拖曳時觸發                                    |
| `onchange`     | `(value, e: Event) => void`   | —       | 放開拖桿時觸發                                |

`SliderMark` 結構:`{ value: number, label?: string }`

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
