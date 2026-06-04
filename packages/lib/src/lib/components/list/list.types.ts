import type { Snippet } from "svelte";
export type ListProps = {
  variant?: "plain" | "inset" | "grouped";
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
export type ListItemProps = {
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  leading?: Snippet;
  trailing?: Snippet;
  title?: string | Snippet;
  description?: string | Snippet;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onClick?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
