export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  disabled?: boolean;
};
export type CommandPaletteProps = {
  open?: boolean;
  defaultOpen?: boolean;
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  onSelect?: (id: string) => void;
  onOpenChange?: (open: boolean) => void;
};
