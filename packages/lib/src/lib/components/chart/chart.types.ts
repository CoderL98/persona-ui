export type ChartKind = "bar" | "line" | "pie";

export type ChartSeries = {
  name: string;
  data: number[];
  color?: string;
};

export type ChartDataPoint = {
  label: string;
  value: number;
};

export type ChartProps = {
  /** Chart type */
  kind?: ChartKind;
  /** Bar/Line: array of series; Pie: single series of name+value */
  series?: ChartSeries[];
  /** Pie chart data: array of {label, value} */
  data?: ChartDataPoint[];
  /** X-axis labels (for bar/line) */
  labels?: string[];
  /** Chart height in px */
  height?: number;
  /** Show legend */
  showLegend?: boolean;
  /** Show data point values on bars */
  showValues?: boolean;
  /** Y-axis label */
  yAxisLabel?: string;
  /** X-axis label */
  xAxisLabel?: string;
  /** Accessible label for the whole chart */
  "aria-label"?: string;
  /** Color palette (auto-cycled for series) */
  colors?: string[];
  /** Click handler on a data point */
  onPointClick?: (index: number, seriesIndex: number) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
