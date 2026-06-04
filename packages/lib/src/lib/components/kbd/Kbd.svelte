<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { KbdProps } from './kbd.types.js';

  let {
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    ...rest
  }: KbdProps = $props();
</script>

<kbd
  {...rest}
  id={id}
  class={cn(
    'pui-kbd',
    'inline-flex items-center justify-center font-mono text-xs leading-none',
    'rounded-(--pui-kbd-radius,var(--pui-radius-control))',
    'bg-(--pui-kbd-bg,var(--pui-surface-variant))',
    'text-(--pui-kbd-fg,var(--pui-text-secondary))',
    'px-(--pui-kbd-padding-x,var(--pui-space-1))',
    'py-(--pui-kbd-padding-y,2px)',
    'shadow-(--pui-kbd-shadow,none)',
    className
  )}
  style={style}
  data-testid={dataTestId}
>
  {@render children?.()}
</kbd>
