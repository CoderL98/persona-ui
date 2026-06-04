<script lang="ts">
  import { untrack } from "svelte";
  import { fade } from "svelte/transition";
  import { cn } from "../../internal/class.js";
  import { keydown } from "../../internal/click-outside.js";
  import { uniqueId } from "../../internal/id.js";
  import type { TourProps, TourStep } from "./tour.types.js";

  let {
    open: controlledOpen,
    steps,
    value: controlledValue,
    spotlightPadding = 8,
    closeOnEscape = true,
    showProgress = true,
    showSkip = true,
    texts: localTexts,
    onOpenChange,
    onValueChange,
    onComplete,
    popoverContent,
    class: className,
    id,
    "data-testid": dataTestId,
  }: TourProps = $props();

  const defaults = { next: "Next", prev: "Back", done: "Done", skip: "Skip" };
  const t = $derived({ ...defaults, ...localTexts });

  let internalOpen = $state(untrack(() => controlledOpen ?? false));
  let internalValue = $state(0);
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let current = $derived(controlledValue ?? internalValue);

  // Track target element + position
  let targetEl: HTMLElement | null = $state(null);
  let rect = $state<{ top: number; left: number; width: number; height: number } | null>(null);

  const tourId = $derived(id || uniqueId('pui-tour'));

  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  function next() {
    if (current < steps.length - 1) {
      const v = current + 1;
      if (controlledValue === undefined) internalValue = v;
      onValueChange?.(v);
    } else {
      onComplete?.();
      close();
    }
  }

  function prev() {
    if (current > 0) {
      const v = current - 1;
      if (controlledValue === undefined) internalValue = v;
      onValueChange?.(v);
    }
  }

  function skip() {
    close();
  }

  function measure() {
    if (typeof document === "undefined" || !isOpen) return;
    const step = steps[current];
    if (!step) {
      targetEl = null;
      rect = null;
      return;
    }
    const el = document.querySelector<HTMLElement>(step.target);
    if (!el) {
      targetEl = null;
      rect = null;
      return;
    }
    targetEl = el;
    const r = el.getBoundingClientRect();
    rect = {
      top: r.top - spotlightPadding,
      left: r.left - spotlightPadding,
      width: r.width + spotlightPadding * 2,
      height: r.height + spotlightPadding * 2,
    };
  }

  $effect(() => {
    if (!isOpen) return;
    measure();
    const handler = () => measure();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  });

  // Popover position calc
  const popoverStyle = $derived.by((): string => {
    if (!rect) return "top:50%;left:50%;transform:translate(-50%,-50%)";
    const popW = 320;
    const popH = 160;
    const margin = 16;
    const placement = steps[current]?.placement ?? "auto";
    let place = placement;
    if (placement === "auto") {
      const spaceBelow = window.innerHeight - (rect.top + rect.height);
      const spaceAbove = rect.top;
      const spaceRight = window.innerWidth - (rect.left + rect.width);
      const spaceLeft = rect.left;
      const maxSpace = Math.max(spaceBelow, spaceAbove, spaceRight, spaceLeft);
      if (maxSpace === spaceBelow) place = "bottom";
      else if (maxSpace === spaceAbove) place = "top";
      else if (maxSpace === spaceRight) place = "right";
      else place = "left";
    }
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    switch (place) {
      case "bottom":
        return `top:${top + rect.height + margin}px;left:${left + rect.width / 2 - popW / 2}px;width:${popW}px;`;
      case "top":
        return `top:${top - popH - margin}px;left:${left + rect.width / 2 - popW / 2}px;width:${popW}px;`;
      case "right":
        return `top:${top + rect.height / 2 - popH / 2}px;left:${left + rect.width + margin}px;width:${popW}px;`;
      case "left":
        return `top:${top + rect.height / 2 - popH / 2}px;left:${left - popW - margin}px;width:${popW}px;`;
      default:
        return "top:50%;left:50%;transform:translate(-50%,-50%)";
    }
  });

  // 4-rect backdrop with cutout effect using 4 divs
  const cutouts = $derived.by(() => {
    if (!rect) return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      top: { top: 0, left: 0, width: "100%", height: `${Math.max(0, rect.top)}px` },
      bottom: {
        top: `${rect.top + rect.height}px`,
        left: 0,
        width: "100%",
        height: `${Math.max(0, vh - rect.top - rect.height)}px`,
      },
      left: {
        top: `${rect.top}px`,
        left: 0,
        width: `${Math.max(0, rect.left)}px`,
        height: `${rect.height}px`,
      },
      right: {
        top: `${rect.top}px`,
        left: `${rect.left + rect.width}px`,
        width: `${Math.max(0, vw - rect.left - rect.width)}px`,
        height: `${rect.height}px`,
      },
    };
  });

  const keyBindings = $derived<Record<string, (e: KeyboardEvent) => void>>(
    closeOnEscape && isOpen
      ? {
          Escape: () => close(),
          ArrowRight: () => next(),
          ArrowLeft: () => prev(),
        }
      : {},
  );

  const step = $derived(steps[current]);
