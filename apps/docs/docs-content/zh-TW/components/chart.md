---
title: 圖表
group: components
---

# Chart

基於 SVG 的輕量圖表元件，支援柱狀圖、折線圖、圓餅圖三種類型，無外部圖表庫依賴。

## Import

```svelte
<script>
  import { Chart } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                              | Default      | Description                            |
| -------------- | ------------------------------------------------- | ------------ | -------------------------------------- |
| `kind`         | `'bar' \| 'line' \| 'pie'`                        | `'bar'`      | 圖表類型                               |
| `series`       | `ChartSeries[]`                                   | —            | 柱/折線圖多系列資料                    |
| `data`         | `ChartDataPoint[]`                                | —            | 圓餅圖資料 (`{label, value}`)          |
| `labels`       | `string[]`                                        | `[]`         | X 軸標籤                               |
| `height`       | `number`                                          | `240`        | 圖表高度（px）                         |
| `showLegend`   | `boolean`                                         | `true`       | 顯示圖例                               |
| `showValues`   | `boolean`                                         | `false`      | 柱頂數值/圓餅圖百分比                  |
| `colors`       | `string[]`                                        | 主題色板     | 系列/扇區顏色循環                      |
| `onPointClick` | `(index: number, seriesIndex: number) => void`    | —            | 資料點點擊回呼                         |
| `aria-label`   | `string`                                          | `'圖表'`     | 整體無障礙標籤                         |

### `ChartSeries`

```ts
type ChartSeries = {
  name: string;
  data: number[];
  color?: string;
};
```

### `ChartDataPoint`

```ts
type ChartDataPoint = {
  label: string;
  value: number;
};
```

## Usage

### 柱狀圖（單系列）

```svelte
<script>
  import { Chart } from '@persona-ui/lib';
  const data = [
    { label: '1月', value: 120 },
    { label: '2月', value: 200 },
    { label: '3月', value: 150 },
    { label: '4月', value: 80 },
  ];
</script>

<Chart kind="bar" {data} showValues yAxisLabel="銷量" xAxisLabel="月份" />
```

### 柱狀圖（多系列）

```svelte
<Chart
  kind="bar"
  series={[
    { name: '今年', data: [120, 200, 150, 80] },
    { name: '去年', data: [100, 180, 130, 70] },
  ]}
  labels={['Q1', 'Q2', 'Q3', 'Q4']}
/>
```

### 折線圖

```svelte
<Chart
  kind="line"
  series={[{ name: '趨勢', data: [10, 25, 18, 30, 22] }]}
  labels={['週一', '週二', '週三', '週四', '週五']}
/>
```

### 圓餅圖

```svelte
<Chart
  kind="pie"
  data={[
    { label: 'Chrome', value: 60 },
    { label: 'Safari', value: 25 },
    { label: 'Firefox', value: 15 },
  ]}
  showValues
/>
```

## Accessibility

- 容器是 `role="img"` 帶 `aria-label`
- 每個資料點帶 `<title>` 元素作為 hover tooltip
- 可點擊的資料點帶 `aria-label` 和 `role="button"`
- 用 `aria-label` 描述圖表代表的內容
