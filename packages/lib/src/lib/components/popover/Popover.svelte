<script lang="ts">
  import { untrack } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import type { PopoverProps, PopoverPlacement } from './popover.types.js';
  let { open: controlledOpen, defaultOpen = false, placement = 'bottom' as PopoverPlacement, modal = false, trigger, children, class: className, style, id, 'data-testid': dataTestId, onopenchange }: PopoverProps = $props();
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);

  function toggle(e: Event) { e.stopPropagation(); const next = !isOpen; if (controlledOpen === undefined) internalOpen = next; onopenchange?.(next); }
  function open(e: Event) { e.stopPropagation(); if (controlledOpen === undefined) internalOpen = true; onopenchange?.(true); }
  function close() { if (controlledOpen === undefined) internalOpen = false; onopenchange?.(false); }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
  }

  // RTL-aware placement
  let isRtl = $state(false);
  $effect(() => { isRtl = document.dir === 'rtl'; });
  function resolvePlacement(p: string): string {
    if (!isRtl) return p;
    if (p === 'left') return 'right';
    if (p === 'right') return 'left';
    if (p === 'bottom-start') return 'bottom-end';
    if (p === 'bottom-end') return 'bottom-start';
    return p;
  }
  const resolvedPlacement = $derived(resolvePlacement(placement));
</script>

<svelte:window onkeydown={handleKeydown} />
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div role="presentation" class={cn('pui-popover relative inline-flex', className)} style={style} data-testid={dataTestId}
  onclick={(e) => e.stopPropagation()}
  use:clickOutside={() => { if (isOpen && !modal) close(); }}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <span class="inline-flex" onclick={toggle} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } }} role="button" tabindex={0} aria-expanded={isOpen} aria-haspopup="dialog">
    {@render trigger?.()}
  </span>
  {#if isOpen}
    <div transition:scale={{ start: 0.95, duration: 150 }}
      class={cn('absolute z-(--pui-z-overlay) mt-1 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle) p-2 min-w-[160px]',
      resolvedPlacement === 'top' && 'bottom-full mb-2', resolvedPlacement === 'bottom' && 'top-full mt-2',
      resolvedPlacement === 'left' && 'right-full mr-2 top-1/2 -translate-y-1/2', resolvedPlacement === 'right' && 'left-full ml-2 top-1/2 -translate-y-1/2',
      resolvedPlacement === 'bottom-start' && 'top-full mt-2 left-0', resolvedPlacement === 'bottom-end' && 'top-full mt-2 right-0')}
      role="dialog" aria-modal={modal ? 'true' : undefined}>
      {@render children?.()}
    </div>
  {/if}
</div>
