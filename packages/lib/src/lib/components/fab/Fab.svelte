<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { triggerHaptic } from '../../internal/haptics.js';
  import type { FabProps, FabVariant, FabSize } from './fab.types.js';

  let {
    variant = 'primary' as FabVariant,
    size = 'regular' as FabSize,
    label,
    extendedLabel,
    disabled = false,
    loading = false,
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onClick,
    ...rest
  }: FabProps = $props();

  let _autoId = $props.id();
  const fabId = $derived(id ?? _autoId);

  const attrs = $derived(dataAttrs({ variant, size, loading: loading || undefined }));
</script>

<button
  {...rest}
  {...attrs}
  id={fabId}
  class={cn(
    'pui-fab',
    'pui-state-layer',
    'inline-flex items-center justify-center gap-(--pui-space-2)',
    'select-none transition-shadow',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'shadow-(--pui-elevation-3) hover:shadow-(--pui-elevation-4)',
    'min-h-(--pui-hit-target-min,44px) min-w-(--pui-hit-target-min,44px)',
    // Size（MD3 标准）
    size === 'small' && 'h-(--pui-fab-size-small,40px) min-w-(--pui-fab-size-small,40px) px-3 text-sm',
    size === 'regular' && 'h-(--pui-fab-size-regular,56px) min-w-(--pui-fab-size-regular,56px) px-5 text-base',
    size === 'large' && 'h-(--pui-fab-size-large,96px) min-w-(--pui-fab-size-large,96px) px-6 text-lg',
    // MD3 FAB 永远 16px 圆角（large 除外，large 用 28px）
    size !== 'large' && 'rounded-(--pui-md-sys-shape-corner-large,16px)',
    size === 'large' && 'rounded-(--pui-md-sys-shape-corner-extra-large,28px)',
    // Variants
    variant === 'surface' && 'bg-(--pui-md-sys-color-surface-container-high) text-(--pui-md-sys-color-primary)',
    variant === 'primary' && 'bg-(--pui-md-sys-color-primary-container) text-(--pui-md-sys-color-on-primary-container)',
    variant === 'secondary' && 'bg-(--pui-md-sys-color-secondary-container) text-(--pui-md-sys-color-on-secondary-container)',
    variant === 'tertiary' && 'bg-(--pui-md-sys-color-tertiary-container) text-(--pui-md-sys-color-on-tertiary-container)',
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
    triggerHaptic('medium');
    onClick?.(e);
  }}
>
  {#if loading}
    <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>
  {:else}
    {@render children?.()}
  {/if}
  {#if extendedLabel && size === 'large'}
    <span class="font-medium">{extendedLabel}</span>
  {/if}
</button>
