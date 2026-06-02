import type { Snippet } from "svelte";
export type EmptyStateProps = {
  icon?: Snippet;
  title?: Snippet;
  children?: Snippet;
  actions?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
