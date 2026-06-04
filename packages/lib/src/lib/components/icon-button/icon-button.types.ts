import type { Snippet } from "svelte";

/**
 * MD3 4 档标准 Icon Button 变体：
 * - standard：纯图标，无背景无边框（最常见，用于 toolbar）
 * - filled：填充主色（高强调，FAB/Primary action）
 * - filled-tonal：填充次要色（中等强调，secondary action）
 * - outlined：透明背景 + 边框（中强调，secondary action 更克制）
 */
export type IconButtonVariant = "standard" | "filled" | "filled-tonal" | "outlined";
export type IconButtonSize = "sm" | "md" | "lg";
/** MD3 6 档标准圆角（Apple HIG 也用 6 档：0/continuous/6/10/14/20） */
export type IconButtonShape = "round" | "square";

export type IconButtonProps = {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** MD3 圆角形状：round（pill）or square（矩形） */
  shape?: IconButtonShape;
  /** Type attribute — default 'button' prevents form submission */
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  /** Required accessible label — rendered as aria-label */
  label: string;
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  'data-testid'?: string;
  onClick?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
