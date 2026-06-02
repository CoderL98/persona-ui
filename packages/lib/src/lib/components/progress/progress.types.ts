export type ProgressTone = "primary" | "success" | "warning" | "error";
export type ProgressProps = {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  /** Semantic tone */
  tone?: ProgressTone;
  label?: string;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  [key: string]: unknown;
};
