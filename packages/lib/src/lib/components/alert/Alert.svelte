<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { AlertProps, AlertTone, AlertVariant } from './alert.types.js';
  type AlertTexts = { dismiss: string };
  let { tone = 'info' as AlertTone, variant = 'soft' as AlertVariant, title, children, icon, actions, dismissible = false, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, onDismiss: onDismiss, ...rest }: AlertProps = $props();
  const defaults: AlertTexts = { dismiss: 'Dismiss' };
  const t = $derived({ ...defaults, ...localTexts });
  let dismissed = $state(false);
  const roleAttr = $derived(tone === 'error' ? 'alert' : 'status');
  const attrs = $derived(dataAttrs({ tone, variant }));
</script>
{#if !dismissed}
  <div {...rest} {...attrs} id={id} role={roleAttr} aria-live="polite"
    class={cn('pui-alert flex items-start gap-3 rounded-(--pui-radius-container) p-4 text-sm transition-all',
      // Variant
      variant === 'outlined' && 'border border-(--pui-outline) bg-transparent',
      variant === 'filled' && 'border-0',
      // Tone (variant-aware)
      variant !== 'outlined' && tone === 'info' && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
      variant !== 'outlined' && tone === 'success' && 'bg-[oklch(0.92_0.04_150)] text-[oklch(0.15_0.04_150)]',
      variant !== 'outlined' && tone === 'warning' && 'bg-[oklch(0.95_0.05_85)] text-[oklch(0.25_0.04_85)]',
      variant !== 'outlined' && tone === 'error' && 'bg-(--pui-color-error-container) text-(--pui-color-on-error-container)',
      // Outlined tone colors
      variant === 'outlined' && tone === 'info' && 'text-(--pui-color-primary)',
      variant === 'outlined' && tone === 'success' && 'text-[oklch(0.35_0.06_150)]',
      variant === 'outlined' && tone === 'warning' && 'text-[oklch(0.45_0.06_85)]',
      variant === 'outlined' && tone === 'error' && 'text-(--pui-color-error)',
      className)}
    style={style}
    data-testid={dataTestId}>
    {#if icon}<span class="shrink-0 mt-0.5">{@render icon()}</span>{/if}
    <div class="flex-1 space-y-1">
      {#if title}<div class="font-medium">{@render title()}</div>{/if}
      {#if children}<div>{@render children()}</div>{/if}
    </div>
    {#if actions}<div class="shrink-0 flex items-center gap-2">{@render actions()}</div>{/if}
    {#if dismissible}
      <button type="button" aria-label={t.dismiss} class="shrink-0 opacity-60 hover:opacity-100 transition-opacity" onclick={(e) => { dismissed = true; onDismiss?.(e); }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    {/if}
  </div>
{/if}
