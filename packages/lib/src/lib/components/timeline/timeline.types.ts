import type { Snippet } from "svelte";

export type TimelineOrientation = "vertical" | "horizontal";

export type TimelineItem = {
  id?: string;
  /** Optional title for the item */
  title?: string;
  /** Main content snippet */
  content?: Snippet;
  /** Timestamp string (e.g. "2 hours ago") */
  timestamp?: string;
  /** Visual variant for the dot */
  status?: "default" | "success" | "warning" | "error" | "info";
  /** Custom icon (overrides the default dot) */
  icon?: Snippet;
  /** Custom meta line (right side) */
  meta?: string;
};

export type TimelineProps = {
  /** Items to render */
  items: TimelineItem[];
  /** Layout direction */
  orientation?: TimelineOrientation;
  /** Active item index (highlights that item) */
  activeIndex?: number;
  /** Animate the line as items are added */
  pending?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
