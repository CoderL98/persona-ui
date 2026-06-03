<script lang="ts">
  import { untrack } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import type { TimePickerProps, TimePickerFormat } from './time-picker.types.js';
  type TimePickerTexts = { selectTime: string; hours: string; minutes: string; am: string; pm: string; clear: string };
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
    locale,
    minTime,
    maxTime,
    clearable = false,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onchange,
    ...rest
  }: TimePickerProps = $props();
  const defaults: TimePickerTexts = { selectTime: 'Select time', hours: 'Hours', minutes: 'Minutes', am: 'AM', pm: 'PM', clear: 'Clear' };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.selectTime);

  // locale：优先用 prop，fallback 到浏览器，SSR 阶段用 'en-US'
  const resolvedLocale = $derived(locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US'));

  // 用 Intl.DateTimeFormat 拿本地化的 AM/PM 标签
  const ampmLabels = $derived.by(() => {
    try {
      const fmt = new Intl.DateTimeFormat(resolvedLocale, { hour: 'numeric', hour12: true });
      // 取 0 时（AM）和 13 时（PM）的 hourName
      const amParts = fmt.formatToParts(new Date(2020, 0, 1, 0));
      const pmParts = fmt.formatToParts(new Date(2020, 0, 1, 13));
      const am = amParts.find(p => p.type === 'dayPeriod')?.value ?? 'AM';
      const pm = pmParts.find(p => p.type === 'dayPeriod')?.value ?? 'PM';
      return { am, pm };
    } catch {
      return { am: 'AM', pm: 'PM' };
    }
  });

  let internalValue = $state(untrack(() => defaultValue ?? ''));
  let currentValue = $derived(controlledValue ?? internalValue);
  let open = $state(false);

  const tpId = $derived(id || `pui-time-${Math.random().toString(36).slice(2, 6)}`);
  const triggerId = $derived(`${tpId}-trigger`);
  const hoursListId = $derived(`${tpId}-hours`);
  const minutesListId = $derived(`${tpId}-minutes`);

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

  // 活动项索引（用于键盘导航 + aria-activedescendant）
  let activeHourIndex = $state(-1);
  let activeMinuteIndex = $state(-1);
  $effect(() => {
    if (open) {
      activeHourIndex = selectedHour ? hours.indexOf(selectedHour) : 0;
      activeMinuteIndex = selectedMinute ? minutes.indexOf(selectedMinute) : 0;
    }
  });

  // min/max 比较
  function withinBounds(hour: number, minute: number): boolean {
    if (minTime) {
      const [mh, mm] = minTime.split(':').map(Number);
      if (hour < mh || (hour === mh && minute < mm)) return false;
    }
    if (maxTime) {
      const [Mh, Mm] = maxTime.split(':').map(Number);
      if (hour > Mh || (hour === Mh && minute > Mm)) return false;
    }
    return true;
  }

  function selectTime(h: string, m: string, pm?: boolean) {
    let hour = parseInt(h, 10);
    if (format === '12h') {
      if (pm === true && hour !== 12) hour += 12;
      else if (pm === false && hour === 12) hour = 0;
    }
    if (!withinBounds(hour, parseInt(m, 10))) return;
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
    if (!withinBounds(h, parsedMinutes ?? 0)) return;
    const timeStr = `${String(h).padStart(2, '0')}:${String(parsedMinutes ?? 0).padStart(2, '0')}`;
    if (controlledValue === undefined) internalValue = timeStr;
    onchange?.(timeStr);
  }

  function clear() {
    if (controlledValue === undefined) internalValue = '';
    onchange?.('');
    open = false;
  }

  // 键盘导航：ArrowUp/Down/Home/End/Enter/Esc 在 hours/minutes 列表内
  function handleListKeydown(e: KeyboardEvent, list: 'hours' | 'minutes') {
    const items = list === 'hours' ? hours : minutes;
    let idx = list === 'hours' ? activeHourIndex : activeMinuteIndex;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      idx = idx < items.length - 1 ? idx + 1 : 0;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      idx = idx > 0 ? idx - 1 : items.length - 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      idx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      idx = items.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (idx >= 0) {
        const v = items[idx];
        if (list === 'hours') selectTime(v, selectedMinute ?? minutes[0], format === '12h' ? isPM : undefined);
        else selectTime(selectedHour ?? hours[0], v, format === '12h' ? isPM : undefined);
      }
      return;
    } else if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
      return;
    } else {
      return;
    }
    if (list === 'hours') activeHourIndex = idx;
    else activeMinuteIndex = idx;
    // 同步滚动到可见区
    queueMicrotask(() => {
      const el = document.getElementById(`${list === 'hours' ? hoursListId : minutesListId}-${idx}`);
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  // 弹层打开时把活动项自动滚到可见
  $effect(() => {
    if (!open) return;
    queueMicrotask(() => {
      const h = document.getElementById(`${hoursListId}-${activeHourIndex}`);
      const m = document.getElementById(`${minutesListId}-${activeMinuteIndex}`);
      h?.scrollIntoView({ block: 'nearest' });
      m?.scrollIntoView({ block: 'nearest' });
    });
  });
</script>

<div {...rest} id={tpId} class={cn('pui-time-picker relative', className)} style={style} data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}>
  {#if label}<label for={triggerId} class="block text-sm font-medium text-(--pui-text-secondary) mb-1">{label}</label>{/if}

  <div class="relative">
    <button id={triggerId} type="button" disabled={disabled}
      class={cn('flex w-full items-center justify-between gap-2 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) text-left transition-colors',
        error ? 'border-(--pui-color-error)' : 'border-(--pui-field-border,var(--pui-outline))',
        !disabled && 'cursor-pointer hover:border-(--pui-color-primary)',
        disabled && 'opacity-(--pui-opacity-disabled)')}
      aria-haspopup="listbox"
      aria-expanded={open}
      onclick={() => { if (!disabled) open = !open; }}>
      <span class={cn('flex-1', currentValue ? 'text-(--pui-text-primary)' : 'text-(--pui-text-disabled)')}>
        {currentValue || resolvedPlaceholder}
      </span>
      {#if clearable && currentValue && !disabled}
        <button type="button" aria-label={t.clear}
          class="shrink-0 p-0.5 -m-0.5 rounded-full hover:bg-(--pui-surface-variant)"
          onclick={(e) => { e.stopPropagation(); clear(); }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      {/if}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 text-(--pui-text-secondary)">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 4.5V8l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  {#if open}
    <div role="presentation" transition:scale={{ start: 0.95, duration: 150 }}
      class="absolute z-(--pui-z-overlay) mt-1 w-full min-w-50 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle) p-3"
      onclick={(e) => e.stopPropagation()}>
      <div class="flex items-center gap-1">
        <!-- Hour listbox -->
        <div id={hoursListId} role="listbox" aria-label={t.hours} tabindex="0"
          aria-activedescendant={activeHourIndex >= 0 ? `${hoursListId}-${activeHourIndex}` : undefined}
          onkeydown={(e) => handleListKeydown(e, 'hours')}
          class="flex-1 max-h-45 overflow-y-auto space-y-0.5 text-center scrollbar-thin focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-[-2px] focus:rounded-(--pui-radius-control)">
          {#each hours as h, i (h)}
            <button type="button" id={`${hoursListId}-${i}`}
              role="option"
              aria-selected={h === selectedHour}
              class={cn('w-full px-2 py-1 text-sm rounded-(--pui-radius-control) transition-colors',
                h === selectedHour ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' :
                i === activeHourIndex ? 'bg-(--pui-surface-variant) text-(--pui-text-primary)' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)')}
              onclick={() => selectTime(h, selectedMinute ?? minutes[0], format === '12h' ? isPM : undefined)}>
              {h}
            </button>
          {/each}
        </div>

        <span class="text-lg font-medium text-(--pui-text-primary) px-0.5" aria-hidden="true">:</span>

        <!-- Minute listbox -->
        <div id={minutesListId} role="listbox" aria-label={t.minutes} tabindex="0"
          aria-activedescendant={activeMinuteIndex >= 0 ? `${minutesListId}-${activeMinuteIndex}` : undefined}
          onkeydown={(e) => handleListKeydown(e, 'minutes')}
          class="flex-1 max-h-45 overflow-y-auto space-y-0.5 text-center scrollbar-thin focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-[-2px] focus:rounded-(--pui-radius-control)">
          {#each minutes as m, i (m)}
            <button type="button" id={`${minutesListId}-${i}`}
              role="option"
              aria-selected={m === selectedMinute}
              class={cn('w-full px-2 py-1 text-sm rounded-(--pui-radius-control) transition-colors',
                m === selectedMinute ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' :
                i === activeMinuteIndex ? 'bg-(--pui-surface-variant) text-(--pui-text-primary)' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)')}
              onclick={() => selectTime(selectedHour ?? hours[0], m, format === '12h' ? isPM : undefined)}>
              {m}
            </button>
          {/each}
        </div>

        <!-- AM/PM toggle (12h only) -->
        {#if format === '12h'}
          <div class="flex flex-col gap-1 ml-1" role="group" aria-label={t.am + '/' + t.pm}>
            <button type="button" aria-pressed={!isPM}
              class={cn('px-2 py-1 text-xs rounded-(--pui-radius-control) transition-colors',
                !isPM ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-secondary)')}
              onclick={() => { if (isPM) togglePM(); }}>
              {ampmLabels.am}
            </button>
            <button type="button" aria-pressed={isPM}
              class={cn('px-2 py-1 text-xs rounded-(--pui-radius-control) transition-colors',
                isPM ? 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium' : 'hover:bg-(--pui-surface-variant) text-(--pui-text-secondary)')}
              onclick={() => { if (!isPM) togglePM(); }}>
              {ampmLabels.pm}
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  {#if error}<p class="text-xs text-(--pui-color-error) mt-1" role="alert">{error}</p>{:else if helperText}<p class="text-xs text-(--pui-text-secondary) mt-1">{helperText}</p>{/if}
</div>
