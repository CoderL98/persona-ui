export type SkeletonShape = "text" | "rect" | "circle";
export type SkeletonProps = {
  shape?: SkeletonShape;
  width?: string;
  height?: string;
  animated?: boolean;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
};
