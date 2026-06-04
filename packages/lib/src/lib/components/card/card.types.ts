import type { Snippet } from 'svelte';

export type CardVariant = 'elevated' | 'filled' | 'outlined';
export type CardPadding = 'sm' | 'md' | 'lg';

export type CardProps = {
  /** Visual variant */
  variant?: CardVariant;
  /** Inner padding preset */
  padding?: CardPadding;
  /** Card is clickable — applies hover lift + role=button + keyboard handlers */
  interactive?: boolean;
  /** Title/header snippet */
  title?: Snippet;
  /** Main body content */
  children?: Snippet;
  /** Bottom actions area */
  actions?: Snippet;
  /** Click handler (used when interactive) */
  onClick?: (e: MouseEvent | KeyboardEvent) => void;
  /** Additional CSS classes */
  class?: string;
  /** Inline style — for CSS variable overrides */
  style?: string;
  /** HTML id */
  id?: string;
  /** Test id */
  'data-testid'?: string;
  /** All other native attributes */
  [key: string]: unknown;
};
