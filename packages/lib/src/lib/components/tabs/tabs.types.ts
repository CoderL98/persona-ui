import type { Snippet } from "svelte";
export type TabItem = { value: string; label: string; disabled?: boolean };
export type TabsProps = {
  value?: string;
  defaultValue?: string;
  items?: TabItem[];
  orientation?: "horizontal" | "vertical";
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onValueChange?: (value: string) => void;
  [key: string]: unknown;
};
