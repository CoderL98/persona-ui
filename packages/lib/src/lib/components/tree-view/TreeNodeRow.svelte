<script lang="ts">
  import { cn } from '../../internal/class.js';
  import TreeNodeRow from './TreeNodeRow.svelte';
  import type { TreeNode } from './tree-view.types.js';

  let {
    node,
    selectedId,
    expandedSet,
    depth = 0,
    onSelect,
    ontoggle,
  }: {
    node: TreeNode;
    selectedId?: string;
    expandedSet: Set<string>;
    depth?: number;
    onSelect: (id: string) => void;
    ontoggle: (id: string) => void;
  } = $props();

  const hasChildren = $derived(!!node.children && node.children.length > 0);
  const isExpanded = $derived(hasChildren && expandedSet.has(node.id));
</script>

<li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={node.id === selectedId}>
  <button type="button" tabindex={-1} data-node-id={node.id}
    class={cn('flex w-full items-center gap-1 px-2 py-1 text-left text-sm rounded-(--pui-radius-control) transition-colors',
      !node.disabled && 'cursor-pointer hover:bg-(--pui-surface-variant)',
      node.id === selectedId && 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)',
      node.disabled && 'opacity-(--pui-opacity-disabled) pointer-events-none')}
    onclick={() => { if (!node.disabled) { onSelect(node.id); if (hasChildren) ontoggle(node.id); } }}
    onkeydown={(e) => { if (!node.disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(node.id); if (hasChildren) ontoggle(node.id); } }}>
    {#if hasChildren}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" class="shrink-0 transition-transform" class:rotate-90={isExpanded}><path d="M4 3l4 3-4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    {:else}<span class="w-3"></span>{/if}
    <span>{node.label}</span>
  </button>
  {#if hasChildren && isExpanded}
    <ul role="group" class="pl-4 space-y-0.5 mt-0.5">
      {#each node.children as child}
        <TreeNodeRow node={child} {selectedId} {expandedSet} depth={depth + 1} {onSelect} {ontoggle} />
      {/each}
    </ul>
  {/if}
</li>
