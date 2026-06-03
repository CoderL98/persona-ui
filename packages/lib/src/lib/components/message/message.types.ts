import type { Snippet } from "svelte";

export type MessageTone = "info" | "success" | "warning" | "error";

export type MessageProps = {
  /** Whether the message is visible */
  open?: boolean;
  /** Message tone (color scheme) */
  tone?: MessageTone;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom content (overrides description) */
  children?: Snippet;
  /** Custom leading icon (overrides default) */
  leading?: Snippet;
  /** Auto-close duration in ms (0 = no auto-close) */
  duration?: number;
  /** Show close button */
  closable?: boolean;
  /** Position on screen */
  placement?: "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left";
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when the duration timer expires */
  onTimeout?: () => void;
  /** CSS classes */
  class?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
