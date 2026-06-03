<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { StackProps, StackGap, StackAlign, StackJustify, StackWrap, StackDirection } from "./stack.types.js";

  let {
    direction = "column",
    align = "stretch",
    justify = "start",
    gap = 0,
    wrap = "nowrap",
    inline = false,
    children,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: StackProps = $props();

  const directionMap: Record<StackDirection, string> = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse",
  };

  const alignMap: Record<StackAlign, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  const justifyMap: Record<StackJustify, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const gapMap: Record<StackGap, string> = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const wrapMap: Record<StackWrap, string> = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
    "wrap-reverse": "flex-wrap-reverse",
  };
</script>

<div
  {id}
  class={cn(
    inline ? "inline-flex" : "flex",
    directionMap[direction],
    alignMap[align],
    justifyMap[justify],
    wrapMap[wrap],
    gapMap[gap as StackGap],
    className,
  )}
  {style}
  data-testid={dataTestId}
>
  {@render children?.()}
</div>
