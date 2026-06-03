import type { Snippet } from "svelte";

export type ContextMenuItem = {
  id?: string;
  label?: string;
  icon?: Snippet;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  shortcut?: string;
  children?: ContextMenuItem[];
  onSelect?: () => void;
};

export type ContextMenuProps = {
  /** Whether the menu is open */
  open?: boolean;
  /** Position of the menu (x, y in viewport coordinates) */
  position?: { x: number; y: number };
  /** Menu items (flat list, with optional children for submenus) */
  items: ContextMenuItem[];
  /** Close on item click */
  closeOnSelect?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Called when the menu closes */
  onOpenChange?: (open: boolean) => void;
  /** CSS classes */
  class?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
