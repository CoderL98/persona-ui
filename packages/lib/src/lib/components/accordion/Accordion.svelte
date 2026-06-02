<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { AccordionProps, AccordionItem } from './accordion.types.js';
  let { value: controlledValue, defaultValue, items = [], multiple = false, children, class: className, style, id, 'data-testid': dataTestId, onchange, ...rest }: AccordionProps = $props();
  let internalValue = $state<string[]>(untrack(() => defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []));
  let currentValue = $derived(controlledValue !== undefined ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue]) : internalValue);

  function toggle(val: string) {
    let next: string[];
    if (multiple) {
      next = currentValue.includes(val) ? currentValue.filter(v => v !== val) : [...currentValue, val];
    } else {
      next = currentValue.includes(val) ? [] : [val];
    }
    if (controlledValue === undefined) internalValue = next;
    onchange?.(multiple ? next : (next[0] || ''));
  }
</script>
<div {...rest} id={id} class={cn('pui-accordion divide-y divide-(--pui-outline-subtle)', className)} style={style} data-testid={dataTestId}>
  {#each items as item}
    <div class="py-0">
      <button type="button" aria-expanded={currentValue.includes(item.value)} aria-disabled={item.disabled || undefined}
        class={cn('flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-left transition-colors',
          currentValue.includes(item.value) ? 'text-(--pui-text-primary)' : 'text-(--pui-text-secondary)',
          item.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none')}
        onclick={() => { if (!item.disabled) toggle(item.value); }}>
        <span>{item.title}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform" class:rotate-180={currentValue.includes(item.value)}><path d="M4 5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      {#if currentValue.includes(item.value)}
        <div class="px-3 pb-3 text-sm text-(--pui-text-secondary)" role="region">
          {#if item.content}{@render item.content()}{:else}{item.title}{/if}
        </div>
      {/if}
    </div>
  {/each}
  {@render children?.()}
</div>
