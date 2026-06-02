import type { Snippet } from "svelte";

export type IconButtonVariant = "filled" | "tonal" | "outlined" | "text";
export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Type attribute — default 'button' prevents form submission */
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  /** Required accessible label — rendered as aria-label */
  label: string;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  'data-testid'?: string;
  onclick?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
