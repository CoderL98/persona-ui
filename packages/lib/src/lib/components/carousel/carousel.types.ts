import type { Snippet } from "svelte";

export type CarouselSlide = {
  id?: string;
  content?: Snippet;
  alt?: string;
};

export type CarouselProps = {
  /** Slides to display */
  slides: CarouselSlide[];
  /** Controlled current index (0-based) */
  value?: number;
  /** Default index for uncontrolled mode */
  defaultValue?: number;
  /** Auto-advance interval in ms (0 = no auto) */
  interval?: number;
  /** Show prev/next buttons */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Loop back to first after last */
  loop?: boolean;
  /** Pause auto-advance on hover */
  pauseOnHover?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Called when active slide changes */
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
