export type InputOTPProps = {
  /** Controlled value (concatenated digits) */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Number of input slots */
  length?: number;
  /** Allowed character pattern (regex); default digits only */
  pattern?: RegExp;
  /** Mask characters with • */
  mask?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readonly?: boolean;
  /** Auto-focus the first input on mount */
  autoFocus?: boolean;
  /** Placeholder character for empty slots */
  placeholder?: string;
  /** Input type: 'text', 'number', 'password' */
  type?: "text" | "number" | "password";
  /** Aria label */
  "aria-label"?: string;
  /** Called whenever the value changes (with the joined string) */
  onValueChange?: (value: string) => void;
  /** Called when all slots are filled */
  onComplete?: (value: string) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
