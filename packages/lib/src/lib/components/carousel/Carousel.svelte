<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import type { CarouselProps } from "./carousel.types.js";

  let {
    slides,
    value: controlledValue,
    defaultValue = 0,
    interval = 0,
    showArrows = true,
    showDots = true,
    loop = true,
    pauseOnHover = true,
    "aria-label": ariaLabel = "Carousel",
    onValueChange,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: CarouselProps = $props();

  let internalValue = $state(untrack(() => defaultValue));
  let current = $derived(controlledValue ?? internalValue);
  let hovering = $state(false);
  let focused = $state(false);

  let _autoId = $props.id();
  const carouselId = $derived(id ?? _autoId);

  function goTo(i: number) {
    let next = i;
    if (loop) {
      next = ((i % slides.length) + slides.length) % slides.length;
    } else {
      next = Math.max(0, Math.min(slides.length - 1, i));
    }
    if (next !== current) {
      if (controlledValue === undefined) internalValue = next;
      onValueChange?.(next);
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Touch support
  let touchStartX = 0;
  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }
  function handleTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev(); else next();
    }
  }

  // Auto-advance
  $effect(() => {
    if (interval <= 0) return;
    if (hovering && pauseOnHover) return;
    if (focused) return;
    const timer = setTimeout(() => {
      next();
    }, interval);
    return () => clearTimeout(timer);
  });
</script>

<section
  {id}
  aria-roledescription="carousel"
  aria-label={ariaLabel}
>
  <div
    class={cn(
      "pui-carousel relative overflow-hidden rounded-(--pui-radius-container) bg-(--pui-surface-base)",
      className,
    )}
    {style}
    role="presentation"
    data-testid={dataTestId}
    onmouseenter={() => { hovering = true; }}
    onmouseleave={() => { hovering = false; }}
    onfocusin={() => { focused = true; }}
    onfocusout={() => { focused = false; }}
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
  >
  <div
    class="flex transition-transform duration-(--pui-duration-swap,200ms) ease-out"
    style="transform: translateX(-{current * 100}%);"
  >
    {#each slides as slide, i (slide.id ?? i)}
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${i + 1} of ${slides.length}`}
        aria-hidden={i !== current}
        class="w-full shrink-0"
      >
        {#if slide.content}
          {@render slide.content()}
        {:else}
          <div class="aspect-video flex items-center justify-center text-(--pui-text-disabled)">
            {slide.alt ?? `Slide ${i + 1}`}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if showArrows && slides.length > 1}
    <button
      type="button"
      aria-label="Previous slide"
      onclick={prev}
      onkeydown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); prev(); } else if (e.key === "Home") { e.preventDefault(); goTo(0); } }}
      class="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 inline-flex items-center justify-center rounded-full bg-(--pui-surface-base)/80 backdrop-blur shadow-(--pui-elevation-2) text-(--pui-text-primary) hover:bg-(--pui-surface-base) transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button
      type="button"
      aria-label="Next slide"
      onclick={next}
      onkeydown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); next(); } else if (e.key === "End") { e.preventDefault(); goTo(slides.length - 1); } }}
      class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 inline-flex items-center justify-center rounded-full bg-(--pui-surface-base)/80 backdrop-blur shadow-(--pui-elevation-2) text-(--pui-text-primary) hover:bg-(--pui-surface-base) transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  {/if}

  {#if showDots && slides.length > 1}
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-full bg-(--pui-surface-base)/60 backdrop-blur" role="tablist" aria-label="Slide navigation">
      {#each slides as _, i}
        <button
          type="button"
          role="tab"
          aria-label={`Go to slide ${i + 1}`}
          aria-selected={i === current}
          onclick={() => goTo(i)}
          class={cn(
            "w-2 h-2 rounded-full transition-all",
            i === current ? "bg-(--pui-color-primary) w-6" : "bg-(--pui-text-disabled) hover:bg-(--pui-text-secondary)",
          )}
        ></button>
      {/each}
    </div>
  {/if}
  </div>
</section>

