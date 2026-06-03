import type { Snippet } from "svelte";
export type DrawerSide = "left" | "right";
export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  side?: DrawerSide;
  closeOnEscape?: boolean;
  title?: Snippet;
  children?: Snippet;
  footer?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onopenchange?: (open: boolean) => void;
  [key: string]: unknown;
};
