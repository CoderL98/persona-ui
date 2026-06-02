<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { DividerProps, DividerOrientation } from './divider.types.js';

  let {
    orientation = 'horizontal' as DividerOrientation,
    inset = false,
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    ...rest
  }: DividerProps = $props();
</script>

{#if children}
  <div
    {...rest}
    id={id}
    class={cn(
      'pui-divider',
      'flex items-center gap-[var(--pui-divider-gap,var(--pui-space-2))]',
      orientation === 'vertical' && 'flex-col',
      className
    )}
    style={style}
    data-testid={dataTestId}
    data-orientation={orientation}
    role="none"
  >
    <span class="flex-1 border-t border-[var(--pui-divider-color,var(--pui-outline))]"
          class:hidden={orientation === 'vertical'}
          class:border-t={orientation === 'horizontal'}
          class:border-l={orientation === 'vertical'}></span>
    <span class="shrink-0 text-sm text-(--pui-text-secondary)">{@render children()}</span>
    <span class="flex-1 border-t border-[var(--pui-divider-color,var(--pui-outline))]"
          class:hidden={orientation === 'vertical'}
          class:border-t={orientation === 'horizontal'}
          class:border-l={orientation === 'vertical'}></span>
  </div>
{:else}
  <div
    {...rest}
    id={id}
    role="separator"
    aria-orientation={orientation}
    class={cn(
      'pui-divider',
      'border-[var(--pui-divider-color,var(--pui-outline))]',
      orientation === 'vertical'
        ? 'inline-block h-full w-[var(--pui-divider-thickness,1px)] align-middle'
        : 'block h-[var(--pui-divider-thickness,1px)] w-full',
      inset && 'mx-[var(--pui-divider-inset,var(--pui-space-4))]',
      className
    )}
    style={style}
    data-testid={dataTestId}
    data-orientation={orientation}
  ></div>
{/if}
