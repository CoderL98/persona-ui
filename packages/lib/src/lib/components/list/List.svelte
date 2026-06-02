<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { ListProps } from './list.types.js';
  let { variant = 'plain', children, class: className, style, id, 'data-testid': dataTestId, ...rest }: ListProps = $props();
</script>
<div {...rest} id={id} role="list" class={cn('pui-list', variant === 'grouped' && 'rounded-(--pui-radius-container) bg-(--pui-surface-base) shadow-[var(--pui-elevation-1)]', className)} style={style} data-testid={dataTestId}>
  {#if variant === 'grouped'}<div class="divide-y divide-(--pui-outline-subtle)">{@render children?.()}</div>{:else}{@render children?.()}{/if}
</div>
