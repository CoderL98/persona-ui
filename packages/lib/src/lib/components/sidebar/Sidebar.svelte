<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { SidebarProps } from './sidebar.types.js';
  type SidebarTexts = { toggle: string; close: string };
  let {
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    responsiveBreakpoint = 768,
    header,
    children,
    footer,
    texts: localTexts,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onCollapsedChange,
    ...rest
  }: SidebarProps = $props();
  const defaults: SidebarTexts = { toggle: 'Toggle sidebar', close: 'Close' };
  const t = $derived({ ...defaults, ...localTexts });
  let internalCollapsed = $state(untrack(() => defaultCollapsed));
  let isCollapsed = $derived(controlledCollapsed ?? internalCollapsed);
  // 响应式：-1 表示未水合（SSR/CSR 一致），>=0 才是真实视口宽度
  // 这样避免 SSR 渲染 1280、client 突然跳到 360 引发的 hydration 突变
  let viewportWidth = $state(-1);
  const isResponsive = $derived(responsiveBreakpoint > 0 && viewportWidth >= 0 && viewportWidth < responsiveBreakpoint);
  // 未水合时用用户传入的折叠偏好，避免首屏布局跳变
  const effectiveCollapsed = $derived(viewportWidth < 0 ? isCollapsed : (isResponsive ? true : isCollapsed));

  onMount(() => {
    viewportWidth = window.innerWidth;
    const onResize = () => { viewportWidth = window.innerWidth; };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  });

  function toggle() {
    const next = !effectiveCollapsed;
    if (controlledCollapsed === undefined) internalCollapsed = next;
    onCollapsedChange?.(next);
  }
</script>

<aside
  {...rest}
  id={id}
  data-responsive-collapsed={isResponsive || undefined}
  class={cn(
    'pui-sidebar flex flex-col bg-(--pui-surface-base) border-r border-(--pui-outline-subtle) overflow-hidden transition-[width] duration-(--pui-duration-swap)',
    effectiveCollapsed ? 'w-(--pui-sidebar-collapsed-width,56px)' : 'w-(--pui-sidebar-width,240px)',
    isResponsive && 'fixed inset-y-0 left-0 z-(--pui-z-overlay) shadow-(--pui-elevation-3) translate-x-0',
    isResponsive && !effectiveCollapsed && 'translate-x-0',
    className,
  )}
  style={style}
  data-testid={dataTestId}
>
  {#if header}
    <div class="flex items-center justify-between px-3 py-2 border-b border-(--pui-outline-subtle)">
      {@render header()}
      <button type="button" aria-label={isResponsive ? t.close : t.toggle} class="text-(--pui-text-secondary) hover:text-(--pui-text-primary)" onclick={toggle}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          ><path
            d={isResponsive ? 'M4 4l8 8M12 4l-8 8' : isCollapsed ? 'M6 4l4 4-4 4' : 'M10 4l-4 4 4 4'}
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          /></svg
        >
      </button>
    </div>
  {/if}
  <div class="flex-1 overflow-y-auto p-2">{@render children?.()}</div>
  {#if footer}<div class="p-2 border-t border-(--pui-outline-subtle)">{@render footer()}</div>{/if}
</aside>
