export type ListboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
export type ListboxProps = {
  /** Single-select value (string) or multi-select (string[]) */
  value?: string | string[];
  defaultValue?: string | string[];
  /** Enable multi-select mode */
  multiple?: boolean;
  options: ListboxOption[];
  disabled?: boolean;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  onValueChange?: (value: string | string[], e: Event) => void;
  [key: string]: unknown;
};
