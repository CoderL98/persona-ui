import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Fab from '$lib/components/fab/Fab.svelte';

describe('Fab', () => {
  it('renders with default primary variant', () => {
    const { container } = render(Fab, { props: { label: 'Add' } });
    const btn = container.querySelector('button.pui-fab');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('aria-label')).toBe('Add');
  });

  it('supports 4 variants: surface / primary / secondary / tertiary', () => {
    const variants = ['surface', 'primary', 'secondary', 'tertiary'] as const;
    for (const v of variants) {
      const { container } = render(Fab, { props: { label: v, variant: v } });
      const btn = container.querySelector('button.pui-fab');
      expect(btn?.getAttribute('data-variant')).toBe(v);
    }
  });

  it('supports 3 sizes: small / regular / large', () => {
    const sizes = ['small', 'regular', 'large'] as const;
    for (const s of sizes) {
      const { container } = render(Fab, { props: { label: s, size: s } });
      const btn = container.querySelector('button.pui-fab');
      expect(btn?.getAttribute('data-size')).toBe(s);
    }
  });

  it('shows extendedLabel only when size=large', () => {
    const { container } = render(Fab, {
      props: { label: 'Add', size: 'large', extendedLabel: 'Create' },
    });
    expect(container.textContent).toContain('Create');
  });

  it('disabled button does not fire onClick', () => {
    let fired = false;
    const { container } = render(Fab, {
      props: { label: 'Add', disabled: true, onClick: () => (fired = true) },
    });
    const btn = container.querySelector('button.pui-fab') as HTMLButtonElement;
    btn.click();
    expect(fired).toBe(false);
  });

  it('fires onClick on enable', () => {
    let fired = false;
    const { container } = render(Fab, {
      props: { label: 'Add', onClick: () => (fired = true) },
    });
    const btn = container.querySelector('button.pui-fab') as HTMLButtonElement;
    btn.click();
    expect(fired).toBe(true);
  });
});
