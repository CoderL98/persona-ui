<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { TabsProps, TabItem } from './tabs.types.js';

  let {
    value: controlledValue,
    defaultValue,
    items = [],
    orientation = 'horizontal',
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onValueChange,
    ...rest
  }: TabsProps = $props();

  let internalValue = $state(
    untrack(() => defaultValue ?? (items[0]?.value || '')),
  );
  let currentValue = $derived(controlledValue ?? internalValue);
  let listEl: HTMLDivElement | null = $state(null);
  // 滑动 indicator 位置（运行时测量）
  let indicator = $state({ x: 0, y: 0, w: 0, h: 0, ready: false });

  function select(v: string) {
    if (controlledValue === undefined) internalValue = v;
    onValueChange?.(v);
  }

  // 键盘导航：ArrowLeft/Right 切换 tab（水平），Home/End 跳到首/尾
  function handleKeydown(e: KeyboardEvent) {
    if (!items.length) return;
    const enabledIdx = items
      .map((it, i) => ({ it, i }))
      .filter(({ it }) => !it.disabled);
    if (!enabledIdx.length) return;
    const currentPos = enabledIdx.findIndex(({ i }) => i === items.findIndex((x) => x.value === currentValue));
    let targetPos = currentPos;
    const handled = isVertical ? ['ArrowDown', 'ArrowUp'] : ['ArrowRight', 'ArrowLeft'];
    const next = isVertical ? ['ArrowDown'] : ['ArrowRight'];
    const prev = isVertical ? ['ArrowUp'] : ['ArrowLeft'];
    if (next.includes(e.key)) targetPos = currentPos < 0 ? 0 : Math.min(currentPos + 1, enabledIdx.length - 1);
    else if (prev.includes(e.key)) targetPos = currentPos < 0 ? 0 : Math.max(currentPos - 1, 0);
    else if (e.key === 'Home') targetPos = 0;
    else if (e.key === 'End') targetPos = enabledIdx.length - 1;
    else if (!handled.includes(e.key)) return;
    e.preventDefault();
    const target = enabledIdx[targetPos];
    if (target) {
      select(target.it.value);
      queueMicrotask(() => {
        const el = listEl?.querySelector<HTMLButtonElement>(`[data-tab-value="${target.it.value}"]`);
        el?.focus();
      });
    }
  }

  // 监听 currentValue / items 变化后测量选中项的位置
  $effect(() => {
    void currentValue;
    void items;
    queueMicrotask(() => {
      if (!listEl) return;
      const active = listEl.querySelector<HTMLButtonElement>(
        '[role="tab"][aria-selected="true"]',
      );
      if (!active) {
        indicator = { x: 0, y: 0, w: 0, h: 0, ready: false };
        return;
      }
      const parentRect = listEl.getBoundingClientRect();
      const r = active.getBoundingClientRect();
      indicator = {
        x: r.left - parentRect.left,
        y: r.top - parentRect.top,
        w: r.width,
        h: r.height,
        ready: true,
      };
    });
  });

  const isVertical = $derived(orientation === 'vertical');
</script>

<div
  bind:this={listEl}
  {...rest}
  id={id}
  role="tablist"
  aria-orientation={orientation}
  class={cn(
    'pui-tabs relative flex',
    isVertical ? 'flex-col' : 'flex-row border-b border-(--pui-outline-subtle)',
    className
  )}
  style={style}
  data-testid={dataTestId}
  onkeydown={handleKeydown}
>
  <!-- 滑动 indicator：Apple underline / Material 滑块 -->
  {#if indicator.ready}
    <span
      aria-hidden="true"
      class={cn(
        'pui-tab-indicator pointer-events-none absolute z-0',
        isVertical
          ? 'left-0 w-0.5 rounded-full bg-(--pui-color-primary)'
          : 'bottom-0 h-0.5 rounded-full bg-(--pui-color-primary)',
      )}
      style={isVertical
        ? `transform: translateY(${indicator.y}px); height: ${indicator.h}px;`
        : `transform: translateX(${indicator.x}px); width: ${indicator.w}px;`}
    ></span>
  {/if}
  {#each items as item}
    <button
      type="button"
      role="tab"
      aria-selected={item.value === currentValue}
      aria-disabled={item.disabled || undefined}
      data-tab-value={item.value}
      tabindex={item.value === currentValue ? 0 : -1}
      class={cn(
        'relative z-10 px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        item.value === currentValue
          ? 'text-(--pui-color-primary)'
          : 'text-(--pui-text-secondary) hover:text-(--pui-text-primary)',
        item.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none'
      )}
      onclick={() => {
        if (!item.disabled) select(item.value);
      }}
    >
      {item.label}
    </button>
  {/each}
</div>
