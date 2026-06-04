<script lang="ts">
  import { cn } from "../../internal/class.js";

  let {
    label,
    required = false,
    helperText,
    error,
    children,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: {
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: string;
    children?: import("svelte").Snippet;
    class?: string;
    style?: string;
    id?: string;
    "data-testid"?: string;
  } = $props();

  let _autoId = $props.id();
  const fieldId = $derived(id ?? _autoId);
</script>

<div
  {id}
  class={cn("pui-form-field flex flex-col gap-1", className)}
  {style}
  data-testid={dataTestId}
>
  {#if label}
    <label
      for={fieldId}
      class="text-sm font-medium text-(--pui-text-secondary)"
    >
      {label}{#if required}<span class="text-(--pui-color-error)" aria-hidden="true"> *</span>{/if}
    </label>
  {/if}
  {@render children?.()}
  {#if error}
    <p id={`${fieldId}-helper`} class="text-xs text-(--pui-color-error)" role="alert">
      {error}
    </p>
  {:else if helperText}
    <p id={`${fieldId}-helper`} class="text-xs text-(--pui-text-secondary)">
      {helperText}
    </p>
  {/if}
</div>
