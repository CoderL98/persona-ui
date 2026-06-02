<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { SliderProps } from './slider.types.js';
  let {
    value: controlledValue,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    range = false,
    disabled = false,
    label,
    showValue = false,
    class: className,
    style,
    id,
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
    oninput,
    onchange,
    ...rest
  }: SliderProps = $props();
  const isRange = $derived(range || Array.isArray(controlledValue) || Array.isArray(defaultValue));
  const initialInternal: number | [number, number] = $derived(
    untrack(() => {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (isRange) return [min, (typeof defaultValue === 'number' ? defaultValue : min) as number];
      return typeof defaultValue === 'number' ? defaultValue : min;
    }),
  );
  let internalValue: number | [number, number] = $state(untrack(() => initialInternal));
  let currentValue = $derived(controlledValue ?? internalValue);
  const [low, high] = $derived.by(() => {
    if (isRange && Array.isArray(currentValue)) return currentValue as [number, number];
    const v = typeof currentValue === 'number' ? currentValue : min;
    return [v, v] as [number, number];
  });
  const lowPct = $derived(((low - min) / (max - min)) * 100);
  const highPct = $derived(((high - min) / (max - min)) * 100);
  function setValue(next: number | [number, number], e: Event) {
    if (controlledValue === undefined) internalValue = next;
    oninput?.(next, e);
  }
  function setChange(next: number | [number, number], e: Event) {
    onchange?.(next, e);
  }
  function handleLow(e: Event) {
    const v = parseFloat((e.target as HTMLInputElement).value);
    const next: [number, number] = [Math.min(v, high), high];
    setValue(next, e);
  }
  function handleHigh(e: Event) {
    const v = parseFloat((e.target as HTMLInputElement).value);
    const next: [number, number] = [low, Math.max(v, low)];
    setValue(next, e);
  }
  function handleChangeLow(e: Event) { const v = parseFloat((e.target as HTMLInputElement).value); setChange([Math.min(v, high), high], e); }
  function handleChangeHigh(e: Event) { const v = parseFloat((e.target as HTMLInputElement).value); setChange([low, Math.max(v, low)], e); }
  const trackVar = 'var(--pui-slider-track-height,6px)';
  const thumbVar = 'var(--pui-slider-thumb-size,20px)';
</script>

<div {...rest} id={id} class={cn('pui-slider relative pt-1 pb-3', className)} style={style} data-testid={dataTestId}>
  {#if label || showValue}
    <div class="flex items-center justify-between mb-1">
      {#if label}<label for={isRange ? `${id || 'slider'}-low` : id || 'slider'} class="text-sm text-(--pui-text-secondary)">{label}</label>{/if}
      {#if showValue}
        <span class="text-sm text-(--pui-text-primary) font-medium">
          {#if isRange}{low} – {high}{:else}{typeof currentValue === 'number' ? currentValue : ''}{/if}
        </span>
      {/if}
    </div>
  {/if}
  <div class="relative h-3">
    <div class={cn('absolute top-1/2 -translate-y-1/2 h-(--track-height) bg-(--track-bg) rounded-full w-full', 'h-3')}
      style="--track-height: {trackVar}; --track-bg: var(--pui-slider-track-bg,var(--pui-surface-variant));">
    </div>
    <div
      class="absolute top-1/2 -translate-y-1/2 h-(--track-height) rounded-full bg-(--pui-color-primary)"
      style="left: {lowPct}%; width: {Math.max(0, highPct - lowPct)}%; --track-height: {trackVar};"
    ></div>
    {#each marks as mark}
      {@const mp = ((mark.value - min) / (max - min)) * 100}
      <div
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-(--pui-outline) data-[active=true]:bg-(--pui-color-primary)"
        data-active={(mark.value >= low && mark.value <= high) || undefined}
        style="left: {mp}%"
        aria-hidden="true"
      ></div>
      {#if mark.label}
        <span
          class="absolute top-full mt-1 -translate-x-1/2 text-[10px] text-(--pui-text-secondary) whitespace-nowrap"
          style="left: {mp}%"
          aria-hidden="true"
        >{mark.label}</span>
      {/if}
    {/each}
    {#if isRange}
      <input
        type="range"
        id={`${id || 'slider'}-low`}
        {min} {max} {step} {disabled}
        value={low}
        aria-label={ariaLabel || label || 'Minimum'}
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={low}
        class="absolute inset-0 w-full h-full opacity-0 disabled:cursor-not-allowed cursor-pointer"
        oninput={handleLow} onchange={handleChangeLow}
      />
      <input
        type="range"
        id={`${id || 'slider'}-high`}
        {min} {max} {step} {disabled}
        value={high}
        aria-label={ariaLabel || label || 'Maximum'}
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={high}
        class="absolute inset-0 w-full h-full opacity-0 disabled:cursor-not-allowed cursor-pointer"
        style="pointer-events: none;"
        oninput={handleHigh} onchange={handleChangeHigh}
      />
    {:else}
      <input
        type="range"
        {id} {min} {max} {step} {disabled}
        value={typeof currentValue === 'number' ? currentValue : min}
        aria-label={ariaLabel || label}
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={typeof currentValue === 'number' ? currentValue : min}
        class="absolute inset-0 w-full h-full opacity-0 disabled:cursor-not-allowed cursor-pointer"
        oninput={(e) => setValue(parseFloat((e.target as HTMLInputElement).value), e)}
        onchange={(e) => setChange(parseFloat((e.target as HTMLInputElement).value), e)}
      />
    {/if}
    {#if !isRange}
      <div
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-(--pui-slider-thumb-bg,var(--pui-color-primary)) shadow-(--pui-elevation-1) pointer-events-none"
        style="left: {lowPct}%; width: {thumbVar}; height: {thumbVar};"
      ></div>
    {/if}
  </div>
</div>
