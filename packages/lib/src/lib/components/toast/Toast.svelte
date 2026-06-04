<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import type { ToastProps, ToastTone } from './toast.types.js';
  type ToastTexts = { dismiss: string };
  let { tone = 'info' as ToastTone, open: controlledOpen, defaultOpen = false, duration = 5000, title, children, action, dismissible = true, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, onOpenChange, ...rest }: ToastProps = $props();
  const defaults: ToastTexts = { dismiss: 'Dismiss' };
  const t = $derived({ ...defaults, ...localTexts });
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  // 修复：原实现 timer 是普通变量，close() 读到的可能是闭包旧值
  // 用模块级容器保存 timer 引用，避免 $state 触发 effect 自身重跑（无限循环）
  let timerHandle: ReturnType<typeof setTimeout> | null = null;

  function clearTimer() {
    if (timerHandle) {
      clearTimeout(timerHandle);
      timerHandle = null;
    }
  }

  $effect(() => {
    // 追踪 isOpen/duration 变化，effect 重跑时先清掉旧 timer
    untrack(() => clearTimer());
    if (isOpen && duration > 0) {
      timerHandle = setTimeout(() => {
        timerHandle = null;
        if (controlledOpen === undefined) internalOpen = false;
        onOpenChange?.(false);
      }, duration);
    }
    return () => untrack(() => clearTimer());
  });

  function close() {
    clearTimer();
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }
</script>
{#if isOpen}
  <div {...rest} id={id} role="status" aria-live="polite" in:slide={{ duration: 300 }} out:fade={{ duration: 200 }}
    class={cn('pui-toast flex items-start gap-3 rounded-(--pui-radius-container) px-4 py-3 shadow-(--pui-elevation-3) text-sm transition-all',
      tone === 'info' && 'bg-(--pui-surface-raised) text-(--pui-text-primary)',
      tone === 'success' && 'bg-(--pui-color-tertiary) text-(--pui-color-on-primary)',
      tone === 'warning' && 'bg-oklch(0.95 0.05 85) text-oklch(0.25 0.04 85)',
      tone === 'error' && 'bg-(--pui-color-error) text-(--pui-color-on-error)', className)}
    style={style} data-testid={dataTestId}>
    <div class="flex-1 space-y-1">
      {#if title}<div class="font-medium">{@render title()}</div>{/if}
      {#if children}<div>{@render children()}</div>{/if}
    </div>
    {#if action}<div class="shrink-0">{@render action()}</div>{/if}
    {#if dismissible}
      <button type="button" aria-label={t.dismiss} class="shrink-0 opacity-60 hover:opacity-100 transition-opacity" onclick={close}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    {/if}
  </div>
{/if}
