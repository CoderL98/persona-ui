<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { TimelineProps, TimelineItem } from "./timeline.types.js";

  let {
    items,
    orientation = "vertical",
    activeIndex = -1,
    pending = false,
    "aria-label": ariaLabel = "Timeline",
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: TimelineProps = $props();

  const dotColors: Record<NonNullable<TimelineItem["status"]>, string> = {
    default: "bg-(--pui-text-disabled)",
    success: "bg-(--pui-color-success)",
    warning: "bg-(--pui-color-warning)",
    error: "bg-(--pui-color-error)",
    info: "bg-(--pui-color-primary)",
  };
</script>

{#if orientation === "vertical"}
  <ol
    {id}
    class={cn("pui-timeline flex flex-col gap-0", className)}
    {style}
    data-testid={dataTestId}
    aria-label={ariaLabel}
  >
    {#each items as item, i (item.id ?? i)}
      {@const isActive = i === activeIndex}
      <li class="flex gap-3 pb-4 last:pb-0">
        <div class="flex flex-col items-center shrink-0">
          <div
            class={cn(
              "shrink-0 w-3 h-3 rounded-full mt-1.5 ring-2 ring-(--pui-surface-base)",
              dotColors[item.status ?? "default"],
              isActive && "ring-4 ring-(--pui-color-primary-container) scale-110",
            )}
            aria-hidden="true"
          >
            {#if item.icon}{@render item.icon()}{/if}
          </div>
          {#if i < items.length - 1 || pending}
            <div
              class={cn(
                "w-0.5 flex-1 mt-1",
                pending && i === items.length - 1
                  ? "bg-gradient-to-b from-(--pui-outline) to-transparent animate-pulse"
                  : "bg-(--pui-outline)",
              )}
              aria-hidden="true"
            ></div>
          {/if}
        </div>
        <div class="flex-1 min-w-0 pb-1">
          <div class="flex items-baseline justify-between gap-2 flex-wrap">
            {#if item.title}
              <p
                class={cn(
                  "text-sm font-medium",
                  isActive ? "text-(--pui-text-primary)" : "text-(--pui-text-secondary)",
                )}
              >
                {item.title}
              </p>
            {/if}
            {#if item.timestamp}
              <time class="text-xs text-(--pui-text-disabled) shrink-0">{item.timestamp}</time>
            {/if}
          </div>
          {#if item.meta}
            <p class="text-xs text-(--pui-text-disabled) mt-0.5">{item.meta}</p>
          {/if}
          {#if item.content}
            <div class="text-sm text-(--pui-text-primary) mt-1">
              {@render item.content()}
            </div>
          {/if}
        </div>
      </li>
    {/each}
  </ol>
{:else}
  <ol
    {id}
    class={cn("pui-timeline-horizontal flex flex-row gap-0 overflow-x-auto", className)}
    {style}
    data-testid={dataTestId}
    aria-label={ariaLabel}
  >
    {#each items as item, i (item.id ?? i)}
      {@const isActive = i === activeIndex}
      <li class="flex flex-col items-center flex-1 min-w-32">
        <div
          class={cn(
            "shrink-0 w-3 h-3 rounded-full ring-2 ring-(--pui-surface-base)",
            dotColors[item.status ?? "default"],
            isActive && "ring-4 ring-(--pui-color-primary-container) scale-110",
          )}
          aria-hidden="true"
        ></div>
        {#if i < items.length - 1}
          <div
            class="absolute h-0.5 w-full bg-(--pui-outline) pointer-events-none"
            style="left: 50%; top: 0.4375rem; width: calc(100% - 1.5rem); transform: translateX(0.75rem);"
            aria-hidden="true"
          ></div>
        {/if}
        <div class="text-center mt-2 px-1">
          {#if item.title}
            <p
              class={cn(
                "text-sm font-medium",
                isActive ? "text-(--pui-text-primary)" : "text-(--pui-text-secondary)",
              )}
            >
              {item.title}
            </p>
          {/if}
          {#if item.timestamp}
            <p class="text-xs text-(--pui-text-disabled) mt-0.5">{item.timestamp}</p>
          {/if}
        </div>
      </li>
    {/each}
  </ol>
{/if}
