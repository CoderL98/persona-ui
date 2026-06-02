<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { clickOutside } from '../../internal/click-outside.js';
  import type { DateRangePickerProps, DateRangeValue, DateRangeGranularity } from './date-range-picker.types.js';

  type DateRangePickerTexts = {
    months: string[]; weekdays: string[]; prevMonth: string; nextMonth: string;
    monthsShort: string[]; prevDecade: string; nextDecade: string;
    dayCount: string; selectStart: string; selectEnd: string; selectDateFirst: string;
    startLabel: string; endLabel: string; startHour: string; startMinute: string; startSecond: string;
    endHour: string; endMinute: string; endSecond: string; clear: string; apply: string; done: string;
  };

  let {
    value: controlledValue,
    defaultValue,
    granularity = 'day' as DateRangeGranularity,
    min,
    max,
    locale = 'en-US',
    placeholder,
    texts: localTexts,
    label,
    helperText,
    error,
    disabled = false,
    footer,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onchange,
    ...rest
  }: DateRangePickerProps = $props();

  const defaults: DateRangePickerTexts = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    prevMonth: 'Previous month', nextMonth: 'Next month',
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    prevDecade: 'Previous decade', nextDecade: 'Next decade',
    dayCount: '{days} days', selectStart: 'Select start date…', selectEnd: 'Select end date…', selectDateFirst: '(select date first)',
    startLabel: '● Start', endLabel: '● End',
    startHour: 'Start hour', startMinute: 'Start minute', startSecond: 'Start second',
    endHour: 'End hour', endMinute: 'End minute', endSecond: 'End second',
    clear: 'Clear', apply: 'Apply', done: 'Done',
  };
  const t = $derived({ ...defaults, ...localTexts });
  const resolvedPlaceholder = $derived(placeholder ?? t.selectStart);

  // ── Core state ──
  let internalValue = $state<DateRangeValue>(untrack(() => defaultValue ?? { start: null, end: null }));
  let currentValue = $derived(controlledValue ?? internalValue);
  let open = $state(false);
  let selecting = $state<'start' | 'end'>('start');

  // ── Time state (separate for start and end) ──
  let startHour = $state(12);
  let startMinute = $state(0);
  let startSecond = $state(0);
  let endHour = $state(12);
  let endMinute = $state(0);
  let endSecond = $state(0);

  // ── View navigation ──
  let viewYear = $state(new Date().getFullYear());
  let viewMonth = $state(new Date().getMonth());

  const drpId = $derived(id || `pui-daterange-${Math.random().toString(36).slice(2, 6)}`);
  const triggerId = $derived(`${drpId}-trigger`);

  const showTime = $derived(granularity === 'hour' || granularity === 'minute' || granularity === 'second');
  const showMinutes = $derived(granularity === 'minute' || granularity === 'second');
  const showSeconds = $derived(granularity === 'second');

  // ── Helpers ──
  const months = $derived(t.months);
  const monthAbbr = $derived(t.monthsShort);
  const days = $derived(t.weekdays);

  function datesEqual(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  function cloneWithTime(base: Date | null, h: number, m: number, s: number): Date | null {
    if (!base) return null;
    return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, s);
  }

  // ── Value management ──
  function setRange(start: Date | null, end: Date | null) {
    const next: DateRangeValue = { start, end };
    if (controlledValue === undefined) internalValue = next;
    onchange?.(next);
  }

  function clearRange() {
    setRange(null, null);
    selecting = 'start';
  }

  function confirmRange() {
    const s = cloneWithTime(currentValue.start, showTime ? startHour : 0, showMinutes ? startMinute : 0, showSeconds ? startSecond : 0);
    const e = cloneWithTime(currentValue.end, showTime ? endHour : 0, showMinutes ? endMinute : 0, showSeconds ? endSecond : 0);
    setRange(s, e);
    open = false;
  }

  // ── Display formatting ──
  function formatValue(d: Date | null): string {
    if (!d) return '';
    const parts: string[] = [];
    if (granularity === 'year') parts.push(d.toLocaleDateString(locale, { year: 'numeric' }));
    else if (granularity === 'month') parts.push(d.toLocaleDateString(locale, { year: 'numeric', month: 'short' }));
    else parts.push(d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }));
    if (showTime) {
      let time = String(d.getHours()).padStart(2, '0');
      if (showMinutes) time += ':' + String(d.getMinutes()).padStart(2, '0');
      if (showSeconds) time += ':' + String(d.getSeconds()).padStart(2, '0');
      parts.push(time);
    }
    return parts.join(' ');
  }

  const displayText = $derived.by(() => {
    if (!currentValue.start) return resolvedPlaceholder;
    if (!currentValue.end) return `${formatValue(currentValue.start)} – …`;
    return `${formatValue(currentValue.start)} – ${formatValue(currentValue.end)}`;
  });

  // ── Date selection logic ──
  function selectDatePart(year: number, month: number, day: number) {
    if (selecting === 'start') {
      const d = new Date(year, month, day, startHour, startMinute, startSecond);
      setRange(d, null);
      selecting = 'end';
    } else {
      const s = currentValue.start;
      const d = new Date(year, month, day, endHour, endMinute, endSecond);
      // If clicked before start, reset as new start
      if (s && d <= s) {
        setRange(d, null);
        selecting = 'end';
      } else {
        setRange(s, d);
        selecting = 'start';
        // Auto-close only for day granularity without time
        if (!showTime) open = false;
      }
    }
  }

  function selectYear(yr: number) {
    if (selecting === 'start') {
      setRange(new Date(yr, 0, 1), null);
      selecting = 'end';
    } else {
      const s = currentValue.start;
      const d = new Date(yr, 0, 1);
      if (s && d <= s) { setRange(d, null); selecting = 'end'; }
      else { setRange(s, d); selecting = 'start'; open = false; }
    }
  }

  function selectMonth(yr: number, mo: number) {
    if (selecting === 'start') {
      setRange(new Date(yr, mo, 1), null);
      selecting = 'end';
    } else {
      const s = currentValue.start;
      const d = new Date(yr, mo, 1);
      if (s && d <= s) { setRange(d, null); selecting = 'end'; }
      else { setRange(s, d); selecting = 'start'; open = false; }
    }
  }

  // ── Calendar helpers ──
  let rightMonth = $derived.by(() => {
    if (viewMonth === 11) return { year: viewYear + 1, month: 0 };
    return { year: viewYear, month: viewMonth + 1 };
  });

  function prevMonth() { if (viewMonth === 0) { viewYear--; viewMonth = 11; } else viewMonth--; }
  function nextMonth() { if (viewMonth === 11) { viewYear++; viewMonth = 0; } else viewMonth++; }

  function buildMonthGrid(yr: number, mo: number) {
    const mDate = new Date(yr, mo, 1);
    const dim = new Date(yr, mo + 1, 0).getDate();
    const fd = mDate.getDay();
    const weeks: number[][] = [];
    let row: number[] = [];
    for (let i = 0; i < fd; i++) row.push(0);
    for (let d = 1; d <= dim; d++) {
      row.push(d);
      if (row.length === 7) { weeks.push(row); row = []; }
    }
    if (row.length > 0) { while (row.length < 7) row.push(0); weeks.push(row); }
    return { mDate, weeks, year: yr, month: mo };
  }

  const leftGrid = $derived(buildMonthGrid(viewYear, viewMonth));
  const rightGrid = $derived(buildMonthGrid(rightMonth.year, rightMonth.month));

  // ── Range helpers for day grids ──
  function isInRange(d: Date): boolean {
    const s = currentValue.start, e = currentValue.end;
    if (!s || !e) return false;
    return d > s && d < e;
  }
  function isRangeStart(d: Date): boolean { return currentValue.start ? datesEqual(d, currentValue.start) : false; }
  function isRangeEnd(d: Date): boolean { return currentValue.end ? datesEqual(d, currentValue.end) : false; }

  // ── Year granularity ──
  const decadeStart = $derived(Math.floor(viewYear / 10) * 10);
  const yearsLeft = $derived(Array.from({ length: 10 }, (_, i) => decadeStart + i));
  const yearsRight = $derived(Array.from({ length: 10 }, (_, i) => decadeStart + 10 + i));
  function prevDecade() { viewYear -= 10; }
  function nextDecade() { viewYear += 10; }

  // ── Days calculation ──
  function daysBetween(a: Date, b: Date): number {
    return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  }
