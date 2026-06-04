<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import type { InputOTPProps } from "./input-otp.types.js";

  let {
    value: controlledValue,
    defaultValue = "",
    length = 6,
    pattern = /^[0-9]$/,
    mask = false,
    disabled = false,
    readonly = false,
    autoFocus = false,
    placeholder = "·",
    type = "text",
    "aria-label": ariaLabel = "One-time password",
    onValueChange,
    onComplete,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: InputOTPProps = $props();

  let internalValue = $state(untrack(() => defaultValue));
  let currentValue = $derived(controlledValue ?? internalValue);
  let inputs: HTMLInputElement[] = $state([]);
  const slots = $derived(Array.from({ length }, (_, i) => i));
  let _autoId = $props.id();
  const otpId = $derived(id ?? _autoId);

  function setValue(next: string) {
    const sanitized = next.slice(0, length);
    if (controlledValue === undefined) internalValue = sanitized;
    onValueChange?.(sanitized);
    if (sanitized.length === length) onComplete?.(sanitized);
  }

  function getValue(): string {
    return inputs.map((el) => el?.value ?? "").join("");
  }

  function charAt(i: number): string {
    return currentValue[i] ?? "";
  }

  function handleInput(i: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const raw = target.value;
    if (!raw) {
      setValue(currentValue.slice(0, i) + currentValue.slice(i + 1));
      return;
    }
    const last = raw[raw.length - 1];
    if (!pattern.test(last)) {
      target.value = currentValue[i] ?? "";
      return;
    }
    const next = currentValue.slice(0, i) + last + currentValue.slice(i + 1);
    setValue(next);
    target.value = last;
    if (i < length - 1) inputs[i + 1]?.focus();
  }

  function handleKeydown(i: number, e: KeyboardEvent) {
    if (e.key === "Backspace" && !inputs[i]?.value && i > 0) {
      inputs[i - 1]?.focus();
      const next = currentValue.slice(0, i - 1) + currentValue.slice(i);
      setValue(next);
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputs[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      inputs[i + 1]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      inputs[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      inputs[length - 1]?.focus();
    }
  }

  function handlePaste(_i: number, e: ClipboardEvent) {
    const clip = e.clipboardData?.getData("text") ?? "";
    const cleaned = clip.replace(/[^0-9a-zA-Z]/g, "").slice(0, length);
    if (cleaned) {
      e.preventDefault();
      setValue(cleaned);
      const focusIdx = Math.min(cleaned.length, length - 1);
      inputs[focusIdx]?.focus();
    }
  }

  $effect(() => {
    if (autoFocus && inputs[0] && !disabled) {
      inputs[0].focus();
    }
  });
</script>

<div
  {id}
  class={cn("pui-input-otp flex items-center gap-2", className)}
  {style}
  data-testid={dataTestId}
  role="group"
  aria-label={ariaLabel}
>
  {#each slots as i (i)}
    <input
      bind:this={inputs[i]}
      type={type}
      inputmode={type === "number" ? "numeric" : "text"}
      maxlength="1"
      autocomplete="one-time-code"
      aria-label={`Digit ${i + 1} of ${length}`}
      value={mask && charAt(i) ? "•" : charAt(i)}
      placeholder={placeholder}
      {disabled}
      {readonly}
      class={cn(
        "w-10 h-12 text-center text-lg font-medium rounded-(--pui-radius-control)",
        "bg-(--pui-field-bg,var(--pui-surface-base))",
        "border",
        charAt(i) ? "border-(--pui-color-primary)" : "border-(--pui-outline)",
        "focus:border-(--pui-color-primary) focus:outline-2 focus:outline-(--pui-color-primary) focus:outline-offset-2",
        disabled && "opacity-(--pui-opacity-disabled) cursor-not-allowed",
        "transition-colors",
      )}
      oninput={(e) => handleInput(i, e)}
      onkeydown={(e) => handleKeydown(i, e)}
      onpaste={(e) => handlePaste(i, e)}
    />
  {/each}
</div>
