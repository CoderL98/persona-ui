import type { Snippet } from "svelte";

export type InputGroupProps = {
  /** Addons before the input (icons, text, buttons) */
  leading?: Snippet;
  /** Addons after the input (icons, text, buttons) */
  trailing?: Snippet;
  /** Group orientation */
  orientation?: "horizontal" | "vertical";
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Children - typically one or more TextField/Button */
  children?: Snippet;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
