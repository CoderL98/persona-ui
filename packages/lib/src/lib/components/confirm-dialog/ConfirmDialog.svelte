<script lang="ts">
  import { untrack } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { cn } from "../../internal/class.js";
  import { keydown } from "../../internal/click-outside.js";
  import { lockScroll, unlockScroll } from "../../internal/scroll-lock.js";
  import type { ConfirmDialogProps } from "./confirm-dialog.types.js";

  let {
    open: controlledOpen,
    title,
    description,
    tone = "default",
    confirmText = "Confirm",
    cancelText = "Cancel",
    children,
    footer,
    loading = false,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    onOpenChange,
    onConfirm,
    onCancel,
    class: className,
    id,
    "data-testid": dataTestId,
  }: ConfirmDialogProps = $props();

  let internalOpen = $state(untrack(() => controlledOpen ?? false));
  let isOpen = $derived(controlledOpen ?? internalOpen);

  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  function handleConfirm() {
    if (loading) return;
    onConfirm?.();
  }

  function handleCancel() {
    onCancel?.();
    close();
  }

  // Focus trap
  let prevFocus: HTMLElement | null = null;
  $effect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      lockScroll();
      prevFocus = document.activeElement as HTMLElement;
      queueMicrotask(() => {
        const dialog = document.getElementById(id || "pui-confirm");
        const focusable = dialog?.querySelector<HTMLButtonElement>("button:not([disabled])");
        focusable?.focus();
      });
    } else {
      unlockScroll();
      if (prevFocus) {
        prevFocus.focus();
        prevFocus = null;
      }
    }
  });

  const keyBindings = $derived<Record<string, (e: KeyboardEvent) => void>>(
    closeOnEscape && isOpen ? { Escape: () => handleCancel() } : {},
  );

  function handleBackdropClick(e: MouseEvent) {
    if (closeOnOutsideClick && (e.target as HTMLElement).dataset.confirmBackdrop !== undefined) {
      handleCancel();
    }
  }
</script>

<svelte:document use:keydown={keyBindings} />

{#if isOpen}
  <div
    class="fixed inset-0 z-(--pui-z-modal) flex items-center justify-center p-4"
    data-testid={dataTestId}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      data-confirm-backdrop
      role="presentation"
      class="absolute inset-0 bg-(--pui-overlay-scrim,rgb(0 0 0 / 0.4))"
      onclick={handleBackdropClick}
      transition:fade={{ duration: 150 }}
    ></div>
    <div
      {id}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={`${id || 'pui-confirm'}-title`}
      aria-describedby={description || children ? `${id || 'pui-confirm'}-desc` : undefined}
      class={cn(
        "pui-confirm-dialog relative w-full max-w-md rounded-(--pui-radius-container) bg-(--pui-surface-base) shadow-(--pui-elevation-3) p-6",
        className,
      )}
      transition:scale={{ start: 0.95, duration: 200 }}
    >
      <h2
        id={`${id || 'pui-confirm'}-title`}
        class="text-lg font-semibold text-(--pui-text-primary) mb-2"
      >
        {title}
      </h2>
      {#if children}
        <div id={`${id || 'pui-confirm'}-desc`} class="text-sm text-(--pui-text-secondary) mb-4">
          {@render children()}
        </div>
      {:else if description}
        <p id={`${id || 'pui-confirm'}-desc`} class="text-sm text-(--pui-text-secondary) mb-4">{description}</p>
      {/if}

      {#if footer}
        <div class="mt-6 flex items-center justify-end gap-3">
          {@render footer()}
        </div>
      {:else}
        <div class="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onclick={handleCancel}
            disabled={loading}
            class="px-3 py-1.5 text-sm rounded-(--pui-radius-control) text-(--pui-text-secondary) hover:bg-(--pui-surface-variant) disabled:opacity-(--pui-opacity-disabled)"
          >{cancelText}</button>
          <button
            type="button"
            onclick={handleConfirm}
            disabled={loading}
            class={cn(
              "px-3 py-1.5 text-sm font-medium rounded-(--pui-radius-control) transition-opacity",
              tone === "danger"
                ? "bg-(--pui-color-error) text-(--pui-color-on-error) hover:opacity-90"
                : "bg-(--pui-color-primary) text-(--pui-color-on-primary) hover:opacity-90",
              loading && "opacity-(--pui-opacity-disabled) cursor-wait",
            )}
          >{loading ? "..." : confirmText}</button>
        </div>
      {/if}
    </div>
  </div>
{/if}
