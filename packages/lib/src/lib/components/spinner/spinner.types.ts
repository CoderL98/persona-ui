import type { Snippet } from "svelte";
export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerTone = "primary" | "success" | "warning" | "error" | "current";
export type SpinnerProps = {
  size?: SpinnerSize;
  /** Semantic tone — "current" inherits text color */
  tone?: SpinnerTone;
  label?: string;
  decorative?: boolean;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
};
