import type { Action } from 'svelte/action';

/**
 * Svelte action: 监听点击组件外部时触发回调。
 *
 * 用法：
 *   <div use:clickOutside={() => open = false}>...</div>
 *
 * 适用场景：Dropdown / Popover / Combobox / Menu 等"点击外部关闭"交互。
 * 优于 `svelte:window onclick` 的地方：每实例自动只监听自己的根节点，避开
 * 多组件同时打开时全局监听互相冲突的问题。
 */
export function clickOutside(
  node: HTMLElement,
  callback: (event: MouseEvent | TouchEvent) => void,
) {
  function handle(event: MouseEvent | TouchEvent) {
    const target = event.target as Node | null;
    if (target && node.contains(target)) return;
    if (target === node) return;
    callback(event);
  }
  // 用 capture 阶段让内部 `stopPropagation` 仍能正确关闭
  document.addEventListener('mousedown', handle, true);
  document.addEventListener('touchstart', handle, true);
  return {
    destroy() {
      document.removeEventListener('mousedown', handle, true);
      document.removeEventListener('touchstart', handle, true);
    },
  };
}

// 类型别名，方便使用方声明
export type ClickOutsideAction = Action<HTMLElement, (event: MouseEvent | TouchEvent) => void>;

/**
 * Svelte action: 监听 keydown 事件，转发到回调。
 *
 * 用法：
 *   <div use:keydown={{ Escape: () => open = false }}>...</div>
 *
 * 适用场景：弹层内任意位置按 Esc 关闭，焦点陷阱外仍能响应。
 */
export function keydown(
  _node: HTMLElement,
  bindings: Record<string, (e: KeyboardEvent) => void>,
) {
  function handle(e: KeyboardEvent) {
    const fn = bindings[e.key];
    if (fn) fn(e);
  }
  document.addEventListener('keydown', handle);
  return {
    update(next: Record<string, (e: KeyboardEvent) => void>) {
      bindings = next;
    },
    destroy() {
      document.removeEventListener('keydown', handle);
    },
  };
}

export type KeydownAction = Action<HTMLElement, Record<string, (e: KeyboardEvent) => void>>;
