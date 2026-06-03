import type { Snippet } from "svelte";

export type HoverCardPlacement = "top" | "bottom" | "left" | "right" | "auto";

export type HoverCardProps = {
  /** The trigger element */
  children?: Snippet;
  /** The content shown in the card */
  content?: Snippet;
  /** Placement of the card */
  placement?: HoverCardPlacement;
  /** Delay before showing (ms) */
  openDelay?: number;
  /** Delay before hiding (ms) */
  closeDelay?: number;
  /** Max width of the card */
  maxWidth?: number;
  /** Accessible label for the trigger */
  "aria-label"?: string;
  /** CSS classes */
  class?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
