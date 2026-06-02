import type { Snippet } from "svelte";

export type KbdProps = {
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
