// Persona UI — SSR-safe 唯一 id 工具
// 用 crypto.randomUUID() 替代 Math.random()，避免 SSR/CSR hydration mismatch
// crypto.randomUUID 在 Node 18+ 和现代浏览器均原生可用
// 仅作 fallback 使用；推荐调用方传入 `id` prop 以保证跨平台一致性

/**
 * 生成一个稳定的 fallback id。
 * 同一组件实例在一次渲染过程中会得到同一个 id（基于 $derived 调用一次）。
 * SSR 与 CSR 之间的随机性差异不会影响组件内部 ARIA 关联，
 * 因为触发器和 label 都在同一组件实例中同时生成新 id。
 *
 * @example
 *   const fieldId = $derived(id || uniqueId('pui-field'));
 */
export function uniqueId(prefix: string): string {
  // crypto 在 SSR (Node 18+) 和 CSR (现代浏览器) 都可用
  // 用 slice(0, 8) 得到 8 位短 id，与原来 Math.random().toString(36).slice(2, 6|8) 长度一致
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  // 极端降级：旧浏览器 / 旧 Node（< 14.17 / < 16）
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
