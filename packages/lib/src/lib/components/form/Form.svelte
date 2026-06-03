<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { FormProps } from "./form.types.js";

  let {
    onSubmit,
    layout = "vertical",
    disabled = false,
    children,
    actions,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
    ...rest
  }: FormProps = $props();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    onSubmit?.(e);
  }
</script>

<form
  {...rest}
  {id}
  class={cn(
    "pui-form flex gap-4",
    layout === "vertical" ? "flex-col" : "flex-col md:flex-row md:items-start md:gap-6",
    className,
  )}
  {style}
  data-testid={dataTestId}
  onsubmit={handleSubmit}
>
  <div class="flex-1 space-y-4 min-w-0">
    {@render children?.()}
  </div>
  {#if actions}
    <div
      class={cn(
        "flex items-center gap-2 pt-2",
        layout === "horizontal"
          ? "md:pt-0 md:self-start md:mt-7"
          : "justify-end border-t border-(--pui-outline-subtle)",
      )}
    >
      {@render actions()}
    </div>
  {/if}
</form>
