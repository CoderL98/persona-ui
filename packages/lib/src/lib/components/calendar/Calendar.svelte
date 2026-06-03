<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { CalendarProps } from './calendar.types.js';
  type CalendarTexts = { months: string[]; weekdays: string[]; prevMonth: string; nextMonth: string };
  let { value: controlledValue, defaultValue, min, max, locale = 'en-US', disabledDates = [], texts: localTexts, class: className, style, id, 'data-testid': dataTestId, onchange }: CalendarProps = $props();

  // 用 Intl.DateTimeFormat 本地化月名 / 周缩写；周首日跟随 locale
  function localize(localeStr: string): CalendarTexts {
    try {
      const fmtMonth = new Intl.DateTimeFormat(localeStr, { month: 'long' });
      const fmtWeek = new Intl.DateTimeFormat(localeStr, { weekday: 'short' });
      const months: string[] = [];
      for (let m = 0; m < 12; m++) months.push(fmtMonth.format(new Date(2024, m, 1)));
      const weekdays: string[] = [];
      for (let d = 0; d < 7; d++) weekdays.push(fmtWeek.format(new Date(2024, 0, 7 + d)));
      // 周首日按 locale 经验规则：en/zh 周日；ar/fa 周六；其余 ISO 周一
      const rotation = localeStr.startsWith('en') || localeStr.startsWith('zh') ? 0
        : localeStr.startsWith('ar') || localeStr.startsWith('fa') ? 6
        : 1;
      const rotated = rotation === 0 ? weekdays : [...weekdays.slice(rotation), ...weekdays.slice(0, rotation)];
      return { months, weekdays: rotated, prevMonth: 'Previous month', nextMonth: 'Next month' };
    } catch {
      return {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        prevMonth: 'Previous month',
        nextMonth: 'Next month',
      };
    }
  }
  const localized = $derived(localize(locale));
  const t = $derived({ ...localized, ...localTexts });
  let viewDate = $state(new Date());
  let internalValue = $state(untrack(() => defaultValue ?? undefined));
  let currentValue = $derived(controlledValue ?? internalValue);
  function prevMonth() { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1); }
  function nextMonth() { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1); }
  function selectDay(d: number) {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    if (controlledValue === undefined) internalValue = selected;
    onchange?.(selected);
  }
  function firstDayOfMonth() { return new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay(); }
  function daysInMonth() { return new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate(); }
  function isSelected(d: number) {
    if (!currentValue) return false;
    return currentValue.getFullYear() === viewDate.getFullYear()
      && currentValue.getMonth() === viewDate.getMonth()
      && currentValue.getDate() === d;
  }
  function isDisabled(d: number) {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    if (min && date < min) return true;
    if (max && date > max) return true;
    if (disabledDates.some(dd => dd.getFullYear() === date.getFullYear() && dd.getMonth() === date.getMonth() && dd.getDate() === date.getDate())) return true;
    return false;
  }
  const dayHeaders = $derived(t.weekdays);
  const fd = $derived(firstDayOfMonth());
  const dim = $derived(daysInMonth());
  const monthLabel = $derived(
    new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(viewDate)
  );
</script>
<div id={id} class={cn('pui-calendar inline-block p-4 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-2)', className)} style={style} data-testid={dataTestId}>
  <div class="flex items-center justify-between mb-4">
    <button type="button" aria-label={t.prevMonth} onclick={prevMonth} class="p-1 text-(--pui-text-secondary) hover:text-(--pui-text-primary)"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
    <span class="text-sm font-medium">{monthLabel}</span>
    <button type="button" aria-label={t.nextMonth} onclick={nextMonth} class="p-1 text-(--pui-text-secondary) hover:text-(--pui-text-primary)"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
  </div>
  <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
    {#each dayHeaders as d}<span class="text-(--pui-text-disabled)">{d}</span>{/each}
  </div>
  <div class="grid grid-cols-7 gap-1">
    {#each Array(fd) as _}<span></span>{/each}
    {#each Array(dim) as _, i}
      {@const day = i + 1}
      {@const sel = isSelected(day)}
      {@const dis = isDisabled(day)}
      <button type="button" disabled={dis} onclick={() => { if (!dis) selectDay(day); }}
        class={cn('h-8 w-8 rounded-full text-xs transition-colors',
          dis && 'opacity-(--pui-opacity-disabled) cursor-not-allowed',
          !dis && 'hover:bg-(--pui-surface-variant)',
          sel && 'bg-(--pui-color-primary) text-(--pui-color-on-primary)',
          !sel && !dis && 'text-(--pui-text-primary)')}>{day}</button>
    {/each}
  </div>
</div>

