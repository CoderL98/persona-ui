import type { Snippet } from "svelte";

export type ConfirmTone = "default" | "danger";

export type ConfirmDialogProps = {
  /** Whether the dialog is open */
  open?: boolean;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Tone of the confirm action */
  tone?: ConfirmTone;
  /** Text of the confirm button */
  confirmText?: string;
  /** Text of the cancel button */
  cancelText?: string;
  /** Custom content snippet (overrides description) */
  children?: Snippet;
  /** Custom footer snippet (overrides default buttons) */
  footer?: Snippet;
  /** Whether the action is loading */
  loading?: boolean;
  /** Close on backdrop click */
  closeOnOutsideClick?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when user confirms */
  onConfirm?: () => void;
  /** Called when user cancels */
  onCancel?: () => void;
  /** CSS classes */
  class?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
