import type { Snippet } from "svelte";

/**
 * Granularity of the date/time range picker.
 * - `year`:      only year selection
 * - `month`:     year + month
 * - `day`:       year + month + day (default)
 * - `hour`:      up to hour
 * - `minute`:    up to minute
 * - `second`:    up to second
 */
export type DateRangeGranularity = "year" | "month" | "day" | "hour" | "minute" | "second";

export type DateRangeValue = {
  start: Date | null;
  end: Date | null;
};

export type DateRangePickerProps = {
  /** Controlled value — { start, end } or { start: null, end: null } */
  value?: DateRangeValue;
  /** Uncontrolled default value */
  defaultValue?: DateRangeValue;
  /** Granularity of selection — determines which units are shown */
  granularity?: DateRangeGranularity;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** Locale for date formatting (default 'en-US') */
  locale?: string;
  /** Placeholder text when no range selected */
  placeholder?: string;
  /** Label above trigger */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Override display texts for this instance */
  texts?: Record<string, string>;
  /** Custom footer content */
  footer?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  /** Fires when range is selected — values are always full Date objects */
  onchange?: (range: DateRangeValue) => void;
  [key: string]: unknown;
};
