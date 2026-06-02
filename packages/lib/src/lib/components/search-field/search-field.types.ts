
export type SearchFieldProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  clearable?: boolean;
  disabled?: boolean;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  onInput?: (value: string, e: Event) => void;
  onClear?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
