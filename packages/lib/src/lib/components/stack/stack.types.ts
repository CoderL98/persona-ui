import type { Snippet } from "svelte";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
export type StackWrap = "wrap" | "nowrap" | "wrap-reverse";

export type StackProps = {
  /** Flex direction */
  direction?: StackDirection;
  /** Cross-axis alignment */
  align?: StackAlign;
  /** Main-axis alignment */
  justify?: StackJustify;
  /** Gap between children (in spacing scale units) */
  gap?: StackGap;
  /** Flex wrap */
  wrap?: StackWrap;
  /** Inline-flex vs flex */
  inline?: boolean;
  /** Children */
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
