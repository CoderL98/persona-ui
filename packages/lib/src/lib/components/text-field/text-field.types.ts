import type { Snippet } from "svelte";

export type TextFieldProps = {
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Visible label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper/caption text below the input */
  helperText?: string;
  /** Error message (also sets aria-invalid) */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only */
  readonly?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** HTML5 validation: min length */
  minlength?: number;
  /** HTML5 validation: max length */
  maxlength?: number;
  /** HTML5 validation: regex pattern */
  pattern?: string;
  /** HTML5 validation: min value (for number/date) */
  min?: string | number;
  /** HTML5 validation: max value (for number/date) */
  max?: string | number;
  /** HTML5 validation: step value */
  step?: string | number;
  /** Input type */
  type?: "text" | "email" | "password" | "search" | "url" | "number" | "tel" | "date" | "time" | "datetime-local" | "month" | "week" | "color" | "file";
  /** Form name attribute */
  name?: string;
  /** Leading icon/element */
  leading?: Snippet;
  /** Trailing icon/element */
  trailing?: Snippet;
  /** Additional CSS classes */
  class?: string;
  /** Inline style — for CSS variable overrides */
  style?: string;
  /** HTML id */
  id?: string;
  /** Props forwarded to the underlying <input> element (0.2) */
  inputProps?: Record<string, unknown>;
  /** Accessible label (overrides visible label for aria) */
  "aria-label"?: string;
  /** Test id */
  "data-testid"?: string;
  /** Input event */
  onInput?: (e: InputEvent) => void;
  onChange?: (e: Event) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  /** All other native input attributes */
  [key: string]: unknown;
};
