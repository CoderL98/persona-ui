<script lang="ts">
  import { untrack, setContext } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { RadioGroupProps, RadioGroupOrientation } from './radio.types.js';
  let { value: controlledValue, defaultValue, name = `radio-${Math.random().toString(36).slice(2, 6)}`, orientation = 'vertical' as RadioGroupOrientation, disabled = false, label, class: className, style, id, 'data-testid': dataTestId, onchange, children, ...rest }: RadioGroupProps = $props();
  let internalValue = $state(untrack(() => defaultValue ?? ''));
  let currentValue = $derived(controlledValue ?? internalValue);

  // Provide context so Radio children can consume the group name and value
  setContext('radio-group', {
    get name() { return name; },
    get value() { return currentValue; },
    get disabled() { return disabled; },
    onChange: (val: string, e: Event) => {
      if (controlledValue === undefined) internalValue = val;
      onchange?.(val, e);
    }
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.type !== 'radio') return;
    if (controlledValue === undefined) internalValue = target.value;
    onchange?.(target.value, e);
  }
</script>
<fieldset {...rest} id={id} class={cn('pui-radio-group', orientation === 'vertical' ? 'flex flex-col gap-2' : 'flex flex-row flex-wrap gap-4', className)} style={style} data-testid={dataTestId} data-orientation={orientation} onchange={handleChange}>
  {#if label}<legend class="text-sm font-medium text-(--pui-text-primary) mb-1">{label}</legend>{/if}
  {@render children?.()}
</fieldset>
