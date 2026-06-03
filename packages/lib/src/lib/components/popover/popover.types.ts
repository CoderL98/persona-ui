import type { Snippet } from "svelte";
export type PopoverPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "bottom-start"
  | "bottom-end";
export type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  placement?: PopoverPlacement;
  modal?: boolean;
  trigger?: Snippet;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onOpenChange?: (open: boolean) => void;
};
