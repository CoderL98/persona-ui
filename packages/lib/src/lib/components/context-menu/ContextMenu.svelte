<script lang="ts">
  import { untrack } from "svelte";
  import { scale } from "svelte/transition";
  import { cn } from "../../internal/class.js";
  import { clickOutside, keydown } from "../../internal/click-outside.js";
  import { uniqueId } from "../../internal/id.js";
  import type { ContextMenuProps, ContextMenuItem } from "./context-menu.types.js";

  let {
    open: controlledOpen,
    position = { x: 0, y: 0 },
    items,
    closeOnSelect = true,
    "aria-label": ariaLabel = "Context menu",
    onOpenChange,
    class: className,
    id,
    "data-testid": dataTestId,
  }: ContextMenuProps = $props();

  let internalOpen = $state(untrack(() => controlledOpen ?? false));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let activeIndex = $state(-1);

  const menuId = $derived(id || uniqueId('pui-ctx'));

  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  function selectItem(item: ContextMenuItem) {
    if (item.disabled || item.separator) return;
    item.onSelect?.();
    if (closeOnSelect) close();
  }

  function handleKey(e: KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(items.length - 1, activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(0, activeIndex - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) selectItem(items[activeIndex]);
    }
  }

  const keyBindings = $derived<Record<string, (e: KeyboardEvent) => void>>(
    isOpen ? { Escape: () => close() } : {},
  );

  const flatItems = $derived(items.filter((i) => !i.separator));
  $effect(() => {
    if (isOpen && activeIndex < 0) {
      activeIndex = flatItems.findIndex((i) => !i.disabled);
    }
  });
</script>

<svelte:document use:keydown={keyBindings} />

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-(--pui-z-modal)"
    data-testid={dataTestId}
  >
    <div
      role="menu"
      {id}
      aria-label={ariaLabel}
      aria-orientation="vertical"
      class={cn(
        "pui-context-menu fixed min-w-48 p-1 rounded-(--pui-radius-container) bg-(--pui-surface-base) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle)",
        "text-sm",
        className,
      )}
      style="left: {position.x}px; top: {position.y}px;"
      transition:scale={{ start: 0.95, duration: 100 }}
      onclick={(e) => e.stopPropagation()}
      onkeydown={handleKey}
      use:clickOutside={() => close()}
      tabindex={-1}
    >
      {#each items as item, i (item.id ?? i)}
        {#if item.separator}
          <div role="separator" class="my-1 border-t border-(--pui-outline-subtle)"></div>
        {:else}
          {@const isActive = i === activeIndex}
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            tabindex={-1}
            class={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 text-left rounded-(--pui-radius-control) transition-colors",
              "focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-[-2px]",
              isActive && "bg-(--pui-surface-variant)",
              item.disabled && "opacity-(--pui-opacity-disabled) cursor-not-allowed",
              item.destructive && "text-(--pui-color-error)",
              !item.destructive && !item.disabled && "text-(--pui-text-primary)",
            )}
            onclick={() => selectItem(item)}
            onmouseenter={() => { activeIndex = i; }}
          >
            {#if item.icon}
              <span class="shrink-0 w-4 h-4 inline-flex items-center justify-center">
                {@render item.icon()}
              </span>
            {:else}
              <span class="w-4 shrink-0"></span>
            {/if}
            <span class="flex-1 truncate">{item.label}</span>
            {#if item.shortcut}
              <kbd class="text-xs text-(--pui-text-disabled) font-mono">{item.shortcut}</kbd>
            {/if}
          </button>
        {/if}
      {/each}
    </div>
  </div>
{/if}
