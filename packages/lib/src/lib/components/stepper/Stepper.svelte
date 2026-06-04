<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import type { StepperProps } from "./stepper.types.js";

  let {
    steps,
    value = $bindable(),
    defaultValue = 0,
    orientation = "horizontal",
    clickable = true,
    showIndicators = true,
    errorSteps = [],
    "aria-label": ariaLabel = "Progress",
    onValueChange,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: StepperProps = $props();

  let internalValue = $state(untrack(() => defaultValue));
  let current = $derived(value ?? internalValue);
  let _autoId = $props.id();
  const stepperId = $derived(id ?? _autoId);

  function goTo(i: number) {
    if (i < 0 || i >= steps.length || i === current) return;
    if (steps[i].disabled && i > current) return;
    if (!clickable && i > current) return;
    if (value === undefined) internalValue = i;
    value = i;
    onValueChange?.(i);
  }

  function handleKeydown(e: KeyboardEvent, i: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTo(i);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(i + 1, steps.length - 1);
      (document.getElementById(`${stepperId}-step-${next}`) as HTMLElement | null)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(i - 1, 0);
      (document.getElementById(`${stepperId}-step-${prev}`) as HTMLElement | null)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      (document.getElementById(`${stepperId}-step-0`) as HTMLElement | null)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      (document.getElementById(`${stepperId}-step-${steps.length - 1}`) as HTMLElement | null)?.focus();
    }
  }

  function isError(i: number): boolean {
    return errorSteps.includes(i);
  }

  function stepState(i: number): "complete" | "current" | "upcoming" | "error" {
    if (isError(i)) return "error";
    if (i < current) return "complete";
    if (i === current) return "current";
    return "upcoming";
  }
</script>

<ol
  {id}
  class={cn(
    "pui-stepper flex",
    orientation === "horizontal" ? "flex-row items-start gap-0" : "flex-col gap-0",
    className,
  )}
  {style}
  data-testid={dataTestId}
  aria-label={ariaLabel}
>
  {#each steps as step, i (step.id ?? i)}
    {@const state = stepState(i)}
    {@const isClickable = clickable && (i <= current || !step.disabled)}
    <li
      class={cn(
        "pui-stepper__step flex",
        orientation === "horizontal"
          ? "flex-1 flex-col items-center text-center"
          : "flex-row items-start gap-3 pb-6 last:pb-0",
        isClickable ? "cursor-pointer" : "cursor-not-allowed",
      )}
    >
      <div class={cn("flex items-center", orientation === "horizontal" ? "w-full" : "flex-col")}>
        <button
          type="button"
          id={`${stepperId}-step-${i}`}
          aria-current={state === "current" ? "step" : undefined}
          aria-disabled={!isClickable}
          tabindex={isClickable ? 0 : -1}
          onclick={() => goTo(i)}
          onkeydown={(e) => handleKeydown(e, i)}
          class={cn(
            "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
            "focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-2",
            state === "complete" && "bg-(--pui-color-primary) text-(--pui-color-on-primary)",
            state === "current" && "bg-(--pui-color-primary) text-(--pui-color-on-primary) ring-2 ring-(--pui-color-primary) ring-offset-2",
            state === "upcoming" && "bg-(--pui-surface-variant) text-(--pui-text-secondary)",
            state === "error" && "bg-(--pui-color-error) text-white",
            step.disabled && "opacity-(--pui-opacity-disabled)",
          )}
        >
          {#if step.icon}
            {@render step.icon()}
          {:else if showIndicators}
            {#if state === "complete"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            {:else if state === "error"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            {:else}
              {i + 1}
            {/if}
          {/if}
        </button>
        {#if orientation === "horizontal" && i < steps.length - 1}
          <div
            class={cn(
              "flex-1 h-0.5 mx-2 transition-colors",
              state === "complete" || i < current ? "bg-(--pui-color-primary)" : "bg-(--pui-outline-subtle)",
            )}
            aria-hidden="true"
          ></div>
        {:else if orientation === "vertical" && i < steps.length - 1}
          <div
            class={cn(
              "w-0.5 h-6 mt-1 transition-colors",
              i < current ? "bg-(--pui-color-primary)" : "bg-(--pui-outline-subtle)",
            )}
            aria-hidden="true"
          ></div>
        {/if}
      </div>
      <div class={cn(orientation === "horizontal" ? "mt-2" : "pt-1")}>
        <p
          class={cn(
            "text-sm font-medium",
            state === "current" ? "text-(--pui-text-primary)" : "text-(--pui-text-secondary)",
            step.disabled && "text-(--pui-text-disabled)",
          )}
        >
          {step.label}
        </p>
        {#if step.description}
          <p class="text-xs text-(--pui-text-disabled) mt-0.5">{step.description}</p>
        {/if}
      </div>
    </li>
  {/each}
</ol>
