import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('triggerHaptic', () => {
  let vibrateSpy = vi.fn();

  beforeEach(() => {
    vibrateSpy = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      configurable: true,
      writable: true,
      value: vibrateSpy,
    });
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('calls navigator.vibrate on supported platforms', async () => {
    const { triggerHaptic } = await import('$lib/internal/haptics');
    triggerHaptic('light');
    expect(vibrateSpy).toHaveBeenCalled();
  });

  it('respects prefers-reduced-motion: reduce', async () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (q: string) => ({
        matches: q.includes('prefers-reduced-motion'),
        media: q,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
        onchange: null,
      }),
    });
    const { triggerHaptic } = await import('$lib/internal/haptics');
    triggerHaptic('heavy');
    expect(vibrateSpy).not.toHaveBeenCalled();
  });

  it('does not throw when navigator.vibrate is missing', async () => {
    Object.defineProperty(navigator, 'vibrate', { configurable: true, value: undefined });
    const { triggerHaptic } = await import('$lib/internal/haptics');
    expect(() => triggerHaptic('success')).not.toThrow();
  });

  it('does nothing on SSR (no window)', async () => {
    const origWindow = globalThis.window;
    // @ts-expect-error 模拟 SSR
    delete (globalThis as { window?: unknown }).window;
    const { triggerHaptic } = await import('$lib/internal/haptics');
    expect(() => triggerHaptic('error')).not.toThrow();
    (globalThis as { window?: unknown }).window = origWindow;
  });
});
