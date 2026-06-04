<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { TextFieldProps } from './text-field.types.js';

  let {
    value: controlledValue,
    defaultValue = '',
    label,
    placeholder,
    helperText,
    error,
    disabled = false,
    readonly = false,
    required = false,
    type = 'text' as TextFieldProps['type'],
    name,
    leading,
    trailing,
    minlength,
    maxlength,
    pattern,
    min,
    max,
    step,
    class: className,
    style,
    id,
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
    oninput,
    onchange,
    onfocus,
    onblur,
    inputProps = {},
    ...rest
  }: TextFieldProps = $props();

  // Uncontrolled mode: if no value prop, use internal state
  let internalValue = $state('');
  // $derived picks controlled or internal; effect initializes from defaultValue
  let currentValue = $derived(controlledValue ?? internalValue);
  $effect(() => {
    if (controlledValue === undefined && !internalValue && defaultValue) {
      internalValue = defaultValue;
    }
  });

  // Unique id for label/input association
  let _autoId = $props.id();
  const fieldId = $derived(id ?? _autoId);

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (controlledValue === undefined) {
      internalValue = target.value;
    }
    oninput?.(e as InputEvent);
  }

  const attrs = $derived(
    dataAttrs({
      disabled,
      readonly,
      required,
      invalid: error ? true : undefined,
    }),
  );
</script>

<div
  {...rest}
  {...attrs}
  {id}
  class={cn('pui-text-field', 'relative flex flex-col gap-1', className)}
  {style}
  data-testid={dataTestId}
>
  {#if label}
    <label
      for={fieldId}
      class={cn(
        'text-sm font-medium',
        disabled ? 'text-(--pui-text-disabled)' : 'text-(--pui-text-secondary)',
      )}
    >
      {label}
      {#if required}<span class="text-(--pui-color-error)" aria-hidden="true">
          *</span
        >{/if}
    </label>
  {/if}
  <div
    class={cn(
      'pui-text-field-frame flex items-center gap-2',
      'bg-(--pui-field-bg,var(--pui-surface-base))',
      'rounded-(--pui-field-radius,var(--pui-radius-control))',
      'px-(--pui-field-padding-x,var(--pui-space-3))',
      'py-(--pui-field-padding-y,var(--pui-space-2))',
      'border',
      error
        ? 'border-(--pui-color-error)'
        : 'border-(--pui-field-border,var(--pui-outline))',
      disabled && 'opacity-(--pui-opacity-disabled) cursor-not-allowed',
      'transition-[border-color,box-shadow]',
      !disabled && 'focus-within:border-(--pui-color-primary)',
      !disabled &&
        !error &&
        'focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--pui-color-primary)_18%,transparent)]',
    )}
  >
    {#if leading}
      <span class="shrink-0 text-(--pui-text-secondary)"
        >{@render leading()}</span
      >
    {/if}
    <input
      {type}
      {name}
      id={fieldId}
      class="w-full bg-transparent text-(--pui-text-primary) placeholder:text-(--pui-text-disabled) outline-none"
      value={currentValue}
      placeholder={placeholder}
      disabled={disabled}
      readonly={readonly}
      required={required}
      minlength={minlength}
      maxlength={maxlength}
      pattern={pattern}
      min={min}
      max={max}
      step={step}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={helperText || error ? `${fieldId}-helper` : undefined}
      aria-label={ariaLabel}
      oninput={handleInput}
      onchange={onchange}
      onfocus={onfocus}
      onblur={onblur}
      {...inputProps}
    />
    {#if trailing}
      <span class="shrink-0 text-(--pui-text-secondary)"
        >{@render trailing()}</span
      >
    {/if}
  </div>
  {#if error}
    <p
      id={`${fieldId}-helper`}
      class="text-xs text-(--pui-color-error)"
      role="alert"
    >
      {error}
    </p>
  {:else if helperText}
    <p id={`${fieldId}-helper`} class="text-xs text-(--pui-text-secondary)">
      {helperText}
    </p>
  {/if}
</div>
