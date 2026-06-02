<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { toasts, dismiss, type ToastRecord, type ToastTone } from './toast.store.js';
  import type { ToastViewportProps } from './toast.types.js';

  let { position = 'bottom-right', children, class: className, style }: ToastViewportProps = $props();

  let list: ToastRecord[] = $state([]);
  onMount(() => toasts.subscribe((v) => (list = v)));

  // 每个 toast 的自动消失计时器
  let timers = new Map<string, ReturnType<typeof setTimeout>>();
  $effect(() => {
    for (const t of list) {
      if (timers.has(t.id)) continue;
      if (t.duration > 0) {
        timers.set(
          t.id,
          setTimeout(() => {
            dismiss(t.id);
            timers.delete(t.id);
          }, t.duration),
        );
      }
    }
    return () => {
      for (const [id, timer] of timers) {
        clearTimeout(timer);
        timers.delete(id);
      }
    };
  });

  const positionClass = $derived(
    position === 'top-left' ? 'top-4 left-4'
    : position === 'top-right' ? 'top-4 right-4'
    : position === 'bottom-left' ? 'bottom-4 left-4'
    : position === 'bottom-center' ? 'bottom-4 left-1/2 -translate-x-1/2'
    : 'bottom-4 right-4'
  );

  const toneClass = (tone: ToastTone) =>
    tone === 'info' ? 'bg-(--pui-surface-raised) text-(--pui-text-primary) border-(--pui-outline-subtle)'
    : tone === 'success' ? 'bg-(--pui-color-tertiary) text-(--pui-color-on-primary)'
    : tone === 'warning' ? 'bg-oklch(0.95 0.05 85) text-oklch(0.25 0.04 85)'
    : 'bg-(--pui-color-error) text-(--pui-color-on-error)';
</script>

<!-- 渲染 children（用户主动传入的 <Toast>） -->
{@render children?.()}

<!-- 命令式 toast 队列 -->
<div
  class={cn(
    'pui-toast-viewport pointer-events-none fixed z-(--pui-z-modal) flex flex-col gap-2',
    positionClass,
    className,
  )}
  style={style}
  aria-live="polite"
  aria-atomic="false"
>
  {#each list as t (t.id)}
    <div
      role="status"
      in:slide={{ duration: 250 }}
      out:fade={{ duration: 200 }}
      class={cn(
        'pointer-events-auto flex items-start gap-3 rounded-(--pui-radius-container) px-4 py-3 shadow-(--pui-elevation-3) text-sm min-w-72 max-w-sm border',
        toneClass(t.tone),
      )}
    >
      <div class="flex-1 space-y-0.5">
        {#if t.title}
          <div class="font-medium">{t.title}</div>
        {/if}
        <div>{t.message}</div>
      </div>
      {#if t.dismissible}
        <button
          type="button"
          aria-label="Dismiss"
          class="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          onclick={() => dismiss(t.id)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
            ><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg
          >
        </button>
      {/if}
    </div>
  {/each}
</div>
