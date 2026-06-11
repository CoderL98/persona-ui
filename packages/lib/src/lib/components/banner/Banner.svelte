<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { BannerProps, BannerTone } from './banner.types.js';
  type BannerTexts = { dismiss: string };
  let { tone = 'info' as BannerTone, sticky = false, dismissible = false, defaultDismissed = false, texts: localTexts, icon, children, actions, onDismiss, class: className, style, id, 'data-testid': dataTestId, ...rest }: BannerProps = $props();
  const defaults: BannerTexts = { dismiss: 'Dismiss' };
  const t = $derived({ ...defaults, ...localTexts });
  let dismissed = $state(untrack(() => defaultDismissed));
  const attrs = $derived(dataAttrs({ tone, sticky: sticky || undefined, dismissible: dismissible || undefined }));
  function close() { dismissed = true; onDismiss?.(); }
</script>
{#if !dismissed}
<div {...rest} {...attrs} id={id} role="alert" aria-live="polite"
  class={cn('pui-banner flex items-center gap-3 px-4 py-2 text-sm',
    sticky && 'sticky top-0 z-(--pui-z-raised)',
    tone === 'info' && 'bg-(--pui-color-info-container) text-(--pui-color-on-info-container)',
    tone === 'success' && 'bg-(--pui-color-success-container) text-(--pui-color-on-success-container)',
    tone === 'warning' && 'bg-(--pui-color-warning-container) text-(--pui-color-on-warning-container)',
    tone === 'error' && 'bg-(--pui-color-error-container) text-(--pui-color-on-error-container)',
    className)}
  style={style}
  data-testid={dataTestId}>
  {#if icon}<span class="shrink-0">{@render icon()}</span>{/if}
  <div class="flex-1">{@render children?.()}</div>
  {#if actions}<div class="shrink-0 flex items-center gap-2">{@render actions()}</div>{/if}
  {#if dismissible}
    <button
      type="button"
      aria-label={t.dismiss}
      class="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full
             opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-100
             transition-opacity"
      onclick={close}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
        ><path
          d="M3 3l8 8M11 3l-8 8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        /></svg
      >
    </button>
  {/if}
</div>
{/if}
