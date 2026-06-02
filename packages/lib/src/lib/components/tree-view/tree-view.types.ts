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
  onselect?: (id: string) => void;
  onexpandedchange?: (ids: string[]) => void;
};
