<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { CheckboxProps } from './checkbox.types.js';
  let {
    checked: controlledChecked,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    label,
    description,
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
  }: CheckboxProps = $props();

  const fieldId = $derived(id || `pui-checkbox-${Math.random().toString(36).slice(2, 8)}`);
  let internalChecked = $state(false);
  let currentChecked = $derived(controlledChecked ?? internalChecked);
  $effect(() => { if (controlledChecked === undefined && defaultChecked) internalChecked = true; });

  function handleChange(e: Event) {
    const next = (e.target as HTMLInputElement).checked;
    if (controlledChecked === undefined) internalChecked = next;
    onCheckedChange?.(next, e);
  }

  const attrs = $derived(
    dataAttrs({
      checked: currentChecked || undefined,
      indeterminate: indeterminate || undefined,
      disabled,
    }),
  );
</script>

<span
  {...rest}
  {...attrs}
  class={cn('pui-checkbox inline-flex items-center gap-2', className)}
  style={style}
  data-testid={dataTestId}
>
  <!-- 原生 input 参与表单提交；视觉层用 label + ::after 自绘 -->
  <input
    id={fieldId}
    type="checkbox"
    bind:indeterminate
    checked={currentChecked}
    {disabled}
    {name}
    {value}
    {required}
    aria-label={ariaLabel || label}
    aria-describedby={description ? `${fieldId}-desc` : undefined}
    onchange={handleChange}
    class="peer absolute h-px w-px opacity-0 pointer-events-none"
  />
  <span
    aria-hidden="true"
    class={cn(
      'pui-state-layer inline-flex items-center justify-center shrink-0 transition-all',
      'h-[var(--pui-checkbox-size,22px)] w-[var(--pui-checkbox-size,22px)] rounded-[var(--pui-checkbox-radius,var(--pui-radius-control))]',
      'border-2',
      currentChecked || indeterminate
        ? 'bg-[var(--pui-checkbox-checked-bg,var(--pui-color-primary))] border-[var(--pui-checkbox-checked-bg,var(--pui-color-primary))]'
        : 'bg-transparent border-[var(--pui-checkbox-border,var(--pui-outline))]',
      disabled && 'opacity-(--pui-opacity-disabled) cursor-not-allowed',
      !disabled && 'cursor-pointer peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
    )}
  >
    {#if indeterminate}
      <svg width="12" height="12" viewBox="0 0 12 2" aria-hidden="true"
        ><rect width="12" height="2" rx="1" fill="var(--pui-color-on-primary,white)" /></svg
      >
    {:else if currentChecked}
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"
        ><path
          d="M2 6l3 3 5-5"
          stroke="var(--pui-checkbox-icon-color,var(--pui-color-on-primary,white))"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg
      >
    {/if}
  </span>
  {#if label || description}
    <span class={cn('cursor-default', disabled && 'opacity-(--pui-opacity-disabled) cursor-not-allowed')}>
      {#if label}
        <label
          for={fieldId}
          class="text-sm font-medium text-(--pui-text-primary) cursor-pointer"
        >
          {label}
        </label>
      {/if}
      {#if description}
        <p id={`${fieldId}-desc`} class="text-xs text-(--pui-text-secondary)">{description}</p>
      {/if}
    </span>
  {/if}
</span>
