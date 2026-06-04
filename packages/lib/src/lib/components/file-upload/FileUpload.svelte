<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "../../internal/class.js";
  import type { FileUploadProps, FileUploadFile } from "./file-upload.types.js";

  let {
    value: controlledValue,
    defaultValue = [],
    accept,
    multiple = false,
    maxSize,
    disabled = false,
    placeholder = "Drop files here or click to browse",
    helperText,
    error,
    leading,
    onValueChange,
    onRemove,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
    ...rest
  }: FileUploadProps = $props();

  let internalValue = $state<FileUploadFile[]>(untrack(() => defaultValue));
  let currentValue = $derived(controlledValue ?? internalValue);
  let dragOver = $state(false);
  let inputEl: HTMLInputElement | undefined = $state();
  let _autoId = $props.id();
  const uploadId = $derived(id ?? _autoId);

  function toFileInfo(file: File): FileUploadFile {
    return { name: file.name, size: file.size, type: file.type };
  }

  function filter(files: FileList | null): FileUploadFile[] {
    if (!files) return [];
    const result: FileUploadFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (maxSize && f.size > maxSize) continue;
      result.push(toFileInfo(f));
      if (!multiple) break;
    }
    return result;
  }

  function setFiles(next: FileUploadFile[]) {
    if (controlledValue === undefined) internalValue = next;
    onValueChange?.(next);
  }

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    setFiles(filter(target.files));
    target.value = "";
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragOver = false;
    if (disabled) return;
    rest.ondrop?.(e);
    setFiles(filter(e.dataTransfer?.files ?? null));
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (disabled) return;
    dragOver = true;
    rest.ondragover?.(e);
  }

  function handleDragLeave() {
    dragOver = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputEl?.click();
    }
  }

  function removeAt(idx: number) {
    const next = currentValue.filter((_, i) => i !== idx);
    setFiles(next);
    onRemove?.(idx);
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
</script>

<div
  {id}
  class={cn("pui-file-upload flex flex-col gap-2", className)}
  {style}
  data-testid={dataTestId}
>
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-label={placeholder}
    aria-disabled={disabled}
    class={cn(
      "flex flex-col items-center justify-center gap-2 px-6 py-8 rounded-(--pui-radius-container)",
      "border-2 border-dashed transition-colors cursor-pointer select-none",
      "bg-(--pui-surface-base)",
      dragOver
        ? "border-(--pui-color-primary) bg-(--pui-color-primary-container)"
        : "border-(--pui-outline) hover:border-(--pui-color-primary) hover:bg-(--pui-surface-variant)",
      error && "border-(--pui-color-error) bg-(--pui-color-error-container)",
      disabled && "opacity-(--pui-opacity-disabled) cursor-not-allowed pointer-events-none",
    )}
    onclick={() => inputEl?.click()}
    onkeydown={handleKeydown}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
  >
    {#if leading}
      <span class="text-(--pui-text-secondary)">{@render leading()}</span>
    {:else}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" class="text-(--pui-text-secondary)">
        <path d="M16 20V8M16 8l-4 4M16 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 22v2a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    {/if}
    <p class="text-sm text-(--pui-text-secondary) text-center">{placeholder}</p>
    {#if accept || maxSize}
      <p class="text-xs text-(--pui-text-disabled) text-center">
        {#if accept}Accepts: {accept}{/if}
        {#if accept && maxSize} · {/if}
        {#if maxSize}Max: {formatSize(maxSize)}{/if}
      </p>
    {/if}
    <input
      bind:this={inputEl}
      type="file"
      {accept}
      {multiple}
      {disabled}
      class="sr-only"
      onchange={handleChange}
    />
  </div>

  {#if currentValue.length > 0}
    <ul class="flex flex-col gap-1 mt-1" role="list">
      {#each currentValue as file, i (file.name + i)}
        <li class="flex items-center gap-2 px-3 py-2 rounded-(--pui-radius-control) bg-(--pui-surface-variant) text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 text-(--pui-text-secondary)">
            <path d="M3 1.5h7L13 4.5v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10 1.5V4.5H13" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="flex-1 truncate text-(--pui-text-primary)">{file.name}</span>
          <span class="text-xs text-(--pui-text-secondary) shrink-0">{formatSize(file.size)}</span>
          <button
            type="button"
            aria-label="Remove"
            class="shrink-0 p-1 rounded-full hover:bg-(--pui-surface-base) text-(--pui-text-secondary) hover:text-(--pui-color-error) transition-colors"
            onclick={() => removeAt(i)}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if error}
    <p class="text-xs text-(--pui-color-error)" role="alert">{error}</p>
  {:else if helperText}
    <p class="text-xs text-(--pui-text-secondary)">{helperText}</p>
  {/if}
</div>
