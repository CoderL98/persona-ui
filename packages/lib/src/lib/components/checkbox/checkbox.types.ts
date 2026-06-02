export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  /** Form name — participates in native form submission */
  name?: string;
  /** Form value submitted when checked */
  value?: string;
  required?: boolean;
  class?: string;
  style?: string;
  id?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  onchange?: (checked: boolean, e: Event) => void;
  [key: string]: unknown;
};
