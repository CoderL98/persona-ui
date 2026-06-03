---
title: Chart
group: components
---

# Chart

Simple SVG-based charts with three kinds: bar, line, and pie. No external chart library dependency.

## Import

```svelte
<script>
  import { Chart } from '@persona-ui/lib';
</script>
```

## API

| Prop           | Type                                              | Default      | Description                              |
| -------------- | ------------------------------------------------- | ------------ | ---------------------------------------- |
| `kind`         | `'bar' \| 'line' \| 'pie'`                        | `'bar'`      | Chart type                               |
| `series`       | `ChartSeries[]`                                   | —            | Multi-series data for bar/line           |
| `data`         | `ChartDataPoint[]`                                | —            | Pie chart data (`{label, value}`)        |
| `labels`       | `string[]`                                        | `[]`         | X-axis labels                            |
| `height`       | `number`                                          | `240`        | Chart height in px                       |
| `showLegend`   | `boolean`                                         | `true`       | Show legend                              |
| `showValues`   | `boolean`                                         | `false`      | Show data values on bars/percentages on pie |
| `colors`       | `string[]`                                        | theme palette | Color cycle for series/slices           |
| `onPointClick` | `(index: number, seriesIndex: number) => void`    | —            | Click handler on data point              |
| `aria-label`   | `string`                                          | `'Chart'`    | Accessible label for the whole chart     |

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

### Bar chart (single series)

```svelte
<script>
  import { Chart } from '@persona-ui/lib';
  const data = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 200 },
    { label: 'Mar', value: 150 },
    { label: 'Apr', value: 80 },
  ];
</script>

<Chart kind="bar" {data} showValues yAxisLabel="Sales" xAxisLabel="Month" />
```

### Multi-series bar chart

```svelte
<Chart
  kind="bar"
  series={[
    { name: 'This year', data: [120, 200, 150, 80] },
    { name: 'Last year', data: [100, 180, 130, 70] },
  ]}
  labels={['Q1', 'Q2', 'Q3', 'Q4']}
/>
```

### Line chart

```svelte
<Chart
  kind="line"
  series={[{ name: 'Trend', data: [10, 25, 18, 30, 22] }]}
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
/>
```

### Pie chart

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

- The container is `role="img"` with `aria-label`
- Each data point has a `<title>` element for hover tooltips
- Each clickable point has `aria-label` and `role="button"`
- Use `aria-label` to describe what the chart represents
