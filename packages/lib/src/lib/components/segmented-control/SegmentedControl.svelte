<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type {
    SegmentedControlProps,
    SegmentItem,
  } from './segmented-control.types.js';

  let {
    value: controlledValue,
    defaultValue,
    items = [],
    disabled = false,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onchange,
    ...rest
  }: SegmentedControlProps = $props();

  let internalValue = $state(
    untrack(() => defaultValue ?? (items[0]?.value || '')),
  );
  let currentValue = $derived(controlledValue ?? internalValue);
  let trackEl: HTMLDivElement | null = $state(null);
  let thumb = $state({ x: 0, w: 0, ready: false });

  function select(v: string) {
    if (controlledValue === undefined) internalValue = v;
    onchange?.(v);
  }

  // 键盘导航：ArrowLeft/Right 切换，Home/End 跳到首尾
  function handleKeydown(e: KeyboardEvent) {
    if (!items.length) return;
    const enabled = items
      .map((it, i) => ({ it, i }))
      .filter(({ it }) => !it.disabled && !disabled);
    if (!enabled.length) return;
    const currentPos = enabled.findIndex(({ i }) => i === items.findIndex((x) => x.value === currentValue));
    let targetPos = currentPos;
    if (e.key === 'ArrowRight') targetPos = currentPos < 0 ? 0 : (currentPos + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') targetPos = currentPos < 0 ? enabled.length - 1 : (currentPos - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') targetPos = 0;
    else if (e.key === 'End') targetPos = enabled.length - 1;
    else return;
    e.preventDefault();
    const target = enabled[targetPos];
    if (target) {
      select(target.it.value);
      queueMicrotask(() => {
        const el = trackEl?.querySelector<HTMLButtonElement>(`[data-seg-value="${target.it.value}"]`);
        el?.focus();
      });
    }
  }

  $effect(() => {
    void currentValue;
    void items;
    queueMicrotask(() => {
      if (!trackEl) return;
      const active = trackEl.querySelector<HTMLButtonElement>(
        '[aria-checked="true"]',
      );
      if (!active) {
        thumb = { x: 0, w: 0, ready: false };
        return;
      }
      const parentRect = trackEl.getBoundingClientRect();
      const r = active.getBoundingClientRect();
      thumb = {
        x: r.left - parentRect.left,
        w: r.width,
        ready: true,
      };
    });
  });
</script>

<div
  bind:this={trackEl}
  {...rest}
  id={id}
  role="radiogroup"
  class={cn(
    'pui-segmented-control relative inline-flex rounded-(--pui-radius-control) bg-(--pui-surface-variant) p-0.5',
    disabled && 'opacity-(--pui-opacity-disabled)',
    className
  )}
  style={style}
  data-testid={dataTestId}
  onkeydown={handleKeydown}
>
  {#if thumb.ready}
    <span
      aria-hidden="true"
      class="pui-segment-thumb pointer-events-none absolute inset-y-0.5 left-0 rounded-[calc(var(--pui-radius-control)-2px)]
             bg-(--pui-surface-base) shadow-(--pui-elevation-1)"
      style="transform: translateX({thumb.x}px); width: {thumb.w}px;"
    ></span>
  {/if}
  {#each items as item}
    <button
      type="button"
      role="radio"
      aria-checked={item.value === currentValue}
      aria-disabled={item.disabled || disabled || undefined}
      data-seg-value={item.value}
      tabindex={item.value === currentValue ? 0 : -1}
      class={cn(
        'relative z-10 px-3 py-1.5 text-sm font-medium rounded-[calc(var(--pui-radius-control)-2px)] transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        item.value === currentValue
          ? 'text-(--pui-text-primary)'
          : 'text-(--pui-text-secondary) hover:text-(--pui-text-primary)',
        (item.disabled || disabled) && 'pointer-events-none'
      )}
      onclick={() => {
        if (!item.disabled && !disabled) select(item.value);
      }}
    >
      {item.label}
    </button>
  {/each}
</div>
