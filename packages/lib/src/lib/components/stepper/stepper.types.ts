import type { Snippet } from "svelte";

export type StepperStep = {
  /** Unique id */
  id?: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Disable this step */
  disabled?: boolean;
  /** Custom icon snippet (overrides default number) */
  icon?: Snippet;
};

export type StepperOrientation = "horizontal" | "vertical";

export type StepperProps = {
  /** Step definitions */
  steps: StepperStep[];
  /** Current step index (0-based) */
  value?: number;
  /** Default current step for uncontrolled */
  defaultValue?: number;
  /** Layout direction */
  orientation?: StepperOrientation;
  /** Allow clicking on previous steps to go back */
  clickable?: boolean;
  /** Show step numbers / checkmarks */
  showIndicators?: boolean;
  /** Error step indices (renders error styling) */
  errorSteps?: number[];
  /** Aria label */
  "aria-label"?: string;
  /** Called when active step changes */
  onValueChange?: (index: number) => void;
  /** CSS classes */
  class?: string;
  /** Inline style */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
