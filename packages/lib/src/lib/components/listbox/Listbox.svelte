<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { uniqueId } from '../../internal/id.js';
  import type { ListboxProps } from './listbox.types.js';
  type ListboxTexts = { options: string };
  let {
    value: controlledValue,
    defaultValue,
    multiple = false,
    options = [],
    disabled = false,
    texts: localTexts,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onValueChange,
    ...rest
  }: ListboxProps = $props();
  const defaults: ListboxTexts = { options: 'Options' };
  const t = $derived({ ...defaults, ...localTexts });
  const initialValue = $derived(untrack(() => (multiple ? (Array.isArray(defaultValue) ? defaultValue : []) : (defaultValue ?? ''))));
  let internalValue: string | string[] = $state(untrack(() => initialValue));
  let currentValue = $derived(controlledValue ?? internalValue);

  // 归一化比较辅助
  const selectedSet = $derived(new Set(Array.isArray(currentValue) ? currentValue : [currentValue]));
  function isSelected(v: string) { return selectedSet.has(v); }

  let activeIndex = $state(-1);
  const listId = $derived(id || uniqueId('pui-listbox'));

  function selectOption(value: string, e: Event) {
    if (multiple) {
      const arr = Array.isArray(currentValue) ? [...currentValue] : [];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(value);
      if (controlledValue === undefined) internalValue = arr;
      onValueChange?.(arr, e);
    } else {
      if (controlledValue === undefined) internalValue = value;
      onValueChange?.(value, e);
    }
    activeIndex = options.findIndex((o) => o.value === value);
  }

  function handleKeydown(e: KeyboardEvent) {
    const opts = options.filter((o) => !o.disabled);
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = activeIndex < opts.length - 1 ? activeIndex + 1 : 0; }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = activeIndex > 0 ? activeIndex - 1 : opts.length - 1; }
    else if (e.key === 'Home') { e.preventDefault(); activeIndex = 0; }
    else if (e.key === 'End') { e.preventDefault(); activeIndex = opts.length - 1; }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (activeIndex >= 0) selectOption(opts[activeIndex].value, e); }
  }

  function handleOptionKeydown(e: KeyboardEvent, value: string, disabled?: boolean) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption(value, e);
    }
  }
</script>

<div
  {...rest}
  id={listId}
  role="listbox"
  aria-multiselectable={multiple || undefined}
  tabindex={disabled ? -1 : 0}
  aria-label={t.options}
  class={cn(
    'pui-listbox flex flex-col bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-2) overflow-hidden',
    className,
  )}
  style={style}
  data-testid={dataTestId}
  onkeydown={handleKeydown}
>
  {#each options as opt, i}
    <div
      role="option"
      tabindex={opt.disabled ? -1 : 0}
      aria-selected={isSelected(opt.value)}
      aria-disabled={opt.disabled || undefined}
      class={cn(
        'px-(--pui-space-3) py-(--pui-space-2) text-sm cursor-pointer transition-colors flex items-center gap-2',
        isSelected(opt.value) && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
        !isSelected(opt.value) && i === activeIndex && 'bg-(--pui-surface-variant)',
        opt.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none',
        !opt.disabled && !isSelected(opt.value) && 'hover:bg-(--pui-surface-variant)',
      )}
      onclick={(e) => { if (!opt.disabled) selectOption(opt.value, e); }}
      onkeydown={(e) => handleOptionKeydown(e, opt.value, opt.disabled)}
    >
      {#if multiple}
        <span
          aria-hidden="true"
          class={cn(
            'inline-flex h-4 w-4 items-center justify-center rounded border',
            isSelected(opt.value) ? 'bg-(--pui-color-primary) border-(--pui-color-primary) text-(--pui-color-on-primary)' : 'border-(--pui-outline)',
          )}
        >
          {#if isSelected(opt.value)}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              ><path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg
            >
          {/if}
        </span>
      {/if}
      <span class="flex-1">{opt.label}</span>
    </div>
  {/each}
</div>
