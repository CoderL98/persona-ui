<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { lockScroll, unlockScroll } from '../../internal/scroll-lock.js';
  import type { DrawerProps, DrawerSide } from './drawer.types.js';
  let { open: controlledOpen, defaultOpen = false, side = 'left' as DrawerSide, title, children, footer, class: className, style, id, 'data-testid': dataTestId, onopenchange: onopenchange, ...rest }: DrawerProps = $props();
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  function close() { if (controlledOpen === undefined) internalOpen = false; onopenchange?.(false); }
  // Focus trap
  let prevFocus: HTMLElement | null = null;
  function trapFocus(e: KeyboardEvent) {
    if (!isOpen || e.key !== 'Tab') return;
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    const focusable = Array.from(el.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled'));
    if (focusable.length === 0) { e.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  $effect(() => {
    if (isOpen) {
      lockScroll();
      prevFocus = document.activeElement as HTMLElement;
      requestAnimationFrame(() => { if (id) document.getElementById(id)?.focus(); });
    } else {
      unlockScroll();
      if (prevFocus) { prevFocus.focus(); prevFocus = null; }
    }
  });
  // RTL-aware: Drawer side should flip
  let isRtl = $state(false);
  $effect(() => { isRtl = document.dir === 'rtl'; });
  function resolveSide(s: string): string {
    if (!isRtl) return s;
    if (s === 'left') return 'right';
    if (s === 'right') return 'left';
    return s;
  }
  const sideClasses: Record<string, string> = { left: 'left-0', right: 'right-0' };
  const currentSideClass = $derived(sideClasses[resolveSide(side)] || sideClasses[side]);
</script>
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div role="presentation" class={cn('fixed inset-0 z-(--pui-z-overlay) bg-[rgb(0 0 0 / 0.3)]', className)} style={style} onclick={close} transition:fade={{ duration: 200 }}>
    <div {...rest} id={id} role="dialog" aria-modal="true"
      transition:slide={{ duration: 300 }}
      class={cn('fixed top-0 bottom-0 w-full max-w-xs bg-(--pui-surface-base) shadow-(--pui-elevation-3) p-4 overflow-y-auto', currentSideClass)}
      onclick={(e) => e.stopPropagation()} onkeydown={trapFocus}>
      {#if title}<div class="text-lg font-semibold text-(--pui-text-primary) mb-4">{@render title()}</div>{/if}
      <div class="text-sm text-(--pui-text-primary)">{@render children?.()}</div>
      {#if footer}<div class="mt-4 pt-4 border-t border-(--pui-outline-subtle)">{@render footer()}</div>{/if}
    </div>
  </div>
{/if}
