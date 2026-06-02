export type TooltipPlacement = "top" | "right" | "bottom" | "left";
export type TooltipContent = string | (() => any);
export type TooltipProps = {
  content: string | (() => any);
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
  children?: () => any;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
};
