<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { TableProps } from './table.types.js';
  let { density = 'normal', striped = false, children, class: className, style, id, 'data-testid': dataTestId, ...rest }: TableProps = $props();
</script>
<div class="overflow-x-auto">
  <table {...rest} id={id} class={cn('pui-table w-full text-sm',
    density === 'compact' && 'text-xs',
    density === 'comfortable' && 'text-base',
    striped && '[&>tbody>tr:nth-child(even)]:bg-(--pui-surface-variant)',
    className)} style={style} data-testid={dataTestId}>
    {@render children?.()}
  </table>
</div>
