<script lang="ts">
  import { cn } from '../../internal/class.js';
  import { dataAttrs } from '../../internal/attrs.js';
  import type { AvatarProps, AvatarSize } from './avatar.types.js';

  let {
    src,
    alt,
    name,
    size = 'md' as AvatarSize,
    status,
    children,
    class: className,
    style,
    id,
    'data-testid': dataTestId,
    ...rest
  }: AvatarProps = $props();

  const initials = $derived(
    name
      ? name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
      : undefined
  );

  // 跟踪图片加载失败状态，失败时显示 initials/children fallback
  let imgFailed = $state(false);
  // src 变化时（如重试）重置失败标记
  let prevSrc = $state<string | undefined>(undefined);
  $effect(() => {
    if (prevSrc !== src) {
      imgFailed = false;
      prevSrc = src;
    }
  });

  const attrs = $derived(dataAttrs({ size, status }));
</script>

<span
  {...rest}
  {...attrs}
  id={id}
  class={cn(
    'pui-avatar',
    'relative inline-flex items-center justify-center overflow-hidden',
    'rounded-[var(--pui-avatar-radius,999px)]',
    'bg-[var(--pui-avatar-bg,var(--pui-surface-variant))]',
    'text-[var(--pui-avatar-fg,var(--pui-text-secondary))]',
    'font-medium',
    // Size
    size === 'xs' && 'h-6 w-6 text-[10px]',
    size === 'sm' && 'h-8 w-8 text-xs',
    size === 'md' && 'h-10 w-10 text-sm',
    size === 'lg' && 'h-12 w-12 text-base',
    size === 'xl' && 'h-16 w-16 text-lg',
    className
  )}
  style={style}
  data-testid={dataTestId}
>
  {#if src && !imgFailed}
    <img
      src={src}
      alt={alt || name || ''}
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover"
      onerror={() => { imgFailed = true; }}
    />
  {:else if initials}
    <span class="select-none">{initials}</span>
  {:else}
    {@render children?.()}
  {/if}
  {#if status}
    <span
      class="absolute bottom-0 right-0 block rounded-full border-2 border-[var(--pui-surface-base)]
             h-[calc(var(--pui-avatar-status-dot-size,10px))] w-[calc(var(--pui-avatar-status-dot-size,10px))]
             bg-[var(--pui-avatar-status-color,var(--pui-color-tertiary))]
             {status === 'busy' && 'bg-[var(--pui-color-error)]'}
             {status === 'away' && 'bg-[var(--pui-apple-system-yellow,var(--pui-color-primary))]'}"
      role="img"
      aria-label={status === 'online' ? 'Online' : status === 'busy' ? 'Busy' : status === 'away' ? 'Away' : status === 'offline' ? 'Offline' : status}
    ></span>
  {/if}
</span>

