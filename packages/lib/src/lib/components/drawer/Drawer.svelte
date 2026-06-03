<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { lockScroll, unlockScroll } from '../../internal/scroll-lock.js';
  import { keydown } from '../../internal/click-outside.js';
  import type { DrawerProps, DrawerSide } from './drawer.types.js';
  let { open: controlledOpen, defaultOpen = false, side = 'left' as DrawerSide, closeOnEscape = true, title, children, footer, class: className, style, id, 'data-testid': dataTestId, onOpenChange: onOpenChange, ...rest }: DrawerProps = $props();
  const drawerId = $derived(id || `pui-drawer-${Math.random().toString(36).slice(2,6)}`);
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  function close() { if (controlledOpen === undefined) internalOpen = false; onOpenChange?.(false); }
  // Focus trap
  let prevFocus: HTMLElement | null = null;
  function trapFocus(e: KeyboardEvent) {
    if (!isOpen || e.key !== 'Tab') return;
    const el = document.getElementById(drawerId);
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
    if (typeof document === 'undefined') return;
    if (isOpen) {
      lockScroll();
      prevFocus = document.activeElement as HTMLElement;
      // 给所有非 drawer 的根节点加 inert
      const drawerEl = document.getElementById(drawerId);
      if (drawerEl) {
        for (const child of Array.from(document.body.children)) {
          if (child === drawerEl) continue;
          if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE') continue;
          if (!(child as HTMLElement).hasAttribute('data-persona-drawer-original-inert')) {
            (child as HTMLElement).setAttribute('data-persona-drawer-original-inert', (child as HTMLElement).inert ? 'true' : 'false');
          }
          (child as HTMLElement).inert = true;
        }
        const onIntro = () => {
          const focusable = Array.from(drawerEl.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
            .filter(el => !el.hasAttribute('disabled'));
          if (focusable.length > 0) focusable[0].focus();
          else drawerEl.focus();
        };
        drawerEl.addEventListener('transitionend', onIntro, { once: true });
        setTimeout(onIntro, 350);
      }
    } else {
      unlockScroll();
      for (const child of Array.from(document.body.children)) {
        const wasInert = (child as HTMLElement).getAttribute('data-persona-drawer-original-inert');
        if (wasInert !== null) {
          (child as HTMLElement).inert = wasInert === 'true';
          (child as HTMLElement).removeAttribute('data-persona-drawer-original-inert');
        }
      }
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
  const keyBindings = $derived<Record<string, (e: KeyboardEvent) => void>>(
    closeOnEscape ? { Escape: () => close() } : {},
  );
</script>
<svelte:document use:keydown={keyBindings} />
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div role="presentation" class={cn('fixed inset-0 z-(--pui-z-overlay) bg-[rgb(0 0 0 / 0.3)]', className)} style={style} onclick={close} transition:fade={{ duration: 200 }}>
    <div {...rest} id={drawerId} role="dialog" aria-modal="true"
      transition:slide={{ duration: 300 }}
      class={cn('fixed top-0 bottom-0 w-full max-w-xs bg-(--pui-surface-base) shadow-(--pui-elevation-3) p-4 overflow-y-auto', currentSideClass)}
      onclick={(e) => e.stopPropagation()} onkeydown={trapFocus}>
      {#if title}<div class="text-lg font-semibold text-(--pui-text-primary) mb-4">{@render title()}</div>{/if}
      <div class="text-sm text-(--pui-text-primary)">{@render children?.()}</div>
      {#if footer}<div class="mt-4 pt-4 border-t border-(--pui-outline-subtle)">{@render footer()}</div>{/if}
    </div>
  </div>
{/if}

