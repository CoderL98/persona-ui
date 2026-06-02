import type { Snippet } from "svelte";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";
export type TextareaProps = {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** HTML5 validation: min length */
  minlength?: number;
  /** HTML5 validation: max length */
  maxlength?: number;
  rows?: number;
  resize?: TextareaResize;
  /** Form name attribute */
  name?: string;
  leading?: Snippet;
  trailing?: Snippet;
  inputProps?: Record<string, unknown>;
  class?: string;
  style?: string;
  id?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  oninput?: (e: Event) => void;
  onchange?: (e: Event) => void;
  onfocus?: (e: FocusEvent) => void;
  onblur?: (e: FocusEvent) => void;
  [key: string]: unknown;
};
