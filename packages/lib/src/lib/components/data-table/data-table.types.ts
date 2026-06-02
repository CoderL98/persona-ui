import type { Snippet } from "svelte";
export type DataTableColumn<T> = {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: Snippet<[T]>;
};
export type DataTableProps<T = Record<string, unknown>> = {
  data: T[];
  columns: DataTableColumn<T>[];
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  selectable?: boolean;
  selectedKeys?: string[];
  getRowKey?: (row: T, index: number) => string;
  class?: string;
  style?: string;
  id?: string;
  texts?: Record<string, string>;
  "data-testid"?: string;
  onsort?: (key: string, direction: "asc" | "desc") => void;
  onselectionchange?: (keys: string[]) => void;
};
