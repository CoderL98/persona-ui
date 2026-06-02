<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { ListItemProps } from './list.types.js';
  let { selected = false, disabled = false, href, leading, trailing, title, description, children, class: className, style, id, 'data-testid': dataTestId, onclick, ...rest }: ListItemProps = $props();
</script>
{#if href}
  <a {...rest} id={id} role="listitem" data-selected={selected || undefined} {href}
    class={cn('pui-list-item flex items-center gap-3 px-3 py-2 text-sm transition-colors',
      !disabled && 'cursor-pointer hover:bg-(--pui-surface-variant)',
      selected && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
      disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none', className)}
    style={style} data-testid={dataTestId}>
    {#if leading}<span class="shrink-0 text-(--pui-text-secondary)">{@render leading()}</span>{/if}
    <div class="flex-1 min-w-0">
      {#if title}<div class="font-medium text-(--pui-text-primary) truncate">{typeof title === 'string' ? title : ''}</div>{/if}
      {#if description}<div class="text-xs text-(--pui-text-secondary) truncate">{typeof description === 'string' ? description : ''}</div>{/if}
      {#if children}<div class="text-(--pui-text-secondary)">{@render children()}</div>{/if}
    </div>
    {#if trailing}<span class="shrink-0 text-(--pui-text-secondary)">{@render trailing()}</span>{/if}
  </a>
{:else}
  <div {...rest} id={id} role="listitem" data-selected={selected || undefined}
    class={cn('pui-list-item flex items-center gap-3 px-3 py-2 text-sm transition-colors',
      !disabled && (onclick || href) && 'cursor-pointer hover:bg-(--pui-surface-variant)',
      selected && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
      disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none', className)}
    style={style} data-testid={dataTestId}
    onclick={(e) => { if (!disabled) onclick?.(e); }}>
    {#if leading}<span class="shrink-0 text-(--pui-text-secondary)">{@render leading()}</span>{/if}
    <div class="flex-1 min-w-0">
      {#if title}<div class="font-medium text-(--pui-text-primary) truncate">{typeof title === 'string' ? title : ''}</div>{/if}
      {#if description}<div class="text-xs text-(--pui-text-secondary) truncate">{typeof description === 'string' ? description : ''}</div>{/if}
      {#if children}<div class="text-(--pui-text-secondary)">{@render children()}</div>{/if}
    </div>
    {#if trailing}<span class="shrink-0 text-(--pui-text-secondary)">{@render trailing()}</span>{/if}
  </div>
{/if}
