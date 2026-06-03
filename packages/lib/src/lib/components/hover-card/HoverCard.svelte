<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { HoverCardProps } from "./hover-card.types.js";

  let {
    children,
    content,
    placement = "auto",
    openDelay = 300,
    closeDelay = 100,
    maxWidth = 320,
    "aria-label": ariaLabel,
    class: className,
    id,
    "data-testid": dataTestId,
  }: HoverCardProps = $props();

  let open = $state(false);
  let triggerEl: HTMLElement | undefined = $state();
  let cardStyle = $state("");

  let openTimer: ReturnType<typeof setTimeout> | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  function clearTimers() {
    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  }

  function show() {
    clearTimers();
    openTimer = setTimeout(() => {
      open = true;
    }, openDelay);
  }

  function hide() {
    clearTimers();
    closeTimer = setTimeout(() => {
      open = false;
    }, closeDelay);
  }

  $effect(() => {
    if (!open || typeof window === "undefined" || !triggerEl) return;
    const tr = triggerEl.getBoundingClientRect();
    const top = tr.top + window.scrollY;
    const left = tr.left + window.scrollX;
    const margin = 8;
    let place = placement;
    if (place === "auto") {
      const spaceBelow = window.innerHeight - tr.bottom;
      const spaceAbove = tr.top;
      const spaceRight = window.innerWidth - tr.right;
      const spaceLeft = tr.left;
      const max = Math.max(spaceBelow, spaceAbove, spaceRight, spaceLeft);
      if (max === spaceBelow) place = "bottom";
      else if (max === spaceAbove) place = "top";
      else if (max === spaceRight) place = "right";
      else place = "left";
    }
    switch (place) {
      case "bottom":
        cardStyle = `top:${top + tr.height + margin}px;left:${left + tr.width / 2 - 80}px;`;
        break;
      case "top":
        cardStyle = `top:${top - 60 - margin}px;left:${left + tr.width / 2 - 80}px;`;
        break;
      case "right":
        cardStyle = `top:${top + tr.height / 2 - 30}px;left:${left + tr.width + margin}px;`;
        break;
      case "left":
        cardStyle = `top:${top + tr.height / 2 - 30}px;left:${left - 160 - margin}px;`;
        break;
    }
  });
</script>

<span
  bind:this={triggerEl}
  class="inline-block"
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
>
  {@render children?.()}
</span>

{#if open}
  <div
    {id}
    role="tooltip"
    aria-label={ariaLabel}
    class={cn(
      "pui-hover-card fixed z-(--pui-z-popover,50) p-3 rounded-(--pui-radius-container)",
      "bg-(--pui-surface-base) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle)",
      "text-sm",
      className,
    )}
    style={`${cardStyle}max-width:${maxWidth}px;`}
    data-testid={dataTestId}
    onmouseenter={show}
    onmouseleave={hide}
  >
    {@render content?.()}
  </div>
{/if}
