<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { CardProps, CardVariant, CardPadding } from './card.types.js';

  let {
    variant = 'elevated' as CardVariant,
    padding = 'md' as CardPadding,
    interactive = false,
    title,
    children,
    actions,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onClick,
    ...rest
  }: CardProps = $props();

  const attrs = $derived(
    dataAttrs({
      variant,
      padding,
      interactive: interactive || undefined,
    }),
  );

  function handleKeydown(e: KeyboardEvent) {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as MouseEvent);
    }
  }
</script>

{#if interactive}
  <div
    {...rest}
    {...attrs}
    {id}
    role="button"
    tabindex="0"
    class={cn(
      'pui-card pui-card-interactive',
      'relative flex flex-col',
      'bg-(--pui-card-bg,var(--pui-surface-raised))',
      'rounded-(--pui-card-radius,var(--pui-radius-container))',
      'shadow-(--pui-card-elevation,var(--pui-elevation-1))',
      variant === 'filled' && 'shadow-none',
      variant === 'outlined' &&
        'shadow-none border border-(--pui-outline-subtle)',
      variant === 'tonal' &&
        'shadow-none bg-(--pui-color-secondary-container) text-(--pui-color-on-secondary-container)',
      variant === 'flat' && 'shadow-none bg-transparent border border-(--pui-outline-subtle)',
      padding === 'sm' && 'p-(--pui-space-3)',
      padding === 'md' && 'p-(--pui-card-padding,var(--pui-space-4))',
      padding === 'lg' && 'p-(--pui-space-6)',
      className,
    )}
    {style}
    data-testid={dataTestId}
    onclick={onClick}
    onkeydown={handleKeydown}
  >
    <!-- Apple inset highlight（顶部高光描边） -->
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--pui-card-inset-highlight,transparent)]"
    ></span>
    {#if title}
      <div class="relative mb-2">{@render title()}</div>
    {/if}
    {#if children}
      <div class="relative flex-1">{@render children()}</div>
    {/if}
    {#if actions}
      <div class="relative mt-3 flex items-center gap-2">
        {@render actions()}
      </div>
    {/if}
  </div>
{:else}
  <div
    {...rest}
    {...attrs}
    {id}
    class={cn(
      'pui-card',
      'relative flex flex-col',
      'bg-(--pui-card-bg,var(--pui-surface-raised))',
      'rounded-(--pui-card-radius,var(--pui-radius-container))',
      'shadow-(--pui-card-elevation,var(--pui-elevation-1))',
      variant === 'filled' && 'shadow-none',
      variant === 'outlined' &&
        'shadow-none border border-(--pui-outline-subtle)',
      variant === 'tonal' &&
        'shadow-none bg-(--pui-color-secondary-container) text-(--pui-color-on-secondary-container)',
      variant === 'flat' && 'shadow-none bg-transparent border border-(--pui-outline-subtle)',
      padding === 'sm' && 'p-(--pui-space-3)',
      padding === 'md' && 'p-(--pui-card-padding,var(--pui-space-4))',
      padding === 'lg' && 'p-(--pui-space-6)',
      className,
    )}
    {style}
    data-testid={dataTestId}
  >
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--pui-card-inset-highlight,transparent)]"
    ></span>
    {#if title}
      <div class="relative mb-2">{@render title()}</div>
    {/if}
    {#if children}
      <div class="relative flex-1">{@render children()}</div>
    {/if}
    {#if actions}
      <div class="relative mt-3 flex items-center gap-2">
        {@render actions()}
      </div>
    {/if}
  </div>
{/if}
