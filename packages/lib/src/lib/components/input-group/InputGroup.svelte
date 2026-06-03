<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { InputGroupProps } from "./input-group.types.js";

  let {
    leading,
    trailing,
    orientation = "horizontal",
    disabled = false,
    children,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: InputGroupProps = $props();
</script>

<div
  {id}
  role="group"
  data-testid={dataTestId}
  class={cn(
    "pui-input-group flex",
    orientation === "horizontal" ? "flex-row items-stretch" : "flex-col",
    disabled && "opacity-(--pui-opacity-disabled)",
    className,
  )}
  {style}
  aria-disabled={disabled}
>
  {#if leading && orientation === "horizontal"}
    <div class="shrink-0 inline-flex items-center px-3 bg-(--pui-surface-variant) text-(--pui-text-secondary) border border-r-0 border-(--pui-outline) rounded-l-(--pui-radius-control) text-sm">
      {@render leading()}
    </div>
  {/if}
  <div class="flex-1 min-w-0 [&>*:first-child]:rounded-none [&>*:first-child]:border-x-0 [&>*:first-child]:md:border-x [&>*:first-child]:md:rounded-none">
    {@render children?.()}
  </div>
  {#if trailing && orientation === "horizontal"}
    <div class="shrink-0 inline-flex items-center px-3 bg-(--pui-surface-variant) text-(--pui-text-secondary) border border-l-0 border-(--pui-outline) rounded-r-(--pui-radius-control) text-sm">
      {@render trailing()}
    </div>
  {/if}
  {#if leading && orientation === "vertical"}
    <div class="text-xs text-(--pui-text-secondary)">{@render leading()}</div>
  {/if}
  {#if trailing && orientation === "vertical"}
    <div class="text-xs text-(--pui-text-disabled) mt-1">{@render trailing()}</div>
  {/if}
</div>
