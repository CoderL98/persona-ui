<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { SkeletonProps, SkeletonShape } from './skeleton.types.js';
  let { shape = 'text' as SkeletonShape, width, height, animated = true, class: className, style, id, 'data-testid': dataTestId }: SkeletonProps = $props();
  const shapeClass = $derived(shape === 'circle' ? 'rounded-full' : shape === 'rect' ? 'rounded-(--pui-radius-container)' : 'rounded-(--pui-radius-control)');
</script>
<div id={id}
  class={cn('pui-skeleton bg-(--pui-surface-variant)', shapeClass,
    animated && 'animate-pulse',
    !width && shape === 'text' && 'w-full',
    !height && shape === 'text' && 'h-4',
    className)}
  style={`${width ? `width:${width};` : ''}${height ? `height:${height};` : ''}${style ?? ''}`}
  data-testid={dataTestId} aria-hidden="true">
</div>
