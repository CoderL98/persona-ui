import type { ListboxOption } from "$lib/components/listbox/listbox.types.js";
export type SelectOption = ListboxOption;
export type SelectProps = {
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  /**
   * Force native `<select>` rendering (useful on mobile for OS-native picker UX).
   * When `true`, options.label is shown; value is submitted as form data.
   */
  native?: boolean;
  /** Form name attribute (used by native mode) */
  name?: string;
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
  onchange?: (value: string, e: Event) => void;
  [key: string]: unknown;
};
