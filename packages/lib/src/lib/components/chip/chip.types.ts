import type { Snippet } from "svelte";

export type ChipVariant = "filled" | "outlined" | "text";
export type ChipTone = "neutral" | "primary" | "success" | "warning" | "error";


export type ChipProps = {
  variant?: ChipVariant;
  tone?: ChipTone;
  selected?: boolean;
  disabled?: boolean;
  removable?: boolean;
  children?: Snippet;
  leading?: Snippet;
  trailing?: Snippet;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onClick?: (e: MouseEvent) => void;
  onRemove?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
