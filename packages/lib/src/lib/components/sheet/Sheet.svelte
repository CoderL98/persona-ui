<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { lockScroll, unlockScroll } from '../../internal/scroll-lock.js';
  import type { SheetProps, SheetSide } from './sheet.types.js';
  type SheetTexts = { close: string };
  let { open: controlledOpen, defaultOpen = false, side = 'bottom' as SheetSide, title, children, footer, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, onopenchange, ...rest }: SheetProps = $props();
  const defaults: SheetTexts = { close: 'Close' };
  const t = $derived({ ...defaults, ...localTexts });
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  const sheetId = $derived(id || `pui-sheet-${Math.random().toString(36).slice(2,6)}`);
  function close() { if (controlledOpen === undefined) internalOpen = false; onopenchange?.(false); }
  // Focus trap
  let prevFocus: HTMLElement | null = null;
  function getFocusable(el: HTMLElement): HTMLElement[] {
    return Array.from(el.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
  }
  function trapFocus(e: KeyboardEvent) {
    if (!isOpen || e.key !== 'Tab') return;
    const el = document.getElementById(sheetId);
    if (!el) return;
    const focusable = getFocusable(el);
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
      requestAnimationFrame(() => { document.getElementById(sheetId)?.focus(); });
    } else {
      unlockScroll();
      if (prevFocus) { prevFocus.focus(); prevFocus = null; }
    }
  });
  // RTL-aware: Sheet side should flip
  let isRtl = $state(false);
  $effect(() => { isRtl = document.dir === 'rtl'; });
  function resolveSide(s: string): string {
    if (!isRtl) return s;
    if (s === 'left') return 'right';
    if (s === 'right') return 'left';
    if (s === 'bottom-start') return 'bottom-end';
    if (s === 'bottom-end') return 'bottom-start';
    return s;
  }
  const sideClasses: Record<string, string> = {
    top: 'top-0 left-0 right-0 max-h-[60vh] rounded-b-[var(--pui-radius-container)]',
    right: 'top-0 right-0 bottom-0 w-full max-w-sm rounded-l-[var(--pui-radius-container)]',
    bottom: 'bottom-0 left-0 right-0 max-h-[60vh] rounded-t-[var(--pui-radius-container)]',
    left: 'top-0 left-0 bottom-0 w-full max-w-sm rounded-r-[var(--pui-radius-container)]',
  };
  const currentSide = $derived(resolveSide(side));
  const currentSideClass = $derived(sideClasses[currentSide] || sideClasses[side]);
</script>
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div role="presentation" class={cn('fixed inset-0 z-(--pui-z-modal) bg-[rgb(0 0 0 / 0.4)]', className)} style={style} onclick={close} transition:fade={{ duration: 200 }}>
    <div {...rest} id={sheetId} role="dialog" aria-modal="true"
      transition:slide={{ duration: 300 }}
      class={cn('fixed bg-(--pui-surface-base) shadow-(--pui-elevation-3) p-6 overflow-y-auto', currentSideClass)}
      onclick={(e) => e.stopPropagation()} onkeydown={trapFocus}>
      <div class="flex items-start justify-between mb-4">
        {#if title}<h2 class="text-lg font-semibold text-(--pui-text-primary)">{@render title()}</h2>{/if}
        <button type="button" aria-label={t.close} class="text-(--pui-text-secondary) hover:text-(--pui-text-primary)" onclick={close}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="text-sm text-(--pui-text-primary)">{@render children?.()}</div>
      {#if footer}<div class="mt-6 flex items-center justify-end gap-3">{@render footer()}</div>{/if}
    </div>
  </div>
{/if}
