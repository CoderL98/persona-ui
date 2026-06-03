import type { Snippet } from "svelte";
export type NavigationRailItem = {
  value: string;
  label: string;
  icon?: Snippet;
  disabled?: boolean;
};
export type NavigationRailProps = {
  value?: string;
  defaultValue?: string;
  items: NavigationRailItem[];
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onValueChange?: (value: string) => void;
  [key: string]: unknown;
};
