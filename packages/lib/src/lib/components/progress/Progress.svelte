<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { ProgressProps, ProgressTone } from './progress.types.js';
  type ProgressTexts = { progress: string };
  let { value, max = 100, indeterminate = false, tone = 'primary' as ProgressTone, label, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, ...rest }: ProgressProps = $props();
  const defaults: ProgressTexts = { progress: 'Progress' };
  const t = $derived({ ...defaults, ...localTexts });
  const pct = $derived(indeterminate ? undefined : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100)));
  const attrs = $derived(dataAttrs({ indeterminate: indeterminate || undefined, tone }));

  const fillColor = $derived(
    tone === 'primary' ? 'bg-(--pui-color-primary)' :
    tone === 'success' ? 'bg-(--pui-color-tertiary)' :
    tone === 'warning' ? 'bg-(--pui-color-warning,oklch(0.78_0.16_85))' :
    'bg-(--pui-color-error)'
  );
</script>

<div {...rest} {...attrs} id={id} role="progressbar" aria-valuenow={indeterminate ? undefined : (value ?? 0)} aria-valuemin={0} aria-valuemax={max} aria-label={label || t.progress}
  class={cn('pui-progress relative h-2 w-full overflow-hidden rounded-full bg-(--pui-surface-variant)', className)} style={style} data-testid={dataTestId}>
  <div class={cn(
      'h-full rounded-full transition-all duration-(--pui-duration-swap)',
      fillColor,
      indeterminate ? 'w-1/2 animate-pulse' : '')}
    style={indeterminate ? undefined : `width:${pct}%`}>
  </div>
</div>
