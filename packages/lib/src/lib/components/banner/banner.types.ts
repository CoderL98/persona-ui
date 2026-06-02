import type { Snippet } from "svelte";
export type BannerTone = "info" | "success" | "warning" | "error";
export type BannerProps = {
  tone?: BannerTone;
  sticky?: boolean;
  /** Show close button — controlled or uncontrolled */
  dismissible?: boolean;
  /** When uncontrolled, start dismissed */
  defaultDismissed?: boolean;
  /** Override close button text */
  texts?: Record<string, string>;
  icon?: Snippet;
  children?: Snippet;
  actions?: Snippet;
  /** Fires when the user clicks the close button */
  onDismiss?: () => void;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
