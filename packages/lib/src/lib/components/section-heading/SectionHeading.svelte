<script lang="ts">
  // 统一章节标题：eyebrow + display 标题 + 副标题
  // 受 token 驱动：Apple track 用 Instrument Serif display，Material 用 Bricolage Grotesque
  import { cn } from '../../internal/class.js';
  import type { SectionHeadingProps } from './section-heading.types.js';

  let {
    id,
    eyebrow,
    title,
    description,
    level = 2,
    class: className,
    style,
  }: SectionHeadingProps = $props();

  // 根据 level 渲染不同 HTML 标签
  const Tag = $derived(`h${level}` as 'h1' | 'h2' | 'h3');
</script>

<header
  {id}
  class={cn('flex flex-col gap-3', className)}
  {style}
  data-pui-section-heading
>
  {#if eyebrow}
    <span
      class="font-(family-name:--pui-font-mono) text-xs font-medium uppercase tracking-[0.18em]
             text-(--pui-text-secondary) opacity-80"
    >
      {eyebrow}
    </span>
  {/if}
  <svelte:element
    this={Tag}
    class="font-(family-name:--pui-font-display) text-3xl font-normal leading-[1.1]
           tracking-[-0.02em] text-(--pui-text-primary)
           sm:text-4xl"
  >
    {title}
  </svelte:element>
  {#if description}
    <p class="max-w-2xl text-base leading-relaxed text-(--pui-text-secondary)">
      {description}
    </p>
  {/if}
</header>
