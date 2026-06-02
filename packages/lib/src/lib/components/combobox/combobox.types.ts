export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
export type ComboboxProps = {
  /** Single-select: string; multi-select (with tags): string[] */
  value?: string | string[];
  defaultValue?: string | string[];
  /** Enable multi-select with removable tags */
  multiple?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  options: ComboboxOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  oninput?: (inputValue: string, e: Event) => void;
  onchange?: (value: string | string[], e: Event) => void;
  [key: string]: unknown;
};
