<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import type { PaginationProps } from "./pagination.types.js";

  let {
    value: controlledValue,
    defaultValue = 1,
    total,
    siblingCount = 1,
    showEdges = true,
    showJumpTo = false,
    disabled = false,
    "aria-label": ariaLabel = "Pagination",
    onValueChange,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: PaginationProps = $props();

  let internalValue = $state(untrack(() => defaultValue));
  let currentPage = $derived(controlledValue ?? internalValue);
  const paginationId = $derived(id || `pui-pagination-${Math.random().toString(36).slice(2, 6)}`);

  // Build page items with ellipses
  const items = $derived.by((): (number | "ellipsis")[] => {
    if (total <= 1) return [];
    // 小页数时直接展示所有页
    const MAX_DIRECT = 7;
    if (total <= MAX_DIRECT) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const result: (number | "ellipsis")[] = [];
    const first = 1;
    const last = total;
    const cur = currentPage;
    const leftSibling = Math.max(first + 1, cur - siblingCount);
    const rightSibling = Math.min(last - 1, cur + siblingCount);

    if (showEdges) result.push(first);
    if (leftSibling > first + 1) result.push("ellipsis");
    for (let p = leftSibling; p <= rightSibling; p++) result.push(p);
    if (rightSibling < last - 1) result.push("ellipsis");
    if (showEdges) result.push(last);
    return result;
  });

  function setPage(p: number) {
    if (disabled) return;
    if (p < 1 || p > total || p === currentPage) return;
    if (controlledValue === undefined) internalValue = p;
    onValueChange?.(p);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPage(currentPage - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPage(currentPage + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setPage(1);
    } else if (e.key === "End") {
      e.preventDefault();
      setPage(total);
    }
  }

  function handleJumpSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.querySelector<HTMLInputElement>('input[type="number"]');
    if (input) {
      const p = parseInt(input.value, 10);
      if (!Number.isNaN(p)) setPage(p);
      input.value = "";
    }
  }
</script>

<nav
  {id}
  class={cn("pui-pagination flex items-center gap-1", className)}
  {style}
  data-testid={dataTestId}
  aria-label={ariaLabel}
  onkeydown={handleKeydown}
  tabindex="-1"
>
  <button
    type="button"
    aria-label="Previous page"
    disabled={disabled || currentPage === 1}
    class="pui-pagination__nav shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-(--pui-radius-control) text-(--pui-text-secondary) hover:bg-(--pui-surface-variant) hover:text-(--pui-text-primary) disabled:opacity-(--pui-opacity-disabled) disabled:pointer-events-none transition-colors"
    onclick={() => setPage(currentPage - 1)}
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 3l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  {#each items as item, i (i + '-' + (item === 'ellipsis' ? 'e' : item))}
    {#if item === "ellipsis"}
      <span class="px-2 text-(--pui-text-disabled)" aria-hidden="true">…</span>
    {:else}
      <button
        type="button"
        aria-label={`Page ${item}`}
        aria-current={item === currentPage ? "page" : undefined}
        disabled={disabled}
        class={cn(
          "shrink-0 inline-flex items-center justify-center min-w-8 h-8 px-2 text-sm rounded-(--pui-radius-control) transition-colors",
          item === currentPage
            ? "bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium"
            : "text-(--pui-text-primary) hover:bg-(--pui-surface-variant)",
          disabled && "opacity-(--pui-opacity-disabled) pointer-events-none",
        )}
        onclick={() => setPage(item)}
      >
        {item}
      </button>
    {/if}
  {/each}

  <button
    type="button"
    aria-label="Next page"
    disabled={disabled || currentPage === total}
    class="pui-pagination__nav shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-(--pui-radius-control) text-(--pui-text-secondary) hover:bg-(--pui-surface-variant) hover:text-(--pui-text-primary) disabled:opacity-(--pui-opacity-disabled) disabled:pointer-events-none transition-colors"
    onclick={() => setPage(currentPage + 1)}
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  {#if showJumpTo}
    <form class="ml-2 flex items-center gap-1" onsubmit={handleJumpSubmit}>
      <label for={`${paginationId}-jump`} class="text-xs text-(--pui-text-secondary)">Go to</label>
      <input
        id={`${paginationId}-jump`}
        type="number"
        min="1"
        max={total}
        {disabled}
        class="w-12 h-8 text-sm text-center bg-(--pui-field-bg,var(--pui-surface-base)) border border-(--pui-outline) rounded-(--pui-radius-control) focus:border-(--pui-color-primary) focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-1"
      />
    </form>
  {/if}
</nav>
