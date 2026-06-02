import type { Snippet } from "svelte";
export type SidebarProps = {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  /**
   * Breakpoint (in pixels) at which the sidebar automatically collapses and becomes overlay-style.
   * Default: 768 (matches Tailwind md breakpoint).
   * Set to `0` to disable auto-responsive behavior.
   */
  responsiveBreakpoint?: number;
  header?: Snippet;
  children?: Snippet;
  footer?: Snippet;
  /** Render as mobile overlay only (also becomes a slide-out drawer on small screens). */
  mobileOnly?: boolean;
  texts?: Record<string, string>;
  class?: string;
  style?: string;
  id?: string;
  "data-testid"?: string;
  onCollapsedChange?: (collapsed: boolean) => void;
};
