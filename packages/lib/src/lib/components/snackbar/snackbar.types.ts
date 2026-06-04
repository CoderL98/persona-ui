import type { Snippet } from "svelte";

/**
 * MD3 Snackbar 状态（对应 Material 3 规范）
 * - info：信息提示（默认）
 * - success：成功反馈
 * - warning：警告
 * - error：错误
 */
export type SnackbarTone = "info" | "success" | "warning" | "error";

/**
 * MD3 Snackbar 类型
 * - single：单条短提示（默认 4s）
 * - long-action：含 action 按钮（4s 内不消失，需手动关）
 */
export type SnackbarKind = "default" | "action";

export type SnackbarProps = {
  /** 控制显示（受控模式） */
  open?: boolean;
  /** 默认显示（非受控模式） */
  defaultOpen?: boolean;
  tone?: SnackbarTone;
  kind?: SnackbarKind;
  /** 持续毫秒（默认 4000 = MD3 standard） */
  duration?: number;
  /** Snackbar 文案（必填） */
  message: string;
  /** Action 按钮文案（kind=action 时必填） */
  actionLabel?: string;
  class?: string;
  style?: string;
  id?: string;
  'data-testid'?: string;
  /** Snackbar 关闭时回调 */
  onOpenChange?: (open: boolean) => void;
  /** Action 按钮点击回调 */
  onAction?: () => void;
  children?: Snippet;
  [key: string]: unknown;
};

/**
 * SnackbarViewport 队列项
 */
export type SnackbarItem = {
  id: string;
  message: string;
  tone: SnackbarTone;
  duration: number;
  actionLabel?: string;
  onAction?: () => void;
};
