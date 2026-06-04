<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { ChipProps, ChipVariant, ChipTone } from './chip.types.js';

  let {
    variant = 'filled' as ChipVariant,
    tone = 'neutral' as ChipTone,
    selected = false,
    disabled = false,
    removable = false,
    children,
    leading,
    trailing,
    texts: localTexts,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onClick,
    onRemove,
    ...rest
  }: ChipProps = $props();

  type ChipTexts = { remove: string };
  const defaults: ChipTexts = { remove: 'Remove' };
  const t = $derived({ ...defaults, ...localTexts });

  const attrs = $derived(
    dataAttrs({ variant, tone, selected: selected || undefined, disabled }),
  );
</script>

<div
  role="button"
  tabindex={disabled ? -1 : 0}
  {...rest}
  {...attrs}
  {id}
  class={cn(
    'pui-chip',
    'pui-state-layer',
    'inline-flex items-center gap-(--pui-chip-gap,var(--pui-space-1)) select-none',
    'transition-all focus-visible:outline-2 focus-visible:outline-offset-2',
    'min-h-(--pui-hit-target-min,44px)',
    'rounded-(--pui-chip-radius,999px)',
    'px-(--pui-chip-padding-x,var(--pui-space-3))',
    'text-sm font-medium',
    // Variant styles
    variant === 'filled' &&
      'bg-(--pui-chip-bg,var(--pui-surface-variant)) text-(--pui-chip-fg,var(--pui-text-primary))',
    variant === 'outlined' &&
      'bg-transparent text-(--pui-chip-fg,var(--pui-text-primary)) border border-(--pui-outline)',
    variant === 'text' &&
      'bg-transparent text-(--pui-chip-fg,var(--pui-text-primary)) shadow-none border-transparent',
    // Selected
    selected &&
      variant === 'filled' &&
      'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
    selected &&
      variant === 'outlined' &&
      'border-(--pui-color-primary) text-(--pui-color-primary)',
    // Tone
    tone === 'primary' && 'text-(--pui-color-primary)',
    tone === 'success' && 'text-(--pui-color-tertiary)',
    tone === 'error' && 'text-(--pui-color-error)',
    // States
    disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none',
    !disabled && 'cursor-pointer',
    className,
  )}
  {style}
  aria-disabled={disabled || undefined}
  data-testid={dataTestId}
  onclick={(e) => {
    if (disabled) return;
    onClick?.(e);
  }}
  onkeydown={(e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as MouseEvent);
    }
  }}
>
  {#if leading}
    <span class="shrink-0">{@render leading()}</span>
  {/if}
  <span class="truncate">{@render children?.()}</span>
  {#if trailing}
    <span class="shrink-0">{@render trailing()}</span>
  {/if}
  {#if removable}
    <button
      type="button"
      class="ml-(--pui-chip-gap,var(--pui-space-1)) inline-flex h-5 w-5 items-center justify-center
             rounded-full transition-colors
             text-(--pui-text-secondary) hover:bg-(--pui-surface-variant) hover:text-(--pui-text-primary)
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pui-color-primary)"
       aria-label={t.remove}
      tabindex={removable ? 0 : -1}
      onclick={(e) => {
        e.stopPropagation();
        if (disabled) return;
        onRemove?.(e);
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 3l6 6M9 3l-6 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  {/if}
</div>
