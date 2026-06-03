<script lang="ts">
  import { untrack } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import type { MenuProps, MenuItem } from './menu.types.js';
  let { open: controlledOpen, defaultOpen = false, items = [], trigger, children, class: className, style, id, 'data-testid': dataTestId, onSelect, onOpenChange }: MenuProps = $props();
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let activeIndex = $state(-1);
  const activeItems = $derived(items.filter(i => !i.disabled));

  function toggle(e: Event) { e.stopPropagation(); const next = !isOpen; if (controlledOpen === undefined) internalOpen = next; onOpenChange?.(next); if (next) activeIndex = -1; }
  function close() { if (controlledOpen === undefined) internalOpen = false; onOpenChange?.(false); activeIndex = -1; }

  function selectItem(id: string) {
    onSelect?.(id); close();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen) { if (controlledOpen === undefined) internalOpen = true; onOpenChange?.(true); return; } activeIndex = activeIndex < activeItems.length - 1 ? activeIndex + 1 : 0; }
    if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = activeIndex > 0 ? activeIndex - 1 : activeItems.length - 1; }
    if (e.key === 'Enter' && isOpen && activeIndex >= 0) { e.preventDefault(); selectItem(activeItems[activeIndex].id); }
    if (e.key === 'Escape') { e.preventDefault(); close(); }
  }
</script>

<svelte:window onkeydown={handleKeydown} />
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div role="presentation" class={cn('pui-menu relative inline-flex', className)} style={style} data-testid={dataTestId}
  onclick={(e) => e.stopPropagation()}
  use:clickOutside={() => { if (isOpen) close(); }}>
  <span class="inline-flex" role="button" tabindex={0} aria-expanded={isOpen} aria-haspopup="menu"
    onclick={toggle} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } }}>
    {@render trigger?.()}
  </span>
  {#if isOpen}
    <div role="menu" tabindex="-1" transition:scale={{ start: 0.95, duration: 150 }}
      class={cn('absolute z-(--pui-z-overlay) mt-1 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle) py-1 min-w-45 right-0')} onclick={(e) => e.stopPropagation()} onkeydown={handleKeydown}>
      {#if items.length > 0}
        {#each activeItems as item, idx}
          <div role="menuitem" tabindex={idx === activeIndex ? 0 : -1} aria-disabled={item.disabled || undefined}
            class={cn('flex items-center justify-between px-3 py-1.5 text-sm cursor-pointer transition-colors',
              idx === activeIndex && 'bg-(--pui-surface-variant)',
              item.destructive && 'text-(--pui-color-error)',
              item.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none')}
            onclick={() => { if (!item.disabled) selectItem(item.id); }}
            onkeydown={(e) => { if (!item.disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectItem(item.id); } }}
            onmouseenter={() => { activeIndex = idx; }}>
            <span>{item.label}</span>
            {#if item.shortcut}<span class="text-xs text-(--pui-text-disabled) ml-4">{item.shortcut}</span>{/if}
          </div>
        {/each}
      {:else}
        {@render children?.()}
      {/if}
    </div>
  {/if}
</div>
