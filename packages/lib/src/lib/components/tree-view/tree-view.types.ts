export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
};
export type TreeViewProps = {
  nodes: TreeNode[];
  selectedId?: string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onSelect?: (id: string) => void;
  onExpandedChange?: (ids: string[]) => void;
};
