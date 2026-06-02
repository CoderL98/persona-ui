<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { NavigationRailProps, NavigationRailItem } from './navigation-rail.types.js';
  let { value: controlledValue, defaultValue, items = [], class: className, style, id, 'data-testid': dataTestId, onchange, ...rest }: NavigationRailProps = $props();
  let internalValue = $state(untrack(() => defaultValue ?? (items[0]?.value || '')));
  let currentValue = $derived(controlledValue ?? internalValue);
  function select(v: string) { if (controlledValue === undefined) internalValue = v; onchange?.(v); }
</script>
<nav {...rest} id={id} class={cn('pui-navigation-rail flex flex-col items-center gap-1 py-4 w-(--pui-navigation-rail-width,72px) bg-(--pui-surface-base) border-r border-(--pui-outline-subtle)', className)} style={style} data-testid={dataTestId}>
  {#each items as item}
    <button type="button" aria-label={item.label} aria-disabled={item.disabled || undefined}
      class={cn('flex flex-col items-center justify-center gap-1 w-(--pui-navigation-rail-width,72px) py-2 text-xs transition-colors',
        item.value === currentValue ? 'text-(--pui-color-primary)' : 'text-(--pui-text-secondary) hover:text-(--pui-text-primary)',
        item.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none')}
      onclick={() => { if (!item.disabled) select(item.value); }}>
      {#if item.icon}<span class="text-lg">{@render item.icon()}</span>{/if}
      <span>{item.label}</span>
    </button>
  {/each}
</nav>
