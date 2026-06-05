<script lang="ts">
  import { untrack } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { cn } from '../../internal/class.js';
  import { lockScroll, unlockScroll } from '../../internal/scroll-lock.js';
  import type { DialogProps } from './dialog.types.js';
  type DialogTexts = { close: string };
  let {
    open: controlledOpen,
    defaultOpen = false,
    modal = true,
    title,
    description,
    children,
    footer,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    texts: localTexts,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onOpenChange: onOpenChange,
    ...rest
  }: DialogProps = $props();
  const defaults: DialogTexts = { close: 'Close' };
  const t = $derived({ ...defaults, ...localTexts });
  let internalOpen = $state(untrack(() => defaultOpen));
  let isOpen = $derived(controlledOpen ?? internalOpen);
  let _autoId = $props.id();
  const dialogId = $derived(id ?? _autoId);
  const titleId = $derived(`${dialogId}-title`);
  const descId = $derived(`${dialogId}-desc`);

  function close() {
    if (controlledOpen === undefined) internalOpen = false;
    onOpenChange?.(false);
  }

  function handleBackdropClick(e: MouseEvent) {
    if (
      closeOnOutsideClick &&
      (e.target as HTMLElement).dataset.dialogBackdrop !== undefined
    )
      close();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (closeOnEscape && e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  // Focus trap on open
  let prevFocus: HTMLElement | null = null;
  function getFocusable(el: HTMLElement): HTMLElement[] {
    return Array.from(
      el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(
      (el) =>
        !el.hasAttribute('disabled') &&
        el.getAttribute('aria-hidden') !== 'true',
    );
  }
  function trapFocus(e: KeyboardEvent) {
    if (!isOpen || e.key !== 'Tab') return;
    const el = document.getElementById(dialogId);
    if (!el) return;
    const focusable = getFocusable(el);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  $effect(() => {
    if (isOpen) {
      lockScroll();
      prevFocus = document.activeElement as HTMLElement;
      // 等对话框入场动画结束再聚焦首个可聚焦元素
      // 避免 transition:scale 200ms 期间焦点元素列表为空或尚未渲染
      const el = document.getElementById(dialogId);
      if (el) {
        const focusFirst = () => {
          const focusable = getFocusable(el);
          if (focusable.length > 0) focusable[0].focus();
          else el.focus();
        };
        // 监听 intro 结束；同时设置 220ms 兜底（稍长于 200ms scale 动画）
        const onIntro = () => {
          focusFirst();
          el.removeEventListener('transitionend', onIntro);
        };
        el.addEventListener('transitionend', onIntro, { once: true });
        setTimeout(focusFirst, 220);
      }
    } else {
      unlockScroll();
      if (prevFocus) {
        prevFocus.focus();
        prevFocus = null;
      }
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    role="presentation"
    data-dialog-backdrop
    class={cn(
      'pui-dialog-backdrop fixed inset-0 z-(--pui-z-modal) flex items-center justify-center bg-(--pui-overlay-scrim,rgb(0 0 0 / 0.4)) p-4',
      className,
    )}
    {style}
    onclick={handleBackdropClick}
    transition:fade={{ duration: 200 }}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      {...rest}
      id={dialogId}
      role="dialog"
      aria-modal={modal ? 'true' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      class="relative w-full max-w-md rounded-(--pui-radius-container) bg-(--pui-surface-base) shadow-(--pui-elevation-3) p-6"
      transition:scale={{ start: 0.95, duration: 200 }}
      onkeydown={trapFocus}
    >
      <div class="flex items-start justify-between mb-4">
        {#if title}<h2
            id={titleId}
            class="text-lg font-semibold text-(--pui-text-primary)"
          >
            {@render title()}
          </h2>{:else}<div></div>{/if}
        <button
          type="button"
          aria-label={t.close}
          class="shrink-0 ml-2 text-(--pui-text-secondary) hover:text-(--pui-text-primary) transition-colors"
          onclick={close}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            ><path
              d="M5 5l10 10M15 5l-10 10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            /></svg
          >
        </button>
      </div>
      {#if description}<p
          id={descId}
          class="text-sm text-(--pui-text-secondary) mb-4"
        >
          {@render description()}
        </p>{/if}
      {#if children}<div class="text-sm text-(--pui-text-primary)">
          {@render children()}
        </div>{/if}
      {#if footer}<div class="mt-6 flex items-center justify-end gap-3">
          {@render footer()}
        </div>{/if}
    </div>
  </div>
{/if}
