import type { Snippet } from 'svelte';

/**
 * MD3 5 档 Card 变体：
 * - elevated：带阴影的卡片（默认，主要内容卡）
 * - filled：填充 surface-variant 色（次要）
 * - outlined：仅边框（更克制）
 * - tonal：MD3 2024 新增，填充 secondary-container（中强调）
 * - flat：无背景无边框（内容嵌在背景里）
 */
export type CardVariant = 'elevated' | 'filled' | 'outlined' | 'tonal' | 'flat';
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