</script>

<div {...rest} id={drpId} class={cn('pui-date-range-picker relative', className)} style={style} data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}>
  {#if label}<label for={triggerId} class="block text-sm font-medium text-(--pui-text-secondary) mb-1">{label}</label>{/if}

  <button id={triggerId} type="button" disabled={disabled}
    class={cn('flex w-full items-center justify-between gap-2 bg-(--pui-field-bg,var(--pui-surface-base)) rounded-(--pui-field-radius,var(--pui-radius-control)) border px-(--pui-field-padding-x,var(--pui-space-3)) py-(--pui-field-padding-y,var(--pui-space-2)) text-left transition-colors',
      error ? 'border-(--pui-color-error)' : 'border-(--pui-field-border,var(--pui-outline))',
      !disabled && 'cursor-pointer hover:border-(--pui-color-primary)',
      disabled && 'opacity-(--pui-opacity-disabled)')}
    onclick={() => { if (!disabled) open = !open; }}>
    <span class={cn('flex-1 truncate text-sm', currentValue.start ? 'text-(--pui-text-primary)' : 'text-(--pui-text-disabled)')}>
      {displayText}
    </span>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 text-(--pui-text-secondary)">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <path d="M2 6h12" stroke="currentColor" stroke-width="1.5"/>
      <path d="M5 1.5V4M11 1.5V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </button>

  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div role="presentation" transition:scale={{ start: 0.95, duration: 150 }}
      class="absolute z-(--pui-z-overlay) mt-1 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle) p-4 min-w-[320px]"
      onclick={(e) => e.stopPropagation()}>

      <!-- ===== YEAR GRANULARITY ===== -->
      {#if granularity === 'year'}
        <div class="flex items-center justify-between mb-4">
          <button type="button" aria-label={t.prevDecade} onclick={prevDecade} class="p-1 text-(--pui-text-secondary) hover:text-(--pui-text-primary)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <span class="text-sm font-medium text-(--pui-text-primary)">{decadeStart} – {decadeStart + 19}</span>
          <button type="button" aria-label={t.nextDecade} onclick={nextDecade} class="p-1 text-(--pui-text-secondary) hover:text-(--pui-text-primary)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="flex gap-6">
          {#each [yearsLeft, yearsRight] as years}
            <div class="flex-1 space-y-1">
              {#each years as yr}
                {@const isS = currentValue.start?.getFullYear() === yr}
                {@const isE = currentValue.end?.getFullYear() === yr}
                {@const inR = currentValue.start && currentValue.end && yr > currentValue.start.getFullYear() && yr < currentValue.end.getFullYear()}
                <button type="button"
                  class={cn('w-full px-3 py-1.5 text-sm rounded-(--pui-radius-control) transition-colors text-center',
                    isS && 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium rounded-r-none',
                    isE && 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium rounded-l-none',
                    inR && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
                    !isS && !isE && !inR && 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)')}
                  onclick={() => selectYear(yr)}>
                  {yr}
                </button>
              {/each}
            </div>
          {/each}
        </div>

      <!-- ===== MONTH GRANULARITY ===== -->
      {:else if granularity === 'month'}
        <div class="flex gap-6">
          {#each [0, 1] as offset}
            <div class="flex-1 min-w-45">
              <div class="text-center text-sm font-medium text-(--pui-text-primary) mb-2">{viewYear + offset}</div>
              <div class="grid grid-cols-3 gap-2">
                {#each monthAbbr as m, idx}
                  {@const mo = idx}
                  {@const d = new Date(viewYear + offset, mo, 1)}
                  {@const isS = currentValue.start ? datesEqual(d, currentValue.start) : false}
                  {@const isE = currentValue.end ? datesEqual(d, currentValue.end) : false}
                  {@const inR = currentValue.start && currentValue.end && d > currentValue.start && d < currentValue.end}
                  <button type="button"
                    class={cn('px-2 py-1.5 text-xs rounded-(--pui-radius-control) transition-colors text-center',
                      isS && 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium',
                      isE && 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium',
                      inR && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
                      !isS && !isE && !inR && 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)')}
                    onclick={() => selectMonth(viewYear + offset, mo)}>
                    {m}
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>

      <!-- ===== DAY / HOUR / MINUTE / SECOND GRANULARITY ===== -->
      {:else}
        <!-- Month navigation -->
        <div class="flex items-center justify-between mb-4 gap-4">
          <button type="button" aria-label={t.prevMonth} onclick={prevMonth} class="p-1 text-(--pui-text-secondary) hover:text-(--pui-text-primary)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <span class="text-sm font-medium text-(--pui-text-primary)">{months[leftGrid.mDate.getMonth()]} {leftGrid.mDate.getFullYear()}</span>
          <span class="text-sm font-medium text-(--pui-text-primary)">{months[rightGrid.mDate.getMonth()]} {rightGrid.mDate.getFullYear()}</span>
          <button type="button" aria-label={t.nextMonth} onclick={nextMonth} class="p-1 text-(--pui-text-secondary) hover:text-(--pui-text-primary)">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>

        <!-- Two month grids side by side -->
        <div class="flex gap-6">
          {#each [leftGrid, rightGrid] as { mDate, weeks }}
            <div class="flex-1 min-w-50">
              <div class="grid grid-cols-7 gap-1 text-center text-xs mb-1">
                {#each days as d}<span class="text-(--pui-text-disabled) py-1">{d}</span>{/each}
              </div>
              {#each weeks as week}
                <div class="grid grid-cols-7 gap-1 text-center text-xs">
                  {#each week as day}
                    {#if day === 0}
                      <span></span>
                    {:else}
                      {@const date = new Date(mDate.getFullYear(), mDate.getMonth(), day)}
                      {@const isS = isRangeStart(date)}
                      {@const isE = isRangeEnd(date)}
                      {@const inR = isInRange(date)}
                      {@const isToday = datesEqual(date, new Date())}
                      <button type="button" aria-label={date.toLocaleDateString(locale)}
                        class={cn('h-8 w-8 rounded-full text-xs transition-colors relative',
                          isS && 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium rounded-r-none',
                          isE && 'bg-(--pui-color-primary) text-(--pui-color-on-primary) font-medium rounded-l-none',
                          inR && !isS && !isE && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
                          !isS && !isE && !inR && 'hover:bg-(--pui-surface-variant) text-(--pui-text-primary)',
                          isToday && !isS && !isE && !inR && 'ring-1 ring-(--pui-color-primary) ring-inset',
                          currentValue.start && !currentValue.end && selecting === 'end' && 'hover:bg-(--pui-color-primary) hover:text-(--pui-color-on-primary)')}
                        onclick={() => selectDatePart(mDate.getFullYear(), mDate.getMonth(), day)}>
                        {day}
                      </button>
                    {/if}
                  {/each}
                </div>
              {/each}
            </div>
          {/each}
        </div>

        <!-- Time selectors (hour/minute/second granularity) — separate for Start and End -->
        {#if showTime}
          <div class="flex gap-6 mt-4 pt-3 border-t border-(--pui-outline-subtle)">
            <!-- Start time -->
            <div class="flex-1">
              <div class="flex items-center gap-1 mb-1">
                <span class="text-xs font-medium text-(--pui-color-primary)">● Start</span>
                {#if !currentValue.start}
                  <span class="text-[10px] text-(--pui-text-disabled)">{t.selectDateFirst}</span>
                {/if}
              </div>
              <div class="flex items-center gap-1">
                <select aria-label={t.startHour} bind:value={startHour} disabled={!currentValue.start}
                  class={cn('flex-1 bg-(--pui-surface-variant) text-(--pui-text-primary) rounded-(--pui-radius-control) px-1 py-1 text-sm border border-(--pui-outline-subtle) disabled:opacity-(--pui-opacity-disabled)', !currentValue.start && 'cursor-not-allowed',
                    !showMinutes && 'rounded-r-(--pui-radius-control)')}>
                  {#each Array(24) as _, i}<option value={i}>{String(i).padStart(2,'0')}</option>{/each}
                </select>
                {#if showMinutes}
                  <span class="text-(--pui-text-primary) font-medium">:</span>
                  <select aria-label={t.startMinute} bind:value={startMinute} disabled={!currentValue.start}
                    class={cn('flex-1 bg-(--pui-surface-variant) text-(--pui-text-primary) rounded-(--pui-radius-control) px-1 py-1 text-sm border border-(--pui-outline-subtle) disabled:opacity-(--pui-opacity-disabled)', !currentValue.start && 'cursor-not-allowed',
                      !showSeconds && 'rounded-r-(--pui-radius-control)')}>
                    {#each Array(60) as _, i}<option value={i}>{String(i).padStart(2,'0')}</option>{/each}
                  </select>
                {/if}
                {#if showSeconds}
                  <span class="text-(--pui-text-primary) font-medium">:</span>
                  <select aria-label={t.startSecond} bind:value={startSecond} disabled={!currentValue.start}
                    class={cn('flex-1 bg-(--pui-surface-variant) text-(--pui-text-primary) rounded-(--pui-radius-control) px-1 py-1 text-sm border border-(--pui-outline-subtle) disabled:opacity-(--pui-opacity-disabled)', !currentValue.start && 'cursor-not-allowed')}>
                    {#each Array(60) as _, i}<option value={i}>{String(i).padStart(2,'0')}</option>{/each}
                  </select>
                {/if}
              </div>
            </div>

            <!-- End time -->
            <div class="flex-1">
              <div class="flex items-center gap-1 mb-1">
                <span class="text-xs font-medium text-(--pui-color-error)">● End</span>
                {#if !currentValue.end}
                  <span class="text-[10px] text-(--pui-text-disabled)">{t.selectDateFirst}</span>
                {/if}
              </div>
              <div class="flex items-center gap-1">
                <select aria-label={t.endHour} bind:value={endHour} disabled={!currentValue.end}
                  class={cn('flex-1 bg-(--pui-surface-variant) text-(--pui-text-primary) rounded-(--pui-radius-control) px-1 py-1 text-sm border border-(--pui-outline-subtle) disabled:opacity-(--pui-opacity-disabled)', !currentValue.end && 'cursor-not-allowed',
                    !showMinutes && 'rounded-r-(--pui-radius-control)')}>
                  {#each Array(24) as _, i}<option value={i}>{String(i).padStart(2,'0')}</option>{/each}
                </select>
                {#if showMinutes}
                  <span class="text-(--pui-text-primary) font-medium">:</span>
                  <select aria-label={t.endMinute} bind:value={endMinute} disabled={!currentValue.end}
                    class={cn('flex-1 bg-(--pui-surface-variant) text-(--pui-text-primary) rounded-(--pui-radius-control) px-1 py-1 text-sm border border-(--pui-outline-subtle) disabled:opacity-(--pui-opacity-disabled)', !currentValue.end && 'cursor-not-allowed',
                      !showSeconds && 'rounded-r-(--pui-radius-control)')}>
                    {#each Array(60) as _, i}<option value={i}>{String(i).padStart(2,'0')}</option>{/each}
                  </select>
                {/if}
                {#if showSeconds}
                  <span class="text-(--pui-text-primary) font-medium">:</span>
                  <select aria-label={t.endSecond} bind:value={endSecond} disabled={!currentValue.end}
                    class={cn('flex-1 bg-(--pui-surface-variant) text-(--pui-text-primary) rounded-(--pui-radius-control) px-1 py-1 text-sm border border-(--pui-outline-subtle) disabled:opacity-(--pui-opacity-disabled)', !currentValue.end && 'cursor-not-allowed')}>
                    {#each Array(60) as _, i}<option value={i}>{String(i).padStart(2,'0')}</option>{/each}
                  </select>
                {/if}
              </div>
            </div>
          </div>
        {/if}
      {/if}

      <!-- ===== FOOTER with Confirm button for time granularities ===== -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-(--pui-outline-subtle)">
        <div class="text-xs text-(--pui-text-secondary)">
          {#if selecting === 'end' && currentValue.start}
            Select end date…
          {:else if currentValue.start && currentValue.end}
            {#if showTime}
              {formatValue(currentValue.start)} – {formatValue(currentValue.end)}
            {:else if granularity === 'day'}
              {formatValue(currentValue.start)} – {formatValue(currentValue.end)}
              <span class="ml-1 text-(--pui-text-disabled)">({t.dayCount.replace('{days}', String(daysBetween(currentValue.start, currentValue.end)))})</span>
            {:else}
              {formatValue(currentValue.start)} – {formatValue(currentValue.end)}
            {/if}
          {:else}
            Select start date…
          {/if}
        </div>
        <div class="flex items-center gap-2">
          {#if currentValue.start || currentValue.end}
            <button type="button" class="text-xs text-(--pui-text-secondary) hover:text-(--pui-color-primary) underline" onclick={clearRange}>Clear</button>
          {/if}
          {#if showTime && currentValue.start && currentValue.end}
            <button type="button"
              class="px-3 py-1 text-xs font-medium rounded-(--pui-radius-control) bg-(--pui-color-primary) text-(--pui-color-on-primary) hover:opacity-90 transition-opacity"
              onclick={confirmRange}>
              Apply
            </button>
          {:else if granularity === 'day' && currentValue.start && currentValue.end}
            <button type="button" class="px-3 py-1 text-xs font-medium rounded-(--pui-radius-control) bg-(--pui-color-primary) text-(--pui-color-on-primary) hover:opacity-90 transition-opacity"
              onclick={() => { open = false; }}>
              Done
            </button>
          {/if}
          {#if footer}
            {@render footer()}
          {/if}
        </div>
      </div>
    </div>
  {/if}

  {#if error}<p class="text-xs text-(--pui-color-error) mt-1" role="alert">{error}</p>{:else if helperText}<p class="text-xs text-(--pui-text-secondary) mt-1">{helperText}</p>{/if}
</div>
