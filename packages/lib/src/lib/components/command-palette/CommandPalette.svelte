<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { lockScroll, unlockScroll } from '../../internal/scroll-lock.js';
  import type { CommandPaletteProps, CommandItem } from './command-palette.types.js';
  type CommandPaletteTexts = { placeholder: string; emptyText: string; close: string };
  let { open: controlledOpen, defaultOpen = false, items = [], placeholder, emptyText, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, onSelect, onOpenChange: onOpenChange }: CommandPaletteProps = $props();
  const defaults: CommandPaletteTexts = { placeholder: 'Type a command…', emptyText: 'No results found.', close: 'Close' };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.placeholder);
  const resolvedEmptyText = $derived(emptyText ?? t.emptyText);
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let query = $state('');
  let activeIndex = $state(0);
  const filtered = $derived(query ? items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())) : items);
  function handleInput(e: Event) { query = (e.target as HTMLInputElement).value; activeIndex = 0; }
  function close() { if (controlledOpen === undefined) internalOpen = false; onOpenChange?.(false); }
  function selectItem(id: string) { onSelect?.(id); close(); }
  $effect(() => {
    if (isOpen) lockScroll(); else unlockScroll();
  });
</script>
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div role="presentation" class="fixed inset-0 z-(--pui-z-modal) flex items-start justify-center pt-[15vh] bg-[rgb(0 0 0 / 0.4)]" onclick={close} transition:fade={{ duration: 200 }}>
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div role="presentation" class="w-full max-w-lg bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) overflow-hidden" onclick={(e) => e.stopPropagation()}
      transition:scale={{ start: 0.95, duration: 200 }}>
      <div class="flex items-center gap-2 border-b border-(--pui-outline-subtle) px-4">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" class="shrink-0 text-(--pui-text-disabled)"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 12l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input type="text" value={query} placeholder={resolvedPlaceholder} oninput={handleInput}
          class="w-full bg-transparent py-3 text-sm outline-none text-(--pui-text-primary) placeholder:text-(--pui-text-disabled)" />
        <button type="button" aria-label={t.close} onclick={close} class="text-(--pui-text-secondary) hover:text-(--pui-text-primary)"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
      </div>
      <div class="max-h-75 overflow-y-auto p-2">
        {#if filtered.length > 0}
          {#each filtered as item, i}
            <button type="button" data-active={i === activeIndex || undefined}
              class={cn('flex w-full items-center gap-3 rounded-(--pui-radius-control) px-3 py-2 text-left text-sm transition-colors',
                i === activeIndex && 'bg-(--pui-surface-variant)',
                item.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none')}
              onclick={() => { if (!item.disabled) selectItem(item.id); }}
              onmouseenter={() => activeIndex = i}>
              <div class="flex-1 min-w-0"><div class="font-medium text-(--pui-text-primary) truncate">{item.label}</div>{#if item.description}<div class="text-xs text-(--pui-text-secondary) truncate">{item.description}</div>{/if}</div>
              {#if item.shortcut}<span class="text-xs text-(--pui-text-disabled)">{item.shortcut}</span>{/if}
            </button>
          {/each}
        {:else}
          <p class="py-8 text-center text-sm text-(--pui-text-secondary)">{resolvedEmptyText}</p>
        {/if}
      </div>
    </div>
  </div>
{/if}
