export type SwitchProps = {
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled default checked state */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Visible label */
  label?: string;
  /** Form name — participates in native form submission */
  name?: string;
  /** Form value submitted when checked */
  value?: string;
  required?: boolean;
  /** Additional CSS classes */
  class?: string;
  /** Inline style — for CSS variable overrides */
  style?: string;
  /** HTML id */
  id?: string;
  /** Accessible label */
  "aria-label"?: string;
  /** Test id */
  "data-testid"?: string;
  /** Change event — fires with new checked state */
  onCheckedChange?: (checked: boolean, e: Event) => void;
  /** All other native attributes */
  [key: string]: unknown;
};
