<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { SpinnerProps, SpinnerSize, SpinnerTone } from './spinner.types.js';
  type SpinnerTexts = { loading: string };
  let { size = 'md' as SpinnerSize, tone = 'primary' as SpinnerTone, label, decorative = false, texts: localTexts, class: className, style, id, 'data-testid': dataTestId }: SpinnerProps = $props();
  const defaults: SpinnerTexts = { loading: 'Loading' };
  const t = $derived({ ...defaults, ...localTexts });

  const toneColor = $derived(
    tone === 'current' ? 'text-current border-current' :
    tone === 'primary' ? 'text-(--pui-color-primary) border-(--pui-color-primary)' :
    tone === 'success' ? 'text-(--pui-color-tertiary) border-(--pui-color-tertiary)' :
    tone === 'warning' ? 'text-(--pui-color-warning,oklch(0.78_0.16_85)) border-current' :
    'text-(--pui-color-error) border-(--pui-color-error)'
  );
</script>
<span role={decorative ? 'presentation' : 'status'} aria-label={decorative ? undefined : (label || t.loading)} aria-hidden={decorative || undefined}
  class={cn('pui-spinner inline-block animate-spin rounded-full border-2 border-t-transparent',
    toneColor,
    size === 'sm' && 'h-4 w-4',
    size === 'md' && 'h-6 w-6 border-[2.5px]',
    size === 'lg' && 'h-8 w-8 border-[3px]',
    className)}
  style={style} id={id} data-testid={dataTestId}>
  {#if !decorative && label}<span class="sr-only">{label}</span>{/if}
</span>
