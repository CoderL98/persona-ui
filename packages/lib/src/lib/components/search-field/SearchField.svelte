<script lang="ts">
  import { cn } from '../../internal/class.js';
  import type { SearchFieldProps } from './search-field.types.js';
  type SearchFieldTexts = { search: string; clear: string };
  let { value: controlledValue, defaultValue = '', placeholder, label, clearable = true, disabled = false, texts: localTexts, class: className, style, id, 'aria-label': ariaLabel, 'data-testid': dataTestId, onInput: onInput, onClear: onClear, ...rest }: SearchFieldProps = $props();
  const defaults: SearchFieldTexts = { search: 'Search…', clear: 'Clear' };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.search);
  let internalValue = $state('');
  let currentValue = $derived(controlledValue ?? internalValue);
  $effect(() => { if (controlledValue === undefined && !internalValue && defaultValue) internalValue = defaultValue; });
  let _autoId = $props.id();
  const fieldId = $derived(id ?? _autoId);
  function handleInput(e: Event) { const target = e.target as HTMLInputElement; if (controlledValue === undefined) internalValue = target.value; onInput?.(target.value, e); }
  function handleClear(e: MouseEvent) { if (controlledValue === undefined) internalValue = ''; onClear?.(e); onInput?.('', e as unknown as Event); }
</script>
<div {...rest} id={id} class={cn('pui-search-field relative flex items-center gap-2 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border border-(--pui-field-border,var(--pui-outline)) px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) transition-colors', disabled && 'opacity-(--pui-opacity-disabled)', !disabled && 'focus-within:border-(--pui-color-primary)', className)} style={style} data-testid={dataTestId}>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 text-(--pui-text-secondary)"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  {#if label}<label for={fieldId} class="sr-only">{label}</label>{/if}
  <input id={fieldId} type="search" class="w-full bg-transparent text-(--pui-text-primary) placeholder:text-(--pui-text-disabled) outline-none" value={currentValue} placeholder={resolvedPlaceholder} {disabled} aria-label={ariaLabel || label} oninput={handleInput} />
  {#if clearable && currentValue}
    <button type="button" aria-label={t.clear} tabindex="-1" class="shrink-0 text-(--pui-text-secondary) hover:text-(--pui-text-primary) transition-colors" onclick={handleClear}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  {/if}
</div>
