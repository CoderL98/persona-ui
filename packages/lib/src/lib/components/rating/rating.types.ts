import type { Snippet } from "svelte";

export type RatingSize = "sm" | "md" | "lg";

export type RatingProps = {
  /** Controlled value (0 to max) */
  value?: number;
  /** Default value for uncontrolled */
  defaultValue?: number;
  /** Maximum number of icons */
  max?: number;
  /** Allow half values (mouse hover at half position) */
  allowHalf?: boolean;
  /** Read-only mode */
  readonly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: RatingSize;
  /** Active color */
  color?: string;
  /** Inactive color */
  inactiveColor?: string;
  /** Accessible label */
  "aria-label"?: string;
  /** Called when value changes */
  onValueChange?: (value: number) => void;
  /** Called on hover (for live preview) */
  onHoverChange?: (value: number) => void;
  /** Custom icon snippet (overrides default star) */
  icon?: Snippet;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
