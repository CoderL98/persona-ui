<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import type { TimePickerProps, TimePickerFormat } from './time-picker.types.js';
  type TimePickerTexts = { selectTime: string; hours: string; am: string; pm: string };
  let {
    value: controlledValue,
    defaultValue,
    format = '24h' as TimePickerFormat,
    minuteStep = 5,
    placeholder,
    texts: localTexts,
    label,
    helperText,
    error,
    disabled = false,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onchange,
    ...rest
  }: TimePickerProps = $props();
  const defaults: TimePickerTexts = { selectTime: 'Select time', hours: 'Hours', am: 'AM', pm: 'PM' };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.selectTime);

  let internalValue = $state(untrack(() => defaultValue ?? ''));
  let currentValue = $derived(controlledValue ?? internalValue);
  let open = $state(false);

  const tpId = $derived(id || `pui-time-${Math.random().toString(36).slice(2, 6)}`);
  const triggerId = $derived(`${tpId}-trigger`);

  // Parse current value into parts
  let parsedHours = $derived.by(() => {
    if (!currentValue) return null;
    const parts = currentValue.split(':');
    if (parts.length < 2) return null;
    return parseInt(parts[0], 10);
  });
  let parsedMinutes = $derived.by(() => {
    if (!currentValue) return null;
    const parts = currentValue.split(':');
    if (parts.length < 2) return null;
    return parseInt(parts[1], 10);
  });
  let isPM = $state(false);
  $effect(() => { isPM = format === '12h' && parsedHours !== null && parsedHours >= 12; });

  // Build hour list based on format
  let hours = $derived.by(() => {
    if (format === '24h') return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    return Array.from({ length: 12 }, (_, i) => String(i === 0 ? 12 : i).padStart(2, '0'));
  });
  let minutes = $derived(Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => String(i * minuteStep).padStart(2, '0')));

  let selectedHour = $derived(format === '12h' && parsedHours !== null
    ? String(parsedHours === 0 ? 12 : parsedHours > 12 ? parsedHours - 12 : parsedHours).padStart(2, '0')
    : parsedHours !== null ? String(parsedHours).padStart(2, '0') : null
  );
  let selectedMinute = $derived(parsedMinutes !== null ? String(parsedMinutes).padStart(2, '0') : null);

  function selectTime(h: string, m: string, pm?: boolean) {
    let hour = parseInt(h, 10);
    if (format === '12h') {
      if (pm === true && hour !== 12) hour += 12;
      else if (pm === false && hour === 12) hour = 0;
    }
    const timeStr = `${String(hour).padStart(2, '0')}:${m}`;
    if (controlledValue === undefined) internalValue = timeStr;
    onchange?.(timeStr);
    open = false;
  }

  function togglePM() {
    if (parsedHours === null) return;
    const newIsPM = !isPM;
    let h = parsedHours;
    if (newIsPM && h < 12) h += 12;
    else if (!newIsPM && h >= 12) h -= 12;
    const timeStr = `${String(h).padStart(2, '0')}:${String(parsedMinutes ?? 0).padStart(2, '0')}`;
    if (controlledValue === undefined) internalValue = timeStr;
    onchange?.(timeStr);
  }
</script>

<div {...rest} id={tpId} class={cn('pui-time-picker relative', className)} style={style} data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}>
  {#if label}<label for={triggerId} class="block text-sm font-medium text-(--pui-text-secondary) mb-1">{label}</label>{/if}

  <button id={triggerId} type="button" disabled={disabled}
    class={cn('flex w-full items-center justify-between gap-2 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) text-left transition-colors',
      error ? 'border-(--pui-color-error)' : 'border-(--pui-field-border,var(--pui-outline))',
      !disabled && 'cursor-pointer hover:border-(--pui-color-primary)',
      disabled && 'opacity-(--pui-opacity-disabled)')}
    onclick={() => { if (!disabled) open = !open; }}>
    <span class={cn('flex-1', currentValue ? 'text-(--pui-text-primary)' : 'text-(--pui-text-disabled)')}>
      {currentValue || resolvedPlaceholder}
    </span>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 text-(--pui-text-secondary)">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M8 4.5V8l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </button>

  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div role="presentation" transition:scale={{ start: 0.95, duration: 150 }}
      class="absolute z-(--pui-z-overlay) mt-1 w-full min-w-50 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle) p-3"
      onclick={(e) => e.stopPropagation()}>
      <div class="flex items-center gap-1">
        <!-- Hour selector -->
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_tabindex -->
        <div class="flex-1 max-h-45 overflow-y-auto space-y-0.5 text-center scrollbar-thin" role="listbox" aria-label={t.hours}>
          {#each hours as h}
            <button type="button"
              class={cn('w-full px-2 py-1 text-sm rounded-(--pui-radius-control) transition-colors',
                h === selectedHour ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)')}
              onclick={() => selectTime(h, selectedMinute ?? minutes[0], format === '12h' ? isPM : undefined)}>
              {h}
            </button>
          {/each}
        </div>

        <!-- Separator -->
        <span class="text-lg font-medium text-(--pui-text-primary) px-0.5">:</span>

        <!-- Minute selector -->
        <div class="flex-1 max-h-45 overflow-y-auto space-y-0.5 text-center scrollbar-thin" tabindex="-1">
          {#each minutes as m}
            <button type="button"
              class={cn('w-full px-2 py-1 text-sm rounded-(--pui-radius-control) transition-colors',
                m === selectedMinute ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)')}
              onclick={() => selectTime(selectedHour ?? hours[0], m, format === '12h' ? isPM : undefined)}>
              {m}
            </button>
          {/each}
        </div>

        <!-- AM/PM toggle (12h only) -->
        {#if format === '12h'}
          <div class="flex flex-col gap-1 ml-1">
            <button type="button"
              class={cn('px-2 py-1 text-xs rounded-(--pui-radius-control) transition-colors',
                !isPM ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-secondary)')}
              onclick={() => { if (isPM) togglePM(); }}>
              {t.am}
            </button>
            <button type="button"
              class={cn('px-2 py-1 text-xs rounded-(--pui-radius-control) transition-colors',
                isPM ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-secondary)')}
              onclick={() => { if (!isPM) togglePM(); }}>
              {t.pm}
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if error}<p class="text-xs text-(--pui-color-error) mt-1" role="alert">{error}</p>{:else if helperText}<p class="text-xs text-(--pui-text-secondary) mt-1">{helperText}</p>{/if}
</div>
