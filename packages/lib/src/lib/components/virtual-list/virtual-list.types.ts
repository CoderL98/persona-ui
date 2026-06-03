import type { Snippet } from "svelte";

export type VirtualListProps = {
  /** Total item count */
  itemCount: number;
  /** Fixed item height in px (used for calculation) */
  itemHeight: number;
  /** Viewport height in px */
  height: number;
  /** Overscan count (extra items rendered above/below) */
  overscan?: number;
  /** Accessible label for the list region */
  "aria-label"?: string;
  /** Item renderer snippet; receives { index, style } */
  item: Snippet<[{ index: number; style: string }]>;
  /** Called when visible range changes */
  onRangeChange?: (range: { start: number; end: number }) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
