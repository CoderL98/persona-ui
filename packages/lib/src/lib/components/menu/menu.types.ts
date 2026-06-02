import type { Snippet } from "svelte";
export type MenuItem = {
  id: string;
  label: string;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
};
export type MenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  items?: MenuItem[];
  trigger?: Snippet;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onselect?: (id: string) => void;
  onopenchange?: (open: boolean) => void;
};
