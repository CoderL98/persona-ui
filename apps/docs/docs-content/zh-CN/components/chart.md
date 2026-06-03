---
title: 图表
group: components
---

# Chart

基于 SVG 的轻量图表组件，支持柱状图、折线图、饼图三种类型，无外部图表库依赖。

## Import

```svelte
<script>
  import { Chart } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                              | Default      | Description                       |
| -------------- | ------------------------------------------------- | ------------ | --------------------------------- |
| `kind`         | `'bar' \| 'line' \| 'pie'`                        | `'bar'`      | 图表类型                          |
| `series`       | `ChartSeries[]`                                   | —            | 柱/折线图多系列数据                |
| `data`         | `ChartDataPoint[]`                                | —            | 饼图数据 (`{label, value}`)        |
| `labels`       | `string[]`                                        | `[]`         | X 轴标签                          |
| `height`       | `number`                                          | `240`        | 图表高度（px）                    |
| `showLegend`   | `boolean`                                         | `true`       | 显示图例                          |
| `showValues`   | `boolean`                                         | `false`      | 柱顶数值/饼图百分比                |
| `colors`       | `string[]`                                        | 主题色板      | 系列/扇区颜色循环                  |
| `onPointClick` | `(index: number, seriesIndex: number) => void`    | —            | 数据点点击回调                    |
| `aria-label`   | `string`                                          | `'图表'`     | 整体无障碍标签                    |

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

### 柱状图（单系列）

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

<Chart kind="bar" {data} showValues yAxisLabel="销量" xAxisLabel="月份" />
```

### 柱状图（多系列）

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

### 折线图

```svelte
<Chart
  kind="line"
  series={[{ name: '趋势', data: [10, 25, 18, 30, 22] }]}
  labels={['周一', '周二', '周三', '周四', '周五']}
/>
```

### 饼图

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

- 容器是 `role="img"` 带 `aria-label`
- 每个数据点带 `<title>` 元素作为 hover tooltip
- 可点击的数据点带 `aria-label` 和 `role="button"`
- 用 `aria-label` 描述图表代表的内容
