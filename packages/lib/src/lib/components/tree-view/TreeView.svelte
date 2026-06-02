<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import TreeNodeRow from './TreeNodeRow.svelte';
  import type { TreeViewProps, TreeNode } from './tree-view.types.js';
  let { nodes = [], selectedId: controlledSelected, expandedIds: controlledExpanded, defaultExpandedIds = [], class: className, style, id, 'data-testid': dataTestId, onselect, onexpandedchange, ...rest }: TreeViewProps = $props();
  let expanded = $state<string[]>(untrack(() => defaultExpandedIds));
  let expandedSet = $derived(new Set(controlledExpanded ?? expanded));

  function toggle(id: string) {
    if (controlledExpanded) {
      const next = expandedSet.has(id) ? controlledExpanded.filter(e => e !== id) : [...controlledExpanded, id];
      onexpandedchange?.(next);
    } else {
      const next = expandedSet.has(id) ? expanded.filter(e => e !== id) : [...expanded, id];
      expanded = next;
      onexpandedchange?.(next);
    }
  }
  function select(id: string) { onselect?.(id); }

  // Flat list of visible nodes for keyboard navigation
  function flattenVisible(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    function walk(list: TreeNode[]) {
      for (const n of list) {
        result.push(n);
        if (n.children && expandedSet.has(n.id)) walk(n.children);
      }
    }
    walk(nodes);
    return result;
  }
  let visibleNodes = $derived(flattenVisible(nodes));

  function handleTreeKeydown(e: KeyboardEvent) {
    const target = e.currentTarget as HTMLElement;
    const focused = target.querySelector<HTMLElement>('[tabindex="0"]');
    if (!focused) return;
    const curId = focused.dataset.nodeId;
    const curIdx = curId ? visibleNodes.findIndex(n => n.id === curId) : -1;
    if (curIdx < 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(curIdx + 1, visibleNodes.length - 1);
      moveFocusTo(next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(curIdx - 1, 0);
      moveFocusTo(prev);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const node = visibleNodes[curIdx];
      if (node.children && !expandedSet.has(node.id)) {
        toggle(node.id);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const node = visibleNodes[curIdx];
      if (node.children && expandedSet.has(node.id)) {
        toggle(node.id);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      moveFocusTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      moveFocusTo(visibleNodes.length - 1);
    }
  }

  function moveFocusTo(idx: number) {
    const el = document.querySelector<HTMLElement>(`[data-node-id="${visibleNodes[idx]?.id}"]`);
    if (el) {
      document.querySelectorAll('[data-node-id]').forEach(n => n.setAttribute('tabindex', '-1'));
      el.setAttribute('tabindex', '0');
      el.focus();
    }
  }

  // Initialize first visible node as focusable
  $effect(() => {
    if (visibleNodes.length > 0) {
      const first = document.querySelector<HTMLElement>(`[data-node-id="${visibleNodes[0].id}"]`);
      if (first) { first.setAttribute('tabindex', '0'); }
    }
  });
</script>
<ul {...rest} id={id} role="tree" class={cn('pui-tree-view space-y-0.5', className)} style={style} data-testid={dataTestId} onkeydown={handleTreeKeydown}>
  {#each nodes as node}
    <TreeNodeRow {node} selectedId={controlledSelected} {expandedSet} depth={0} onselect={select} ontoggle={toggle} />
  {/each}
</ul>
