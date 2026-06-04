import type { Snippet } from "svelte";

/**
 * MD3 FAB (Floating Action Button) 尺寸
 * - small: 40dp（mini FAB，紧凑工具栏场景）
 * - regular: 56dp（标准 FAB，default）
 * - large: 96dp（extended FAB 容器尺寸）
 */
export type FabSize = "small" | "regular" | "large";

/**
 * MD3 FAB 颜色变体
 * - surface: tertiary-container（最低强调，辅助操作）
 * - primary: primary（高强调，主要操作）
 * - secondary: secondary（中强调）
 * - tertiary: tertiary（中强调，对比主操作）
 */
export type FabVariant = "surface" | "primary" | "secondary" | "tertiary";

export type FabProps = {
  variant?: FabVariant;
  size?: FabSize;
  /** Required accessible label — rendered as aria-label */
  label: string;
  /** Extended FAB label（large 尺寸下显示在 icon 旁边） */
  extendedLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  /** Icon snippet */
  children?: Snippet;
  class?: string;
  style?: string;
  id?: string;
  'data-testid'?: string;
  onClick?: (e: MouseEvent) => void;
  [key: string]: unknown;
};
