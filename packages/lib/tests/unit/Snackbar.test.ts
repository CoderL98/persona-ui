import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Snackbar from '$lib/components/snackbar/Snackbar.svelte';

describe('Snackbar', () => {
  it('renders nothing when defaultOpen=false', () => {
    const { container } = render(Snackbar, {
      props: { message: 'Hello' },
    });
    expect(container.querySelector('.pui-snackbar')).toBeNull();
  });

  it('renders message when defaultOpen=true', () => {
    const { container } = render(Snackbar, {
      props: { message: 'Saved!', defaultOpen: true },
    });
    expect(container.querySelector('.pui-snackbar')).toBeTruthy();
    expect(container.textContent).toContain('Saved!');
  });

  it('supports 4 tones: info / success / warning / error', () => {
    const tones = ['info', 'success', 'warning', 'error'] as const;
    for (const t of tones) {
      const { container } = render(Snackbar, {
        props: { message: t, tone: t, defaultOpen: true },
      });
      expect(container.querySelector(`[data-tone="${t}"]`)).toBeTruthy();
    }
  });

  it('shows action button when actionLabel is set', () => {
    const { container } = render(Snackbar, {
      props: { message: 'Delete?', actionLabel: 'Undo', defaultOpen: true },
    });
    const action = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Undo'),
    );
    expect(action).toBeTruthy();
  });

  it('fires onAction and closes (default kind) when action clicked', () => {
    let fired = false;
    const { container } = render(Snackbar, {
      props: {
        message: 'Delete?',
        actionLabel: 'Undo',
        defaultOpen: true,
        onAction: () => (fired = true),
      },
    });
    const action = Array.from(container.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Undo'),
    ) as HTMLButtonElement;
    action.click();
    expect(fired).toBe(true);
  });

  it('fires onOpenChange(false) on dismiss click', () => {
    const onOpenChange = vi.fn();
    const { container } = render(Snackbar, {
      props: { message: 'Hi', defaultOpen: true, onOpenChange },
    });
    const dismiss = container.querySelector('button[aria-label="Dismiss"]') as HTMLButtonElement;
    dismiss.click();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
