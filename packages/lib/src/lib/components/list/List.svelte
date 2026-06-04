<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { ListProps } from './list.types.js';
  let { variant = 'plain', children, class: className, style, id, 'data-testid': dataTestId, ...rest }: ListProps = $props();
  // 修复：原实现 'inset' 变体被静默忽略，现在实装
  //   - plain: 无圆角无边距，列表项直接铺满
  //   - grouped: 整组带圆角 + 阴影 + divide-y 分隔
  //   - inset: 与 grouped 类似但带水平内边距（iOS Settings 风格）
  const wrapperClass = $derived(
    variant === 'grouped' || variant === 'inset'
      ? cn(
          'rounded-(--pui-radius-container) bg-(--pui-surface-base) shadow-(--pui-elevation-1) overflow-hidden',
          variant === 'inset' && 'mx-(--pui-space-4) my-(--pui-space-2)',
        )
      : '',
  );
  const innerClass = $derived(variant === 'grouped' || variant === 'inset' ? 'divide-y divide-(--pui-outline-subtle)' : '');
</script>
<div {...rest} id={id} role="list" class={cn('pui-list', wrapperClass, className)} style={style} data-testid={dataTestId}>
  {#if innerClass}<div class={innerClass}>{@render children?.()}</div>{:else}{@render children?.()}{/if}
</div>
