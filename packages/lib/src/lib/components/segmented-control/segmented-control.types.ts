export type SegmentItem = { value: string; label: string; disabled?: boolean };
export type SegmentedControlProps = {
  value?: string;
  defaultValue?: string;
  items: SegmentItem[];
  disabled?: boolean;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onValueChange?: (value: string) => void;
  [key: string]: unknown;
};
