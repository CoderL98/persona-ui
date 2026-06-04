<script lang="ts">
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

  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let timer: ReturnType<typeof setTimeout> | null = null;

  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  function handleAction() {
    triggerHaptic('light');
    onAction?.();
    if (kind === 'default') close();
    // kind='action' 不自动关，让用户主动关
  }

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
      'px-4 py-3 rounded-(--pui-md-sys-shape-corner-extra-small,4px)',
      'shadow-(--pui-elevation-3)',
      'flex items-center gap-3',
      // Tone — MD3 inverse-surface 是默认色板
      tone === 'info' && 'bg-(--pui-md-sys-color-inverse-surface) text-(--pui-md-sys-color-inverse-on-surface)',
      tone === 'success' && 'bg-(--pui-color-success-container) text-(--pui-color-on-success-container)',
      tone === 'warning' && 'bg-(--pui-color-warning-container) text-(--pui-color-on-warning-container)',
      tone === 'error' && 'bg-(--pui-md-sys-color-error-container) text-(--pui-md-sys-color-on-error-container)',
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
