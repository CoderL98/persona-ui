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
  data-orientation={orientation}
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
  <div class="flex-1 min-w-0">
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

<style>
  /* 水平模式下，TextField 等带边框的子组件需要失去左右圆角，
     让 leading/trailing addons 的圆角自然衔接、接缝处呈方角。
     垂直模式（vertical）下没有 addon 与之接缝，保持子组件自身圆角。 */
  :global([data-orientation="horizontal"].pui-input-group .pui-text-field > .pui-text-field-frame) {
    border-radius: 0;
  }
</style>
