export type TimePickerFormat = "12h" | "24h";


export type TimePickerProps = {
  /** Controlled value (HH:MM string or Date whose time portion is used) */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Time format — 12h shows AM/PM, 24h uses 00-23 */
  format?: TimePickerFormat;
  /** Step in minutes for the minute selector (default 5, must divide 60) */
  minuteStep?: number;
  /** Placeholder text when no time selected */
  placeholder?: string;
  /** Visible label above the trigger */
  label?: string;
  /** Helper text below */
  helperText?: string;
  /** Error message (hides helperText when set) */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Override display texts for this instance */
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  /** Fires when user selects a time — receives "HH:MM" string */
  onchange?: (time: string) => void;
  [key: string]: unknown;
};
