<script lang="ts">
  import { untrack } from "svelte";
  import { fly } from "svelte/transition";
  import { cn } from "../../internal/class.js";
  import type { MessageProps } from "./message.types.js";

  let {
    open: controlledOpen,
    tone = "info",
    title,
    description,
    children,
    leading,
    duration = 0,
    closable = true,
    placement = "top-right",
    onOpenChange,
    onTimeout,
    class: className,
    id,
    "data-testid": dataTestId,
  }: MessageProps = $props();

  let internalOpen = $state(untrack(() => controlledOpen ?? true));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let timer: ReturnType<typeof setTimeout> | null = null;

  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  $effect(() => {
    if (isOpen && duration > 0) {
      timer = setTimeout(() => {
        onTimeout?.();
        close();
      }, duration);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  });

  const toneColors = {
    info: "bg-(--pui-color-info-container) text-(--pui-color-on-info-container) border-(--pui-color-info)",
    success: "bg-(--pui-color-success-container) text-(--pui-color-on-success-container) border-(--pui-color-success)",
    warning: "bg-(--pui-color-warning-container) text-(--pui-color-on-warning-container) border-(--pui-color-warning)",
    error: "bg-(--pui-color-error-container) text-(--pui-color-on-error-container) border-(--pui-color-error)",
  } as const;

  const placementClasses = {
    top: "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  } as const;

  const flyParams = $derived(
    placement.startsWith("top")
      ? { y: -20, duration: 200 }
      : { y: 20, duration: 200 },
  );
</script>

{#if isOpen}
  <div
    {id}
    role={tone === "error" ? "alert" : "status"}
    aria-live={tone === "error" ? "assertive" : "polite"}
    class={cn(
      "pui-message fixed z-(--pui-z-toast,80) min-w-72 max-w-md p-3 pr-8 rounded-(--pui-radius-container) border shadow-(--pui-elevation-2)",
      "flex items-start gap-2",
      toneColors[tone],
      placementClasses[placement],
      className,
    )}
    data-testid={dataTestId}
    transition:fly={flyParams}
  >
    {#if leading}
      <span class="shrink-0 mt-0.5">{@render leading()}</span>
    {:else}
      <span class="shrink-0 mt-0.5" aria-hidden="true">
        {#if tone === "success"}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9.5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        {:else if tone === "error"}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        {:else if tone === "warning"}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3l8 14H1L9 3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>
        {:else}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.5"/><path d="M9 6v4M9 12.5v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        {/if}
      </span>
    {/if}
    <div class="flex-1 min-w-0">
      {#if title}
        <p class="text-sm font-medium">{title}</p>
      {/if}
      {#if children}
        <div class="text-sm opacity-90 mt-0.5">{@render children()}</div>
      {:else if description}
        <p class="text-sm opacity-90 mt-0.5">{description}</p>
      {/if}
    </div>
    {#if closable}
      <button
        type="button"
        aria-label="Close message"
        onclick={close}
        class="absolute top-2 right-2 shrink-0 p-0.5 rounded-full opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    {/if}
  </div>
{/if}
