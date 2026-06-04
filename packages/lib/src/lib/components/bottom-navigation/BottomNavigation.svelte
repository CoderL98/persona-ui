<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import type { BottomNavigationProps } from "./bottom-navigation.types.js";

  let {
    value: controlledValue,
    defaultValue,
    items,
    showLabels = true,
    iconsOnly = false,
    "aria-label": ariaLabel = "Bottom navigation",
    onValueChange,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: BottomNavigationProps = $props();

  let internalValue = $state<string | undefined>(untrack(() => defaultValue));
  let active = $derived(controlledValue ?? internalValue ?? items[0]?.id);

  function select(id: string, disabled?: boolean) {
    if (disabled) return;
    if (controlledValue === undefined) internalValue = id;
    onValueChange?.(id);
  }

  function handleKeydown(e: KeyboardEvent, idx: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % items.length;
      (document.getElementById(`${id || 'pui-bnav'}-item-${items[next].id}`) as HTMLElement | null)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + items.length) % items.length;
      (document.getElementById(`${id || 'pui-bnav'}-item-${items[prev].id}`) as HTMLElement | null)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      (document.getElementById(`${id || 'pui-bnav'}-item-${items[0].id}`) as HTMLElement | null)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = items[items.length - 1];
      (document.getElementById(`${id || 'pui-bnav'}-item-${last.id}`) as HTMLElement | null)?.focus();
    }
  }
</script>

<nav
  {id}
  class={cn(
    "pui-bottom-navigation fixed bottom-0 inset-x-0 z-(--pui-z-bottom-nav,30)",
    "flex items-stretch bg-(--pui-surface-base) border-t border-(--pui-outline-subtle)",
    "pb-[env(safe-area-inset-bottom)]",
    className,
  )}
  {style}
  data-testid={dataTestId}
  aria-label={ariaLabel}
>
  {#each items as item, i (item.id)}
    {@const isActive = item.id === active}
    <button
      type="button"
      id={`${id || 'pui-bnav'}-item-${item.id}`}
      role="tab"
      aria-selected={isActive}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={item.disabled}
      tabindex={item.disabled ? -1 : 0}
      disabled={item.disabled}
      onclick={() => select(item.id, item.disabled)}
      onkeydown={(e) => handleKeydown(e, i)}
      class={cn(
        "pui-bottom-nav-item flex-1 flex flex-col items-center justify-center gap-1 px-2 py-2 min-h-12 transition-colors",
        "focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-[-2px]",
        isActive ? "text-(--pui-color-primary)" : "text-(--pui-text-secondary) hover:text-(--pui-text-primary)",
        item.disabled && "opacity-(--pui-opacity-disabled) cursor-not-allowed",
      )}
    >
      <span
        class={cn(
          "pui-bnav-pill relative inline-flex items-center justify-center transition-all",
          isActive && "pui-bnav-pill-active"
        )}
      >
        <span class={cn("w-6 h-6 flex items-center justify-center transition-transform", isActive && "scale-110")}>
          {@render item.icon()}
        </span>
        {#if item.badge !== undefined && item.badge !== null}
          <span
            class="absolute -top-1 -right-2 min-w-4 h-4 px-1 text-[10px] font-semibold rounded-full bg-(--pui-color-error) text-white flex items-center justify-center"
            aria-label={`${item.badge} notifications`}
          >
            {item.badge}
          </span>
        {/if}
      </span>
      {#if showLabels && !iconsOnly}
        <span class="text-xs font-medium truncate max-w-full">{item.label}</span>
      {/if}
    </button>
  {/each}
</nav>
