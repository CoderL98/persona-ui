export type PaginationProps = {
  /** Current page (1-indexed) */
  value?: number;
  /** Default page for uncontrolled mode */
  defaultValue?: number;
  /** Total number of pages */
  total: number;
  /** Number of sibling pages around current */
  siblingCount?: number;
  /** Show first/last page buttons */
  showEdges?: boolean;
  /** Show quick-jump input */
  showJumpTo?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Aria label */
  "aria-label"?: string;
  /** Called when page changes */
  onValueChange?: (page: number) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
