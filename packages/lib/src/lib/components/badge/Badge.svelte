<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { BadgeProps, BadgeTone, BadgeSize } from './badge.types.js';

  let {
    tone = 'neutral' as BadgeTone,
    size = 'md' as BadgeSize,
    dot = false,
    count,
    max = 99,
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    ...rest
  }: BadgeProps = $props();

  const displayCount = $derived(
    count !== undefined
      ? count > max
        ? `${max}+`
        : String(count)
      : undefined
  );

  const isDot = $derived(dot || (count !== undefined && count < 1));

  const attrs = $derived(dataAttrs({ tone, size, dot: isDot || undefined }));
</script>

<span
  {...rest}
  {...attrs}
  id={id}
  class={cn(
    'pui-badge',
    'inline-flex items-center justify-center font-medium whitespace-nowrap select-none',
    // Dot mode
    isDot ? 'rounded-full' : 'rounded-(--pui-badge-radius,999px)',
    isDot
      ? 'h-(--pui-badge-dot-size,8px) w-(--pui-badge-dot-size,8px) p-0'
      : 'h-(--pui-badge-height,20px) px-(--pui-badge-padding-x,var(--pui-space-1))',
    // Tone token mapping — fallback uses neutral
    tone === 'neutral' && 'bg-(--pui-badge-bg,var(--pui-surface-variant)) text-(--pui-badge-fg,var(--pui-text-secondary))',
    tone === 'primary' && 'bg-(--pui-color-primary) text-(--pui-color-on-primary)',
    tone === 'success' && 'bg-(--pui-color-tertiary) text-(--pui-color-on-primary)',
    tone === 'warning' && !isDot && 'bg-(--pui-apple-system-yellow,oklch(0.7 0.18 90)) text-(--pui-ref-gray-90)',
    tone === 'error' && 'bg-(--pui-color-error) text-(--pui-color-on-error)',
    // Size
    size === 'sm' && 'text-[10px]',
    size === 'md' && 'text-xs',
    // If no children and no count, still show dot
    !children && count === undefined && dot === false && 'h-(--pui-badge-dot-size,8px) w-(--pui-badge-dot-size,8px) rounded-full',
    className
  )}
  style={style}
  data-testid={dataTestId}
>
  {#if !isDot}
    {#if displayCount}
      {displayCount}
    {:else}
      {@render children?.()}
    {/if}
  {/if}
</span>
