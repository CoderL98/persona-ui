export type SliderMark = {
  value: number;
  label?: string;
};
export type SliderProps = {
  /** Single slider: number. Range slider: [min, max]. */
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  /** Marks/ticks along the track. Each mark must align with `step`. */
  marks?: SliderMark[];
  /** Enable range (dual-thumb) mode by passing true or providing a tuple value. */
  range?: boolean;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  class?: string;
  style?: string;
  id?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  oninput?: (value: number | [number, number], e: Event) => void;
  onchange?: (value: number | [number, number], e: Event) => void;
  [key: string]: unknown;
};
