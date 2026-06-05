<script lang="ts">
  // Fab 组件 — MD3 Floating Action Button（浮动操作按钮）
  // 3 档尺寸：small (40dp 紧凑工具栏) / regular (56dp 标准) / large (96dp Extended FAB)
  // 4 档颜色：surface / primary / secondary / tertiary（对应 MD3 4 档强调度）
  // 触觉：点击触发 medium 触感（比 Button 的 light 重一档，因为 FAB 通常代表"主要操作"）
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import { triggerHaptic } from '../../internal/haptics.js';
  import type { FabProps, FabVariant, FabSize } from './fab.types.js';

  let {
    variant = 'primary' as FabVariant,
    size = 'regular' as FabSize,
    label,
    extendedLabel,
    disabled = false,
    loading = false,
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    onClick,
    ...rest
  }: FabProps = $props();

  // Svelte 5.20+ $props.id() 生成编译时位置 hash，SSR/CSR 稳定
  let _autoId = $props.id();
  const fabId = $derived(id ?? _autoId);

  const attrs = $derived(dataAttrs({ variant, size, loading: loading || undefined }));
</script>

<button
  {...rest}
  {...attrs}
  id={fabId}
  class={cn(
    'pui-fab',
    'pui-state-layer',
    'inline-flex items-center justify-center gap-(--pui-space-2)',
    'select-none transition-shadow',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'shadow-(--pui-elevation-3) hover:shadow-(--pui-elevation-4)',
    'min-h-(--pui-hit-target-min,44px) min-w-(--pui-hit-target-min,44px)',
    // Size（MD3 标准）
    size === 'small' && 'h-(--pui-fab-size-small,40px) min-w-(--pui-fab-size-small,40px) px-3 text-sm',
    size === 'regular' && 'h-(--pui-fab-size-regular,56px) min-w-(--pui-fab-size-regular,56px) px-5 text-base',
    size === 'large' && 'h-(--pui-fab-size-large,96px) min-w-(--pui-fab-size-large,96px) px-6 text-lg',
    // MD3 FAB 永远 16px 圆角（large 除外，large 用 28px）— M12 PR2 改用通用 token
    size !== 'large' && 'rounded-(--pui-fab-radius-sm,16px)',
    size === 'large' && 'rounded-(--pui-fab-radius-lg,28px)',
    // Variants — M12 PR2 改用通用 token（各主题在自己的 CSS 中映射到 sys-* 源 token）
    variant === 'surface' && 'bg-(--pui-fab-bg-surface) text-(--pui-fab-fg-surface)',
    variant === 'primary' && 'bg-(--pui-fab-bg-primary) text-(--pui-fab-fg-primary)',
    variant === 'secondary' && 'bg-(--pui-fab-bg-secondary) text-(--pui-fab-fg-secondary)',
    variant === 'tertiary' && 'bg-(--pui-fab-bg-tertiary) text-(--pui-fab-fg-tertiary)',
    // States
    disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none',
    loading && 'cursor-wait',
    !disabled && 'cursor-pointer',
    className
  )}
  style={style}
  disabled={disabled}
  aria-label={label}
  aria-busy={loading || undefined}
  data-testid={dataTestId}
  onclick={(e) => {
    if (disabled || loading) return;
    triggerHaptic('medium');
    onClick?.(e);
  }}
>
  {#if loading}
    <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>
  {:else}
    {@render children?.()}
  {/if}
  {#if extendedLabel && size === 'large'}
    <span class="font-medium">{extendedLabel}</span>
  {/if}
</button>
