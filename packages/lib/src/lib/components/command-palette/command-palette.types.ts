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
  onselect?: (id: string) => void;
  onopenchange?: (open: boolean) => void;
};
