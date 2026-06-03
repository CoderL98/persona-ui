import type { Snippet } from "svelte";
export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  title?: Snippet;
  description?: Snippet;
  children?: Snippet;
  footer?: Snippet;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  onOpenChange?: (open: boolean) => void;
  [key: string]: unknown;
};
