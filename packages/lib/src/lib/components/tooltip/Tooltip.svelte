<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { fade } from 'svelte/transition';
  import type { TooltipProps, TooltipPlacement } from './tooltip.types.js';
  let { content, placement = 'bottom' as TooltipPlacement, delay = 400, disabled = false, children, class: className, style, id, 'data-testid': dataTestId }: TooltipProps = $props();
  let visible = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  // RTL: left/right placement names flip in RTL — consumers pass correct placement
  const placementStyles: Record<string, { tooltip: string; arrow: string }> = {
    top: { tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2', arrow: 'top-full left-1/2 -translate-x-1/2 border-t-(--pui-surface-raised)' },
    bottom: { tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2', arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-(--pui-surface-raised)' },
    left: { tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2', arrow: 'left-full top-1/2 -translate-y-1/2 border-l-(--pui-surface-raised)' },
    right: { tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2', arrow: 'right-full top-1/2 -translate-y-1/2 border-r-(--pui-surface-raised)' },
  };
  const ps = $derived(placementStyles[placement]);
  let _autoId = $props.id();
  const tooltipId = $derived(id ?? _autoId);
  function show() { if (!disabled) { clearTimeout(timer); timer = setTimeout(() => { visible = true; }, delay); } }
  function hide() { clearTimeout(timer); visible = false; }
  function toggleTouch(e: Event) { if (!disabled) { e.preventDefault(); visible = !visible; } }

  const isStringContent = $derived(typeof content === 'string');
</script>
<span role="presentation" class={cn('pui-tooltip-wrapper relative inline-flex', className)} style={style} data-testid={dataTestId}
  onmouseenter={show} onmouseleave={hide} onfocusin={show} onfocusout={hide} ontouchstart={toggleTouch} aria-describedby={visible ? tooltipId : undefined}>
  <span class="contents">{@render children?.()}</span>
  {#if visible}
    <span id={tooltipId} role="tooltip" transition:fade={{ duration: 150 }}
      class={cn('absolute z-(--pui-z-overlay) pointer-events-none whitespace-nowrap rounded-(--pui-radius-control) px-2 py-1 text-xs font-medium shadow-(--pui-elevation-2) bg-(--pui-surface-raised) text-(--pui-text-primary) border border-(--pui-outline-subtle)', ps.tooltip)}>
      {#if isStringContent}
        {content}
      {:else}
        {@render (content as any)()}
      {/if}
      <span class={cn('absolute w-0 h-0 border-4 border-transparent', ps.arrow)}></span>
    </span>
  {/if}
</span>
