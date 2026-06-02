import type { Snippet } from "svelte";

export type RadioGroupOrientation = "horizontal" | "vertical";
export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  name?: string;
  orientation?: RadioGroupOrientation;
  disabled?: boolean;
  label?: string;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onchange?: (value: string, e: Event) => void;
  children?: Snippet;
  [key: string]: unknown;
};

export type RadioProps = {
  value: string;
  label?: string;
  disabled?: boolean;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
