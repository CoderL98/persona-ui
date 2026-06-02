import type { Snippet } from "svelte";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "error";
export type BadgeSize = "sm" | "md";

export type BadgeProps = {
  tone?: BadgeTone;
  size?: BadgeSize;
  dot?: boolean;
  count?: number;
  max?: number;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
