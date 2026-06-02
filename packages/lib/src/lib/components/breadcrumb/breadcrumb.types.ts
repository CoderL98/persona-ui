import type { Snippet } from "svelte";
export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
  /** Optional leading icon snippet rendered before the label. */
  icon?: Snippet;
};
export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** Custom separator snippet or string. Default: chevron. */
  separator?: Snippet | string;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
};
