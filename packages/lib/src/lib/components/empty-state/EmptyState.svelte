<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { EmptyStateProps } from './empty-state.types.js';
  let { icon, title, children, actions, class: className, style, id, 'data-testid': dataTestId, ...rest }: EmptyStateProps = $props();
</script>
<div {...rest} id={id} class={cn('pui-empty-state flex flex-col items-center justify-center text-center py-12 px-4', className)} style={style} data-testid={dataTestId}>
  {#if icon}<div class="mb-4 text-(--pui-text-disabled)">{@render icon()}</div>{/if}
  {#if title}<div class="text-lg font-semibold text-(--pui-text-primary) mb-1">{@render title()}</div>{/if}
  {#if children}<div class="text-sm text-(--pui-text-secondary) max-w-sm">{@render children()}</div>{/if}
  {#if actions}<div class="mt-4 flex items-center gap-3">{@render actions()}</div>{/if}
</div>