</script>

<svelte:document use:keydown={keyBindings} />

{#if isOpen}
  <!-- Backdrop with cutout (4 rectangles around the spotlight) -->
  {#if cutouts}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="pui-tour__backdrop fixed inset-0 z-(--pui-z-modal)" data-testid={dataTestId}>
      <div
        class="absolute bg-(--pui-md-sys-color-scrim,rgb(0 0 0 / 0.5))"
        style="top:{cutouts.top.top}px;left:{cutouts.top.left}px;width:{cutouts.top.width};height:{cutouts.top.height};"
        aria-hidden="true"
        onclick={close}
      ></div>
      <div
        class="absolute bg-(--pui-md-sys-color-scrim,rgb(0 0 0 / 0.5))"
        style="top:{cutouts.bottom.top};left:{cutouts.bottom.left};width:{cutouts.bottom.width};height:{cutouts.bottom.height};"
        aria-hidden="true"
        onclick={close}
      ></div>
      <div
        class="absolute bg-(--pui-md-sys-color-scrim,rgb(0 0 0 / 0.5))"
        style="top:{cutouts.left.top};left:{cutouts.left.left};width:{cutouts.left.width};height:{cutouts.left.height};"
        aria-hidden="true"
        onclick={close}
      ></div>
      <div
        class="absolute bg-(--pui-md-sys-color-scrim,rgb(0 0 0 / 0.5))"
        style="top:{cutouts.right.top};left:{cutouts.right.left};width:{cutouts.right.width};height:{cutouts.right.height};"
        aria-hidden="true"
        onclick={close}
      ></div>
    </div>
  {/if}

  <!-- Spotlight ring around target -->
  {#if rect}
    <div
      class="fixed pointer-events-none z-(--pui-z-modal)"
      style="top:{rect.top}px;left:{rect.left}px;width:{rect.width}px;height:{rect.height}px;border-radius:6px;box-shadow:0_0_0_2px_var(--pui-color-primary),0_0_0_9999px_rgb(0_0_0_/_0.3);"
      aria-hidden="true"
    ></div>
  {/if}

  <!-- Popover -->
  {#if step}
    <div
      {id}
      role="dialog"
      aria-label={step.title}
      class={cn(
        "pui-tour__popover fixed z-(--pui-z-modal) bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) p-4",
        className,
      )}
      style={popoverStyle}
      transition:fade={{ duration: 150 }}
    >
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="text-sm font-semibold text-(--pui-text-primary)">{step.title}</h3>
        <button
          type="button"
          aria-label="Close tour"
          class="shrink-0 text-(--pui-text-secondary) hover:text-(--pui-text-primary)"
          onclick={close}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      {#if popoverContent}
        {@render popoverContent()}
      {:else if step.content}
        <p class="text-sm text-(--pui-text-secondary) mb-3">{step.content}</p>
      {/if}
      <div class="flex items-center justify-between gap-2 mt-3">
        <div class="flex items-center gap-2">
          {#if showSkip}
            <button
              type="button"
              class="text-xs text-(--pui-text-secondary) hover:text-(--pui-text-primary) underline"
              onclick={skip}
            >{t.skip}</button>
          {/if}
          {#if showProgress}
            <span class="text-xs text-(--pui-text-disabled)">{current + 1} / {steps.length}</span>
          {/if}
        </div>
        <div class="flex items-center gap-1">
          {#if current > 0}
            <button
              type="button"
              class="px-3 py-1 text-xs rounded-(--pui-radius-control) text-(--pui-text-secondary) hover:bg-(--pui-surface-variant)"
              onclick={prev}
            >{t.prev}</button>
          {/if}
          <button
            type="button"
            class="px-3 py-1 text-xs font-medium rounded-(--pui-radius-control) bg-(--pui-color-primary) text-(--pui-color-on-primary) hover:opacity-90"
            onclick={next}
          >{current === steps.length - 1 ? t.done : t.next}</button>
        </div>
      </div>
    </div>
  {/if}
{/if}
