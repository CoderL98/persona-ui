<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type {
    ButtonProps,
    ButtonVariant,
    ButtonSize,
  } from './button.types.js';

  let {
    variant = 'filled' as ButtonVariant,
    size = 'md' as ButtonSize,
    type = 'button' as 'button' | 'submit' | 'reset',
    disabled = false,
    loading = false,
    fullWidth = false,
    children,
    leading,
    trailing,
    class: className,
    style,
    id,
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
    onClick,
    ...rest
  }: ButtonProps = $props();

  const attrs = $derived(
    dataAttrs({ variant, size, loading: loading || undefined }),
  );
</script>

<button
  {type}
  {...rest}
  {...attrs}
  {id}
  class={cn(
    'pui-button',
    // 0A.2.5 Minimum hit target (44px)
    'min-h-(--pui-hit-target-min,44px) min-w-(--pui-hit-target-min,44px)',
    fullWidth && 'w-full',
    // 0A.3.6 Material state layer
    'pui-state-layer',
    // Base layout
    'inline-flex items-center justify-center font-medium select-none',
    // Apple: spring transition (transform + background)；Material: focus on color
    'transition-[background-color,box-shadow,transform] focus-visible:outline-2 focus-visible:outline-offset-2',
    'duration-(--pui-duration-swap,180ms) ease-[var(--pui-motion-spring,cubic-bezier(0.2,0.8,0.2,1))]',
    'gap-(--pui-button-gap,var(--pui-space-2))',
    // Apply component tokens via var()
    'bg-(--pui-button-bg,var(--pui-color-primary))',
    'text-(--pui-button-fg,var(--pui-color-on-primary))',
    'rounded-(--pui-button-radius,var(--pui-radius-control))',
    'shadow-(--pui-button-shadow,var(--pui-elevation-1))',
    // Border
    'border',
    'border-(--pui-button-border-color,transparent)',
    // Size presets
    'px-(--pui-button-padding-x,var(--pui-space-4))',
    'py-(--pui-button-padding-y,var(--pui-space-2))',
    // 0A.3.7 variants: filled | elevated | tonal | outlined | text
    variant === 'tonal' &&
      'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container) shadow-none',
    variant === 'elevated' && 'shadow-(--pui-elevation-2)',
    variant === 'outlined' &&
      'bg-transparent text-(--pui-color-primary) border-(--pui-outline) shadow-none',
    variant === 'text' &&
      'bg-transparent text-(--pui-color-primary) shadow-none border-transparent',
    // Size
    size === 'sm' && 'text-sm px-(--pui-space-3) py-(--pui-space-1)',
    size === 'lg' && 'text-lg px-(--pui-space-6) py-(--pui-space-3)',
    // States
    disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none',
    loading && 'cursor-wait',
    !disabled && 'cursor-pointer',
    className,
  )}
  {style}
  {disabled}
  aria-label={ariaLabel}
  aria-busy={loading || undefined}
  data-testid={dataTestId}
  onclick={(e) => {
    if (disabled || loading) return;
    onClick?.(e);
  }}
>
  {#if loading}
    <span
      class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    ></span>
  {/if}
  {@render leading?.()}
  {@render children?.()}
  {@render trailing?.()}
</button>
