<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import { uniqueId } from '../../internal/id.js';
  import Calendar from '../calendar/Calendar.svelte';
  import type { DatePickerProps } from './date-picker.types.js';
  type DatePickerTexts = { pickDate: string };
  let { value: controlledValue, defaultValue, min, max, locale = 'en-US', disabledDates = [], placeholder, texts: localTexts, label, helperText, error, disabled = false, class: className, style, id, 'data-testid': dataTestId, onValueChange }: DatePickerProps = $props();
  const defaults: DatePickerTexts = { pickDate: 'Pick a date' };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.pickDate);
  let open = $state(false);
  let internalValue = $state(untrack(() => defaultValue));
  let currentValue = $derived(controlledValue ?? internalValue);
  const dpId = $derived(id || uniqueId('pui-date-picker'));
  const datePickerId = $derived(`${dpId}-button`);
  function selectDate(d: Date) { if (controlledValue === undefined) internalValue = d; onValueChange?.(d); open = false; }
</script>
<div id={id} class={cn('pui-date-picker relative', className)} style={style} data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}>
  {#if label}<label for={datePickerId} class="block text-sm font-medium text-(--pui-text-secondary) mb-1">{label}</label>{/if}
  <button id={datePickerId} type="button" disabled={disabled}
    class="flex w-full items-center justify-between bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border border-(--pui-field-border,var(--pui-outline)) px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) text-left transition-colors disabled:opacity-(--pui-opacity-disabled)"
    onclick={() => { if (!disabled) open = !open; }}>
    <span class={currentValue ? 'text-(--pui-text-primary)' : 'text-(--pui-text-disabled)'}>{currentValue ? currentValue.toLocaleDateString(locale) : resolvedPlaceholder}</span>
  </button>
  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div role="presentation" class="absolute z-(--pui-z-overlay) mt-1" onclick={(e) => e.stopPropagation()}>
      <Calendar {min} {max} {locale} {disabledDates} onValueChange={selectDate} />
    </div>
  {/if}
  {#if error}<p class="text-xs text-(--pui-color-error) mt-1">{error}</p>{:else if helperText}<p class="text-xs text-(--pui-text-secondary) mt-1">{helperText}</p>{/if}
</div>
