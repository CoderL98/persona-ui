<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { VirtualListProps } from "./virtual-list.types.js";

  let {
    itemCount,
    itemHeight,
    height,
    overscan = 3,
    "aria-label": ariaLabel,
    item,
    onRangeChange,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: VirtualListProps = $props();

  let scrollTop = $state(0);
  let viewport: HTMLDivElement | undefined = $state();

  const totalHeight = $derived(itemCount * itemHeight);

  const visibleRange = $derived.by(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(height / itemHeight) + overscan * 2;
    const end = Math.min(itemCount, start + visibleCount);
    return { start, end };
  });

  const offsetY = $derived(visibleRange.start * itemHeight);

  $effect(() => {
    onRangeChange?.(visibleRange);
  });

  function handleScroll(e: Event) {
    scrollTop = (e.target as HTMLDivElement).scrollTop;
  }

  // Reset scroll on itemCount change
  let lastItemCount: number | undefined = $state();
  $effect(() => {
    if (lastItemCount !== undefined && lastItemCount !== itemCount && viewport) {
      viewport.scrollTop = 0;
      scrollTop = 0;
    }
    lastItemCount = itemCount;
  });

  const items = $derived(
    Array.from({ length: visibleRange.end - visibleRange.start }, (_, i) => visibleRange.start + i),
  );
</script>

<div
  {id}
  class={cn("pui-virtual-list overflow-y-auto relative", className)}
  {style}
  data-testid={dataTestId}
  aria-label={ariaLabel}
  bind:this={viewport}
  onscroll={handleScroll}
>
  <div style="height:{totalHeight}px;position:relative;">
    <div style="transform:translateY({offsetY}px);">
      {#each items as index (index)}
        {@const itemStyle = `height:${itemHeight}px;`}
        {@render item({ index, style: itemStyle })}
      {/each}
    </div>
  </div>
</div>
