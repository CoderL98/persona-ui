/**
 * iOS Haptics 反馈（0A.2.7 P1.1 补充）
 *
 * Apple HIG "Feedback" 章节强制要求 UI 元素交互时提供触觉反馈。
 * 对应 UIKit 的 UIImpactFeedbackGenerator / UISelectionFeedbackGenerator /
 * UINotificationFeedbackGenerator。
 *
 * Web 平台支持：
 * - iOS Safari 13+：navigator.vibrate()（需要用户交互）
 * - macOS Safari：不支持
 * - Android Chrome：navigator.vibrate()（pattern 支持）
 * - Desktop：no-op
 *
 * 5 档标准触感（参考 Apple HIG）：
 * - selection：轻量选择反馈（picker / segment 切换）
 * - light：轻量影响（button tap、小交互）
 * - medium：中量影响（toolbar 按钮、toggle）
 * - heavy：重量影响（重要操作、long press 释放）
 * - success/warning/error：通知反馈（任务完成 / 警告 / 错误）
 *
 * 兼容方案：navigator.vibrate(pattern) 在 Android 上有原生触感。
 * iOS Safari 没有 web API，所以是 no-op（iOS 必须在原生 app 才支持）。
 */

export type HapticType =
  | "selection"
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error";

  /** 不同触感对应的振动模式（毫秒）— Android 平台
   *  - 单数字：持续振动时长
   *  - 数组：vibrate-on-pause-on-vibrate... 节奏模式
   *  - success/warning/error 用节奏模式区分语义
   */
  const VIBRATION_PATTERNS: Record<HapticType, number | number[]> = {
  selection: 10, // 极短
  light: 15,
  medium: 25,
  heavy: 35,
  success: [10, 30, 30], // 短-停-短（成功模式）
  warning: [25, 50, 25], // 中-停-中（警告模式）
  error: [35, 80, 35, 80, 35], // 长-停-长-停-长（错误模式）
};

/**
 * 触发触感反馈。自动检测 navigator.vibrate 支持；不支持则 no-op。
 * 同时尊重 prefers-reduced-motion 偏好（触感属于 motion 类别，无障碍设置应关闭）。
 *
 * @example
 * import { triggerHaptic } from '$lib/internal/haptics';
 * function handleClick() { triggerHaptic('light'); onClick?.(e); }
 */
export function triggerHaptic(type: HapticType): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;
  // 仅在 secure context + 实际可用时触发（避免 dev tools 噪音）
  const vibrate = navigator.vibrate?.bind(navigator);
  if (typeof vibrate !== "function") return;

  // 用户偏好：prefers-reduced-motion 不应触发（触感属于 motion 类别）
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  try {
    vibrate(VIBRATION_PATTERNS[type]);
  } catch {
    // 某些浏览器会抛 InvalidArgumentError，忽略
  }
}

/** 检查当前设备是否支持 web haptics（同步、不阻塞 UI）
 *  用于上层根据平台差异选择不同 UI 行为（如桌面端用 tooltip 替代 haptic 提示）
 */
export function supportsHaptics(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  return typeof navigator.vibrate === "function";
}
