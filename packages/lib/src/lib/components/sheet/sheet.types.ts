import type { Snippet } from "svelte";
export type SheetSide = "top" | "right" | "bottom" | "left";

export type SheetProps = {
  open?: boolean;
  defaultOpen?: boolean;
  side?: SheetSide;
  closeOnEscape?: boolean;
  title?: Snippet;
  children?: Snippet;
  footer?: Snippet;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onopenchange?: (open: boolean) => void;
  [key: string]: unknown;
};
