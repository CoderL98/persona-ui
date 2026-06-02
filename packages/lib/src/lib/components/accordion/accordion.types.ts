import type { Snippet } from "svelte";
export type AccordionItem = {
  value: string;
  title: string;
  /** Optional content to render when expanded */
  content?: Snippet;
  disabled?: boolean;
};
export type AccordionProps = {
  value?: string | string[];
  defaultValue?: string | string[];
  items?: AccordionItem[];
  multiple?: boolean;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onchange?: (value: string | string[]) => void;
  [key: string]: unknown;
};
