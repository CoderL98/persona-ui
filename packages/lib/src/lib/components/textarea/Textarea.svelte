<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { uniqueId } from '../../internal/id.js';
  import type { TextareaProps, TextareaResize } from './textarea.types.js';
  let { value: controlledValue = undefined, defaultValue = '', label, placeholder, helperText, error, disabled = false, readonly = false, required = false, minlength, maxlength, rows = 3, resize = 'vertical' as TextareaResize, name, leading, trailing, inputProps = {}, class: className, style, id, 'aria-label': ariaLabel, 'data-testid': dataTestId, oninput, onchange, onfocus, onblur, ...rest }: TextareaProps = $props();
  let internalValue = $state('');
  let currentValue = $derived(controlledValue ?? internalValue);
  $effect(() => { if (controlledValue === undefined && !internalValue && defaultValue) internalValue = defaultValue; });
  const fieldId = $derived(id || uniqueId('pui-textarea'));
  function handleInput(e: Event) { const target = e.target as HTMLTextAreaElement; if (controlledValue === undefined) internalValue = target.value; oninput?.(e); }
  const attrs = $derived(dataAttrs({ disabled, readonly, required, invalid: error ? true : undefined }));
</script>
<div {...rest} {...attrs} id={id} class={cn('pui-textarea relative flex flex-col gap-1', className)} style={style} data-testid={dataTestId}>
  {#if label}<label for={fieldId} class={cn('text-sm font-medium', disabled ? 'text-(--pui-text-disabled)' : 'text-(--pui-text-secondary)')}>{label}{#if required}<span class="text-(--pui-color-error)" aria-hidden="true"> *</span>{/if}</label>{/if}
  <div class={cn('flex items-start gap-2 bg-[var(--pui-field-bg,var(--pui-surface-base))] rounded-[var(--pui-field-radius,var(--pui-radius-control))] px-[var(--pui-field-padding-x,var(--pui-space-3))] py-[var(--pui-field-padding-y,var(--pui-space-2))] border', error ? 'border-[var(--pui-color-error)]' : 'border-[var(--pui-field-border,var(--pui-outline))]', disabled && 'opacity-(--pui-opacity-disabled) cursor-not-allowed', 'transition-colors', !disabled && 'focus-within:border-(--pui-color-primary)')}>
    {#if leading}<span class="shrink-0 text-(--pui-text-secondary)">{@render leading()}</span>{/if}
    <textarea id={fieldId} {name} class="w-full bg-transparent text-(--pui-text-primary) placeholder:text-(--pui-text-disabled) outline-none resize-{resize}" value={currentValue} {placeholder} {rows} {disabled} {readonly} {required} minlength={minlength} maxlength={maxlength} aria-invalid={error ? 'true' : undefined} aria-describedby={helperText || error ? `${fieldId}-helper` : undefined} aria-label={ariaLabel} oninput={handleInput} onchange={onchange} onfocus={onfocus} onblur={onblur} {...inputProps}></textarea>
    {#if trailing}<span class="shrink-0 self-start text-(--pui-text-secondary)">{@render trailing()}</span>{/if}
  </div>
  {#if error}<p id={`${fieldId}-helper`} class="text-xs text-(--pui-color-error)" role="alert">{error}</p>{:else if helperText}<p id={`${fieldId}-helper`} class="text-xs text-(--pui-text-secondary)">{helperText}</p>{/if}
</div>
