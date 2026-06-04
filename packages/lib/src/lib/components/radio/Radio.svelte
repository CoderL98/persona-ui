<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { getContext } from 'svelte';
  import type { RadioProps } from './radio.types.js';
  let { value, label, disabled = false, class: className, style, id, 'data-testid': dataTestId, ...rest }: RadioProps = $props();
  const groupCtx = getContext<{ name: string; value: string; disabled: boolean; onChange: (val: string, e: Event) => void } | undefined>('radio-group');
  const groupName = $derived(groupCtx?.name ?? '');
  const isGroupDisabled = $derived(groupCtx?.disabled ?? false);
  const isChecked = $derived(groupCtx ? groupCtx.value === value : undefined);
  const attrs = $derived(dataAttrs({ disabled: disabled || undefined }));
  const inputId = $derived(`${id || `pui-radio-${value}`}-input`);

  function handleClick(e: Event) {
    if (disabled || isGroupDisabled) return;
    groupCtx?.onChange(value, e);
  }
</script>
<div {...rest} {...attrs} id={id} class={cn('pui-radio inline-flex items-center gap-2', className)} style={style} data-testid={dataTestId} data-value={value}>
  <input id={inputId} type="radio" class="sr-only peer" {value} name={groupName} checked={isChecked} disabled={disabled || isGroupDisabled} aria-label={label || value} onchange={handleClick} />
  <span class={cn('inline-flex items-center justify-center shrink-0 transition-all',
    'h-(--pui-radio-size,22px) w-(--pui-radio-size,22px) rounded-full border-2',
    'peer-checked:border-(--pui-radio-checked-border,var(--pui-color-primary)) peer-checked:bg-(--pui-radio-checked-bg,var(--pui-color-primary))',
    'border-(--pui-radio-border,var(--pui-outline))',
    (disabled || isGroupDisabled) && 'opacity-(--pui-opacity-disabled)')}>
    <span class="h-2 w-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></span>
  </span>
  {#if label}<label for={inputId} class={cn('text-sm', (disabled || isGroupDisabled) ? 'text-(--pui-text-disabled)' : 'text-(--pui-text-primary) cursor-pointer')}>{label}</label>{/if}
</div>
