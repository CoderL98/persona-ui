import type { Snippet } from "svelte";

export type TourStep = {
  /** CSS selector for the target element to spotlight */
  target: string;
  /** Title shown in the popover */
  title: string;
  /** Description / body */
  content?: string;
  /** Preferred side: 'top' | 'bottom' | 'left' | 'right' | 'auto' */
  placement?: "top" | "bottom" | "left" | "right" | "auto";
  /** Disable interaction with the target during this step */
  disableInteraction?: boolean;
};

export type TourProps = {
  /** Whether the tour is open */
  open?: boolean;
  /** Steps in order */
  steps: TourStep[];
  /** Current step index (0-based) */
  value?: number;
  /** Padding around the spotlight (px) */
  spotlightPadding?: number;
  /** Close the tour on Escape */
  closeOnEscape?: boolean;
  /** Show progress indicator (1/N) */
  showProgress?: boolean;
  /** Show skip button */
  showSkip?: boolean;
  /** Custom next/prev button labels */
  texts?: {
    next?: string;
    prev?: string;
    done?: string;
    skip?: string;
  };
  /** Called when the tour is closed */
  onOpenChange?: (open: boolean) => void;
  /** Called when step changes */
  onValueChange?: (index: number) => void;
  /** Called when tour completes (last step's "Done" clicked) */
  onComplete?: () => void;
  /** Custom popover content snippet (overrides title/content) */
  popoverContent?: Snippet;
  /** CSS classes */
  class?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  "data-testid"?: string;
};
