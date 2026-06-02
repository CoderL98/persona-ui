import type { Snippet } from "svelte";

export type ButtonVariant =
  | "filled"
  | "elevated"
  | "tonal"
  | "outlined"
  | "text";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /** Visual variant (0A.3.7: filled | elevated | tonal | outlined | text) */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Type attribute — default 'button' prevents form submission */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state (shows spinner + aria-busy) */
  loading?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** Main content / label */
  children?: Snippet;
  /** Leading icon or element */
  leading?: Snippet;
  /** Trailing icon or element */
  trailing?: Snippet;
  /** Additional CSS classes */
  class?: string;
  /** Inline style — primary mechanism for CSS variable overrides */
  style?: string;
  /** HTML id */
  id?: string;
  /** Accessible label */
  'aria-label'?: string;
  /** Test id */
  'data-testid'?: string;
  /** Click handler */
  onclick?: (e: MouseEvent) => void;
  /** All other native button attributes */
  [key: string]: unknown;
};
