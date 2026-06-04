<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { IconButtonProps, IconButtonVariant, IconButtonSize } from './icon-button.types.js';

  let {
    variant = 'filled' as IconButtonVariant,
    size = 'md' as IconButtonSize,
    type = 'button' as 'button' | 'submit' | 'reset',
    disabled = false,
    loading = false,
    label,
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onClick,
    ...rest
  }: IconButtonProps = $props();

  const attrs = $derived(dataAttrs({ variant, size, loading: loading || undefined }));
</script>

<button
  {type}
  {...rest}
  {...attrs}
  id={id}
  class={cn(
    'pui-icon-button',
    'pui-state-layer',
    'inline-flex items-center justify-center select-none',
    'min-h-(--pui-hit-target-min,44px) min-w-(--pui-hit-target-min,44px)',
    'transition-all focus-visible:outline-2 focus-visible:outline-offset-2',
    // Size via component token
    'h-(--pui-icon-button-size,40px) w-(--pui-icon-button-size,40px)',
    'rounded-(--pui-icon-button-radius,var(--pui-radius-control))',
    'bg-(--pui-icon-button-bg,var(--pui-color-primary))',
    'text-(--pui-icon-button-fg,var(--pui-color-on-primary))',
    'shadow-(--pui-icon-button-shadow,var(--pui-elevation-1))',
    'border border-(--pui-icon-button-border-color,transparent)',
    // Variants
    variant === 'tonal' && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container) shadow-none',
    variant === 'outlined' && 'bg-transparent text-(--pui-color-primary) border-(--pui-outline) shadow-none',
    variant === 'text' && 'bg-transparent text-(--pui-color-primary) shadow-none border-transparent',
    // Size
    size === 'sm' && 'text-sm h-(--pui-icon-button-size,32px) w-(--pui-icon-button-size,32px)',
    size === 'lg' && 'text-lg h-(--pui-icon-button-size,48px) w-(--pui-icon-button-size,48px)',
    // States
    disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none',
    loading && 'cursor-wait',
    !disabled && 'cursor-pointer',
    className
  )}
  style={style}
  disabled={disabled}
  aria-label={label}
  aria-busy={loading || undefined}
  data-testid={dataTestId}
  onclick={(e) => {
    if (disabled || loading) return;
    onClick?.(e);
  }}
>
  {#if loading}
    <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>
  {/if}
  {@render children?.()}
</button>
