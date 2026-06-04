<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import { uniqueId } from "../../internal/id.js";
  import type { RatingProps } from "./rating.types.js";

  let {
    value: controlledValue,
    defaultValue = 0,
    max = 5,
    allowHalf = false,
    readonly = false,
    disabled = false,
    size = "md",
    color = "var(--pui-color-warning, #fbbf24)",
    inactiveColor = "var(--pui-outline, #e2e8f0)",
    "aria-label": ariaLabel = "Rating",
    onValueChange,
    onHoverChange,
    icon,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: RatingProps = $props();

  let internalValue = $state(untrack(() => defaultValue));
  let current = $derived(controlledValue ?? internalValue);
  let hover = $state(0);
  const display = $derived(hover > 0 ? hover : current);

  const sizeMap = { sm: 16, md: 20, lg: 28 };
  const iconSize = $derived(sizeMap[size]);

  const ratingId = $derived(id || uniqueId('pui-rating'));

  function setValue(v: number) {
    if (readonly || disabled) return;
    if (controlledValue === undefined) internalValue = v;
    onValueChange?.(v);
  }

  function handleClick(e: MouseEvent, i: number) {
    if (readonly || disabled) return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = allowHalf && x < rect.width / 2;
    setValue(i + (isHalf ? 0.5 : 1));
    onHoverChange?.(0);
  }

  function handleMove(e: MouseEvent, i: number) {
    if (readonly || disabled || !allowHalf) return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const v = i + (isHalf ? 0.5 : 1);
    if (v !== hover) {
      hover = v;
      onHoverChange?.(v);
    }
  }

  function handleLeave() {
    if (readonly) return;
    hover = 0;
    onHoverChange?.(0);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (readonly || disabled) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setValue(Math.min(max, current + (e.shiftKey ? 1 : (allowHalf ? 0.5 : 1))));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setValue(Math.max(0, current - (e.shiftKey ? 1 : (allowHalf ? 0.5 : 1))));
    } else if (e.key === "Home") {
      e.preventDefault();
      setValue(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setValue(max);
    }
  }
</script>

<div
  {id}
  role="slider"
  aria-label={ariaLabel}
  aria-valuemin="0"
  aria-valuemax={max}
  aria-valuenow={current}
  aria-valuetext={`${current} out of ${max}`}
  aria-readonly={readonly}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  class={cn(
    "pui-rating inline-flex items-center gap-0.5",
    !disabled && !readonly && "cursor-pointer",
    disabled && "opacity-(--pui-opacity-disabled)",
    className,
  )}
  {style}
  data-testid={dataTestId}
  onmouseleave={handleLeave}
  onkeydown={handleKeydown}
>
  {#each Array(max) as _, i}
    {@const filled = display >= i + 1}
    {@const half = !filled && allowHalf && display >= i + 0.5}
    <button
      type="button"
      tabindex="-1"
      aria-label={`Rate ${i + 1} out of ${max}`}
      class="p-0 bg-transparent border-0 focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-1 rounded-sm"
      style="width: {iconSize}px; height: {iconSize}px;"
      onclick={(e) => handleClick(e, i)}
      onmousemove={(e) => handleMove(e, i)}
      disabled={readonly || disabled}
    >
      {#if icon}
        <span
          class="block"
          style="color: {filled || half ? color : inactiveColor}; width: {iconSize}px; height: {iconSize}px;"
        >
          {@render icon()}
        </span>
      {:else}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill={filled || half ? color : "none"}
          stroke={filled || half ? color : inactiveColor}
          stroke-width="1.5"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          {#if half}
            <defs>
              <linearGradient id={`${ratingId}-half-${i}`}>
                <stop offset="50%" stop-color={color}/>
                <stop offset="50%" stop-color={inactiveColor}/>
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
              fill={`url(#${ratingId}-half-${i})`}
              stroke={color}
            />
          {:else}
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            />
          {/if}
        </svg>
      {/if}
    </button>
  {/each}
</div>
