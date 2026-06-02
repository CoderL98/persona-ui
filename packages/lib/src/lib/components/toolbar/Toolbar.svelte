<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { ToolbarProps } from './toolbar.types.js';
  type ToolbarTexts = { toolbar: string };
  let { title, leading, trailing, children, sticky = false, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, ...rest }: ToolbarProps = $props();
  const defaults: ToolbarTexts = { toolbar: 'Toolbar' };
  const t = $derived({ ...defaults, ...localTexts });
  const titleSnippet = $derived(typeof title === 'function' ? title : undefined);
</script>
<div {...rest} id={id} role="toolbar" aria-label={t.toolbar} class={cn('pui-toolbar flex items-center gap-2 px-4 py-2 bg-(--pui-surface-base) border-b border-(--pui-outline-subtle) min-h-(--pui-hit-target-min)', sticky && 'sticky top-0 z-(--pui-z-raised)', className)} style={style} data-testid={dataTestId}>
  {#if leading}<div class="flex items-center gap-1">{@render leading()}</div>{/if}
  {#if title}
    {#if typeof title === 'string'}
      <div class="flex-1 font-semibold text-(--pui-text-primary)">{title}</div>
    {:else if titleSnippet}
      <div class="flex-1 font-semibold text-(--pui-text-primary)">{@render titleSnippet()}</div>
    {/if}
  {/if}
  {#if children}<div class="flex items-center gap-1">{@render children()}</div>{/if}
  {#if trailing}<div class="flex items-center gap-1">{@render trailing()}</div>{/if}
</div>
