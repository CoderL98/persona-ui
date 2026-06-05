<script lang="ts">
  // Snackbar 组件 — MD3 标准的轻量反馈条
  // 4 档语义（info/success/warning/error）+ 2 档行为（default 4s 自动关 / action 需手动关）
  // 与 Toast 的差异：定位在屏幕底部中央（不在右上角）、无进度条、tone 体系用 MD3 inverse-surface
  // 触觉反馈：action 按钮按下时给一档 light 触感
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { triggerHaptic } from '../../internal/haptics.js';
  import type { SnackbarProps, SnackbarTone, SnackbarKind } from './snackbar.types.js';

  let {
    open: controlledOpen,
    defaultOpen = false,
    tone = 'info' as SnackbarTone,
    kind = 'default' as SnackbarKind,
    duration = 4000,
    message,
    actionLabel,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onOpenChange,
    onAction,
    children,
    ...rest
  }: SnackbarProps = $props();

  let _autoId = $props.id();
  const snackbarId = $derived(id ?? _autoId);

  // 受控/非受控双向：controlled 优先；fallback 到 internal（untrack 只读初值一次）
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let timer: ReturnType<typeof setTimeout> | null = null;

  // 关闭逻辑：清状态 + 通知外部（非受控时改 internal，受控时只通知）
  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  // Action 按钮处理：触发触感 + 回调 + 按 kind 决定是否自动关
  function handleAction() {
    triggerHaptic('light');
    onAction?.();
    if (kind === 'default') close();
    // kind='action' 不自动关，让用户主动关（避免撤销/重做被覆盖）
  }

  // 自动关闭定时器：仅 default kind + 持续时长 > 0 时启动
  // 每次 isOpen/duration 变化都重设 timer；返回的 cleanup 在 effect 重新跑时清旧 timer
  $effect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen && duration > 0 && kind === 'default') {
      if (timer) clearTimeout(timer);
      timer = setTimeout(close, duration);
      return () => {
        if (timer) clearTimeout(timer);
        timer = null;
      };
    }
    return () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
  });

  const attrs = $derived(dataAttrs({ tone, kind, open: isOpen || undefined }));
</script>

{#if isOpen}
  <div
    {...rest}
    {...attrs}
    id={snackbarId}
    class={cn(
      'pui-snackbar',
      'pui-state-layer',
      'fixed left-1/2 -translate-x-1/2 z-(--pui-z-toast)',
      'bottom-(--pui-snackbar-bottom,calc(16px + env(safe-area-inset-bottom,0px)))',
      'min-w-(--pui-snackbar-min-w,288px) max-w-(--pui-snackbar-max-w,568px)',
      'px-4 py-3 rounded-(--pui-snackbar-radius,4px)',
      'shadow-(--pui-elevation-3)',
      'flex items-center gap-3',
      // Tone — M12 PR2 改用通用 token（各主题在自己的 CSS 中映射到对应源 token）
      tone === 'info' && 'bg-(--pui-snackbar-bg-info) text-(--pui-snackbar-fg-info)',
      tone === 'success' && 'bg-(--pui-color-success-container) text-(--pui-color-on-success-container)',
      tone === 'warning' && 'bg-(--pui-color-warning-container) text-(--pui-color-on-warning-container)',
      tone === 'error' && 'bg-(--pui-snackbar-bg-error) text-(--pui-snackbar-fg-error)',
      className
    )}
    style={style}
    role="status"
    aria-live="polite"
    data-testid={dataTestId}
  >
    <span class="flex-1 text-sm font-medium leading-snug">{message}</span>
    {#if actionLabel}
      <button
        type="button"
        class="text-sm font-semibold uppercase tracking-wide opacity-90 hover:opacity-100 transition-opacity"
        onclick={handleAction}
      >
        {actionLabel}
      </button>
    {/if}
    <button
      type="button"
      aria-label="Dismiss"
      class="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      onclick={close}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M13 5L5 13M5 5l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    {@render children?.()}
  </div>
{/if}
