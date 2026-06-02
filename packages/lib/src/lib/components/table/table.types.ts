import type { Snippet } from "svelte";
export type TableProps = {
  density?: "compact" | "normal" | "comfortable";
  striped?: boolean;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
