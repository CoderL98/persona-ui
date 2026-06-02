import type { Snippet } from "svelte";
export type AlertTone = "info" | "success" | "warning" | "error";
export type AlertVariant = "soft" | "outlined" | "filled";

export type AlertProps = {
  tone?: AlertTone;
  variant?: AlertVariant;
  title?: Snippet;
  children?: Snippet;
  icon?: Snippet;
  actions?: Snippet;
  dismissible?: boolean;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onDismiss?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
