<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import { uniqueId } from '../../internal/id.js';
  import type { ComboboxProps } from './combobox.types.js';
  type ComboboxTexts = { suggestions: string; removeTag: string };
  let {
    value: controlledValue,
    defaultValue,
    multiple = false,
    inputValue: controlledInput,
    defaultInputValue = '',
    options = [],
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
    onInputChange,
    onValueChange,
    ...rest
  }: ComboboxProps = $props();
  const defaults: ComboboxTexts = { suggestions: 'Suggestions', removeTag: 'Remove' };
  const t = $derived({ ...defaults, ...localTexts });
  const initialValue = $derived(
    untrack(() =>
      multiple
        ? Array.isArray(defaultValue)
          ? defaultValue
          : []
        : ((defaultValue as string | undefined) ?? ''),
    ),
  );
  let internalValue: string | string[] = $state(untrack(() => initialValue));
  let internalInput = $state(untrack(() => defaultInputValue));
  let currentValue = $derived(controlledValue ?? internalValue);
  const currentValueArr = $derived(Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : []);
  const valueSet = $derived(new Set(currentValueArr));
  const selectedOptions = $derived(options.filter((o) => valueSet.has(o.value)));
  let currentInput = $derived(controlledInput ?? internalInput);
  let open = $state(false);
  let activeIndex = $state(-1);
  const comboId = $derived(id || uniqueId('pui-combo'));
  const filteredOptions = $derived(
    currentInput
      ? options.filter((o) => o.label.toLowerCase().includes(currentInput.toLowerCase()))
      : options,
  );
  const availableOptions = $derived(
    multiple ? filteredOptions.filter((o) => !valueSet.has(o.value)) : filteredOptions,
  );

  function handleInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    if (controlledInput === undefined) internalInput = v;
    onInputChange?.(v, e);
    open = true;
    activeIndex = -1;
  }

  function selectOption(val: string, e: Event) {
    if (multiple) {
      const arr = Array.isArray(currentValue) ? [...currentValue] : [];
      if (!arr.includes(val)) arr.push(val);
      if (controlledValue === undefined) internalValue = arr;
      onValueChange?.(arr, e);
      if (controlledInput === undefined) internalInput = '';
      activeIndex = -1;
    } else {
      const opt = options.find((o) => o.value === val);
      if (controlledValue === undefined) internalValue = val;
      if (controlledInput === undefined) internalInput = opt?.label ?? '';
      onValueChange?.(val, e);
      open = false;
    }
  }

  function removeTag(val: string, e: Event) {
    if (!multiple) return;
    e.stopPropagation();
    const arr = Array.isArray(currentValue) ? currentValue.filter((v) => v !== val) : [];
    if (controlledValue === undefined) internalValue = arr;
    onValueChange?.(arr, e);
  }

  function handleKeydown(e: KeyboardEvent) {
    const opts = availableOptions.filter((o) => !o.disabled);
    if (e.key === 'Backspace' && multiple && currentInput === '' && currentValueArr.length > 0) {
      e.preventDefault();
      removeTag(currentValueArr[currentValueArr.length - 1], e);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { open = true; return; }
      activeIndex = activeIndex < opts.length - 1 ? activeIndex + 1 : 0;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = activeIndex > 0 ? activeIndex - 1 : opts.length - 1;
    } else if (e.key === 'Enter' && open && activeIndex >= 0) {
      e.preventDefault();
      selectOption(opts[activeIndex].value, e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
    }
  }

  function handleOptionKeydown(e: KeyboardEvent, value: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption(value, e);
    }
  }
</script>

<div
  {...rest}
  id={comboId}
  class={cn('pui-combobox relative', className)}
  style={style}
  data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}
>
  {#if label}<label for={`${comboId}-input`} class="block text-sm font-medium text-(--pui-text-secondary) mb-1">{label}</label>{/if}
  <div
    class={cn(
      'flex flex-wrap items-center gap-1.5 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) transition-colors',
      error ? 'border-(--pui-color-error)' : 'border-(--pui-field-border,var(--pui-outline))',
      !disabled && 'focus-within:border-(--pui-color-primary)',
    )}
  >
    {#if multiple}
      {#each selectedOptions as opt (opt.value)}
        <span
          class="inline-flex items-center gap-1 rounded-(--pui-radius-control) bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container) px-2 py-0.5 text-xs"
        >
          {opt.label}
          <button
            type="button"
            aria-label={`${t.removeTag} ${opt.label}`}
            class="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 transition-colors"
            onclick={(e) => removeTag(opt.value, e)}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
              ><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg
            >
          </button>
        </span>
      {/each}
    {/if}
    <input
      id={`${comboId}-input`}
      type="text"
      role="combobox"
      aria-expanded={open}
      aria-controls={`${comboId}-listbox`}
      aria-autocomplete="list"
      aria-activedescendant={activeIndex >= 0 ? `${comboId}-opt-${activeIndex}` : undefined}
      class="flex-1 min-w-32 bg-transparent text-(--pui-text-primary) placeholder:text-(--pui-text-disabled) outline-none"
      value={currentInput}
      {placeholder}
      {disabled}
      oninput={handleInput}
      onkeydown={handleKeydown}
      onfocus={() => { if (availableOptions.length) open = true; }}
    />
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      class="shrink-0 text-(--pui-text-secondary) transition-transform"
      class:rotate-180={open}
      ><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg
    >
  </div>
  {#if open && availableOptions.length > 0}
    <div
      id={`${comboId}-listbox`}
      role="listbox"
      tabindex="-1"
      aria-label={label || t.suggestions}
      aria-multiselectable={multiple || undefined}
      class="absolute z-(--pui-z-overlay) mt-1 w-full bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) overflow-hidden"
    >
      {#each availableOptions as opt, idx}
        <div
          id={`${comboId}-opt-${idx}`}
          role="option"
          tabindex={0}
          aria-selected={idx === activeIndex}
          class={cn(
            'px-(--pui-space-3) py-(--pui-space-2) text-sm cursor-pointer transition-colors',
            idx === activeIndex && 'bg-(--pui-surface-variant)',
          )}
          onclick={(e) => selectOption(opt.value, e)}
          onkeydown={(e) => handleOptionKeydown(e, opt.value)}
        >
          {opt.label}
        </div>
      {/each}
    </div>
  {/if}
  {#if error}<p class="text-xs text-(--pui-color-error) mt-1" role="alert">{error}</p>{:else if helperText}<p class="text-xs text-(--pui-text-secondary) mt-1">{helperText}</p>{/if}
</div>
