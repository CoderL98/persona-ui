<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { BreadcrumbProps } from './breadcrumb.types.js';
  type BreadcrumbTexts = { breadcrumb: string };
  let {
    items = [],
    separator,
    texts: localTexts,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    ...rest
  }: BreadcrumbProps = $props();
  const defaults: BreadcrumbTexts = { breadcrumb: 'Breadcrumb' };
  const t = $derived({ ...defaults, ...localTexts });
</script>

<nav
  {...rest}
  id={id}
  aria-label={t.breadcrumb}
  class={cn('pui-breadcrumb flex items-center gap-1 text-sm', className)}
  style={style}
  data-testid={dataTestId}
>
  <ol class="flex items-center gap-1 flex-wrap">
    {#each items as item, i (item.label)}
      <li class="flex items-center gap-1">
        {#if i > 0}
          <span class="text-(--pui-text-disabled) mx-1" aria-hidden="true">
            {#if separator}
              {#if typeof separator === 'string'}{separator}{:else}{@render separator()}{/if}
            {:else}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                ><path d="M3.5 2l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg
              >
            {/if}
          </span>
        {/if}
        {#if item.icon}
          <span class="inline-flex items-center text-(--pui-text-secondary) mr-0.5">{@render item.icon()}</span>
        {/if}
        {#if item.current}
          <span class="text-(--pui-text-primary) font-medium" aria-current="page">{item.label}</span>
        {:else if item.href}
          <a href={item.href} class="text-(--pui-color-primary) hover:underline">{item.label}</a>
        {:else}
          <span class="text-(--pui-text-secondary)">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
