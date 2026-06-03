import type { Snippet } from "svelte";
export type ToastTone = "info" | "success" | "warning" | "error";
export type ToastProps = {
  tone?: ToastTone;
  open?: boolean;
  defaultOpen?: boolean;
  duration?: number;
  title?: Snippet;
  children?: Snippet;
  action?: Snippet;
  dismissible?: boolean;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  onOpenChange?: (open: boolean) => void;
};
export type ToastViewportProps = {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  children?: Snippet;
  class?: string;
  style?: string;
};
