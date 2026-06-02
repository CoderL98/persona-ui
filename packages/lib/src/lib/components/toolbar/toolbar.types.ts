import type { Snippet } from "svelte";
export type ToolbarProps = {
  title?: string | Snippet;
  leading?: Snippet;
  trailing?: Snippet;
  children?: Snippet;
  sticky?: boolean;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  [key: string]: unknown;
};
