<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { triggerHaptic } from '../../internal/haptics.js';
  import type { SwitchProps } from './switch.types.js';

  let {
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    label,
    name,
    value,
    required = false,
    class: className,
    style,
    id,
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
    onCheckedChange,
    ...rest
  }: SwitchProps = $props();

  let _autoId = $props.id();
  const fieldId = $derived(id ?? _autoId);
  // Uncontrolled mode — initialize once from defaultChecked
  let internalChecked = $state(untrack(() => defaultChecked));
  // Source of truth: controlled 优先；fallback 到 internal
  const currentChecked = $derived(controlledChecked ?? internalChecked);

  // controlled 模式下，prop 变化时同步更新 internalChecked
  // （确保 onCheckedChange setter 写入后，UI 不会回弹）
  $effect(() => {
    if (controlledChecked !== undefined) {
      internalChecked = controlledChecked;
    }
  });

  function handleChange(e: Event) {
    const next = (e.target as HTMLInputElement).checked;
    if (controlledChecked === undefined) internalChecked = next;
    triggerHaptic('selection');
    onCheckedChange?.(next, e);
  }

  const attrs = $derived(dataAttrs({ checked: currentChecked || undefined, disabled }));
</script>

<!--
  Switch 视觉用 <span> 自绘，原生 <input type="checkbox" role="switch"> 隐形覆盖在上方
  —— 这样既保留 a11y + 原生表单提交，又保留 26px 高度 + 圆角 + 缩略图过渡的视觉设计

  用 checked={...} 单向绑定 + onCheckedChange 回调，避开 bind:checked 函数式在原生 input 上的兼容性问题
  （Svelte 5 函数 bind 仅适用于 $bindable 组件 props）
-->
<span
  {...rest}
  {...attrs}
  class={cn('pui-switch relative inline-flex items-center gap-2', className)}
  style={style}
  data-testid={dataTestId}
>
  <input
    id={fieldId}
    type="checkbox"
    role="switch"
    checked={currentChecked}
    aria-checked={currentChecked}
    {disabled}
    {name}
    {value}
    {required}
    aria-label={ariaLabel || label}
    onchange={handleChange}
    class="peer absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
  />
  <span
    aria-hidden="true"
    class={cn(
      'pointer-events-none inline-flex shrink-0 items-center rounded-full',
      'transition-[background-color,box-shadow] duration-(--pui-duration-swap) ease-(--pui-motion-spring,cubic-bezier(0.2,0.8,0.2,1))',
      'w-(--pui-switch-track-width,44px)',
      'h-(--pui-switch-track-height,26px)',
      currentChecked
        ? 'bg-(--pui-switch-track-checked-bg,var(--pui-color-primary))'
        : 'bg-(--pui-switch-track-bg,var(--pui-ref-gray-30))',
      disabled && 'opacity-(--pui-opacity-disabled)',
      'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2'
    )}
  >
    <span
      class={cn(
        'inline-block rounded-full',
        'bg-(--pui-switch-thumb-bg,var(--pui-ref-gray-0))',
        'shadow-(--pui-switch-thumb-shadow,var(--pui-elevation-1))',
        'transition-transform duration-(--pui-duration-swap) ease-(--pui-motion-spring,cubic-bezier(0.2,0.8,0.2,1))',
        'h-[calc(var(--pui-switch-track-height,26px)-6px)]',
        'w-[calc(var(--pui-switch-track-height,26px)-6px)]',
        currentChecked
          ? 'translate-x-[calc(var(--pui-switch-track-width,44px)-var(--pui-switch-track-height,26px)+3px)]'
          : 'translate-x-[3px]'
      )}
    ></span>
  </span>
  {#if label}
    <label
      for={fieldId}
      class={cn(
        'text-sm select-none cursor-pointer',
        disabled ? 'text-(--pui-text-disabled) cursor-not-allowed' : 'text-(--pui-text-primary)'
      )}
    >
      {label}
    </label>
  {/if}
</span>


