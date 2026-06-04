<script lang="ts">
  import { untrack } from "svelte";
  import { scale } from "svelte/transition";
  import { cn } from "../../internal/class.js";
  import { clickOutside } from "../../internal/click-outside.js";
  import type { ColorPickerProps } from "./color-picker.types.js";

  const DEFAULT_PALETTE = [
    "#000000", "#ffffff", "#f87171", "#fb923c", "#fbbf24",
    "#a3e635", "#4ade80", "#34d399", "#22d3ee", "#60a5fa",
    "#818cf8", "#a78bfa", "#e879f9", "#f472b6", "#fb7185",
    "#94a3b8", "#475569", "#1e293b", "#78350f", "#7c2d12",
  ];

  let {
    value: controlledValue,
    defaultValue = "#000000",
    showPalette = true,
    palette = DEFAULT_PALETTE,
    showInput = true,
    format = "hex" as const,
    disabled = false,
    "aria-label": ariaLabel = "Color picker",
    onValueChange,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: ColorPickerProps = $props();

  let internalValue = $state(untrack(() => defaultValue));
  let current = $derived(controlledValue ?? internalValue);
  let open = $state(false);
  let inputEl: HTMLInputElement | undefined = $state();
  let _autoId = $props.id();
  const pickerId = $derived(id ?? _autoId);

  function setColor(c: string) {
    if (controlledValue === undefined) internalValue = c;
    onValueChange?.(c);
  }

  function handleInputChange(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    setColor(v);
  }

  function isValidHex(c: string): boolean {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c);
  }

  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!isValidHex(hex)) return null;
    const m = hex.replace("#", "");
    const full = m.length === 3
      ? m.split("").map((c) => c + c).join("")
      : m;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  }

  function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0; let s = 0; const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  const rgbText = $derived.by(() => {
    const rgb = hexToRgb(current);
    if (!rgb) return current;
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  });

  const hslText = $derived.by(() => {
    const rgb = hexToRgb(current);
    if (!rgb) return current;
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `hsl(${h}, ${s}%, ${l}%)`;
  });

  const inputValue = $derived(
    format === "hex" ? current : format === "rgb" ? rgbText : hslText,
  );
</script>

<div
  {id}
  class={cn("pui-color-picker relative inline-block", className)}
  {style}
  data-testid={dataTestId}
  use:clickOutside={() => { if (open) open = false; }}
>
  <button
    type="button"
    aria-label={ariaLabel}
    aria-haspopup="dialog"
    aria-expanded={open}
    {disabled}
    onclick={() => { if (!disabled) open = !open; }}
    class={cn(
      "flex items-center gap-2 p-1 pr-3 rounded-(--pui-radius-control) border bg-(--pui-field-bg,var(--pui-surface-base)) transition-colors",
      "border-(--pui-field-border,var(--pui-outline))",
      !disabled && "hover:border-(--pui-color-primary)",
      disabled && "opacity-(--pui-opacity-disabled) cursor-not-allowed",
    )}
  >
    <span
      class="w-7 h-7 rounded border border-(--pui-outline) shrink-0"
      style="background-color: {current}"
      aria-hidden="true"
    ></span>
    {#if showInput}
      <span class="text-sm font-mono text-(--pui-text-primary)">{inputValue}</span>
    {/if}
  </button>

  {#if open}
    <div
      role="dialog"
      aria-label="Color palette"
      transition:scale={{ start: 0.95, duration: 150 }}
      class="absolute z-(--pui-z-overlay) mt-1 p-3 bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle)"
    >
      {#if showPalette}
        <div class="grid grid-cols-10 gap-1.5" role="listbox" aria-label="Color palette">
          {#each palette as c}
            <button
              type="button"
              role="option"
              aria-selected={c === current}
              aria-label={`Color ${c}`}
              class={cn(
                "w-5 h-5 rounded border-2 transition-transform hover:scale-110",
                c === current
                  ? "border-(--pui-color-primary) ring-2 ring-(--pui-color-primary-container)"
                  : "border-(--pui-outline-subtle)",
              )}
              style="background-color: {c}"
              onclick={() => { setColor(c); open = false; }}
            ></button>
          {/each}
        </div>
      {/if}

      {#if showInput}
        <div class="mt-3 pt-3 border-t border-(--pui-outline-subtle) flex items-center gap-2">
          <label for={`${pickerId}-input`} class="text-xs text-(--pui-text-secondary) shrink-0">Hex</label>
          <input
            bind:this={inputEl}
            id={`${pickerId}-input`}
            type="text"
            value={current}
            oninput={handleInputChange}
            class="flex-1 h-7 px-2 text-sm font-mono bg-(--pui-surface-variant) text-(--pui-text-primary) border border-(--pui-outline) rounded-(--pui-radius-control) focus:border-(--pui-color-primary) focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-1"
          />
          <input
            type="color"
            value={isValidHex(current) ? current : "#000000"}
            oninput={handleInputChange}
            aria-label="Color picker"
            class="w-7 h-7 p-0 border border-(--pui-outline) rounded-(--pui-radius-control) cursor-pointer"
          />
        </div>
      {/if}
    </div>
  {/if}
</div>
