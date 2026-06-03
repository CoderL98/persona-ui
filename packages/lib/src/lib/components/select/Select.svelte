<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import type { SelectProps } from './select.types.js';
  type SelectTexts = { placeholder: string; options: string };
  let {
    value: controlledValue,
    defaultValue,
    options = [],
    native = false,
    name,
    placeholder,
    label,
    helperText,
    error,
    disabled = false,
    texts: localTexts,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onchange,
    ...rest
  }: SelectProps = $props();
  const defaults: SelectTexts = { placeholder: 'Select…', options: 'Options' };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.placeholder);
  let internalValue = $state(untrack(() => defaultValue ?? ''));
  let currentValue = $derived(controlledValue ?? internalValue);
  let open = $state(false);
  let activeIndex = $state(-1);
  const selectId = $derived(id || `pui-select-${Math.random().toString(36).slice(2, 6)}`);
  const triggerId = $derived(`${selectId}-trigger`);
  const selectedLabel = $derived(options.find(o => o.value === currentValue)?.label || resolvedPlaceholder);

  function toggle() { if (!disabled) open = !open; }
  function selectOption(value: string, e: Event) {
    if (controlledValue === undefined) internalValue = value;
    onchange?.(value, e);
    open = false;
  }

  function nextEnabledIndex(from: number, dir: 1 | -1): number {
    const len = options.length;
    if (len === 0) return -1;
    let i = from;
    for (let step = 0; step < len; step++) {
      i = (i + dir + len) % len;
      if (!options[i].disabled) return i;
    }
    return from;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { open = true; return; }
      activeIndex = nextEnabledIndex(activeIndex, 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { open = true; return; }
      activeIndex = nextEnabledIndex(activeIndex, -1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) { open = true; return; }
      if (activeIndex >= 0 && !options[activeIndex]?.disabled) {
        selectOption(options[activeIndex].value, e);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
    }
  }
  function handleOptionKeydown(e: KeyboardEvent, value: string, disabled?: boolean) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption(value, e);
    }
  }
</script>

<div {...rest} id={selectId} class={cn('pui-select relative', className)} style={style} data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}>
  {#if label}<label for={triggerId} class="block text-sm font-medium text-(--pui-text-secondary) mb-1">{label}</label>{/if}
  {#if native}
    <select
      id={triggerId}
      {name}
      {disabled}
      class={cn('flex w-full appearance-none items-center justify-between gap-2 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) text-left transition-colors text-(--pui-text-primary)',
        error ? 'border-(--pui-color-error)' : 'border-(--pui-field-border,var(--pui-outline))',
        !disabled && 'focus:border-(--pui-color-primary)',
        disabled && 'opacity-(--pui-opacity-disabled)')}
      value={currentValue}
      onchange={(e) => selectOption((e.currentTarget as HTMLSelectElement).value, e)}
    >
      {#if !currentValue && resolvedPlaceholder}<option value="" disabled selected hidden>{resolvedPlaceholder}</option>{/if}
      {#each options as opt (opt.value)}
        <option value={opt.value} disabled={opt.disabled} selected={opt.value === currentValue}>{opt.label}</option>
      {/each}
    </select>
  {:else}
    <button id={triggerId} type="button" role="combobox" aria-expanded={open} aria-controls={`${selectId}-listbox`} aria-haspopup="listbox" aria-label={label} aria-activedescendant={activeIndex >= 0 ? `${selectId}-opt-${activeIndex}` : undefined}
      disabled={disabled}
      class={cn('flex w-full items-center justify-between gap-2 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) text-left transition-colors',
        error ? 'border-(--pui-color-error)' : 'border-(--pui-field-border,var(--pui-outline))',
        !disabled && 'focus-within:border-(--pui-color-primary) cursor-pointer',
        disabled && 'opacity-(--pui-opacity-disabled)')}
      onclick={(e) => { e.stopPropagation(); toggle(); }} onkeydown={handleKeydown}>
      <span class={cn('flex-1 truncate', currentValue ? 'text-(--pui-text-primary)' : 'text-(--pui-text-disabled)')}>{selectedLabel}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" class="shrink-0 transition-transform" class:rotate-180={open}><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  {/if}
  {#if !native && open}
    <div id={`${selectId}-listbox`} role="listbox" tabindex="-1" aria-label={label || t.options}
      class="absolute z-(--pui-z-overlay) mt-1 w-full bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) overflow-hidden">
      {#each options as opt, idx}
        <div id={`${selectId}-opt-${idx}`} role="option" tabindex={opt.disabled ? -1 : 0} aria-selected={opt.value === currentValue} aria-disabled={opt.disabled || undefined}
          class={cn('px-(--pui-space-3) py-(--pui-space-2) text-sm cursor-pointer transition-colors',
            opt.value === currentValue && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
            opt.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none',
            !opt.disabled && 'hover:bg-(--pui-surface-variant)')}
          onclick={(e) => { if (!opt.disabled) selectOption(opt.value, e); }}
          onkeydown={(e) => handleOptionKeydown(e, opt.value, opt.disabled)}>
          {opt.label}
        </div>
      {/each}
    </div>
  {/if}
  {#if error}<p class="text-xs text-(--pui-color-error) mt-1" role="alert">{error}</p>{:else if helperText}<p class="text-xs text-(--pui-text-secondary) mt-1">{helperText}</p>{/if}
</div>
