import type { Snippet } from "svelte";

export type BottomNavigationItem = {
  id: string;
  label: string;
  icon: Snippet;
  badge?: number | string;
  disabled?: boolean;
};

export type BottomNavigationProps = {
  /** Active item id */
  value?: string;
  /** Default active item for uncontrolled mode */
  defaultValue?: string;
  /** Items to display */
  items: BottomNavigationItem[];
  /** Show labels alongside icons */
  showLabels?: boolean;
  /** Show only icons */
  iconsOnly?: boolean;
  /** Accessible label for the nav */
  "aria-label"?: string;
  /** Called when active item changes */
  onValueChange?: (id: string) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
