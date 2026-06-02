<script lang="ts">
  import { untrack } from 'svelte';
  import { cn } from '../../internal/class.js';
  import type { DataTableProps } from './data-table.types.js';
  type DataTableTexts = { selectAll: string; selectRow: string };
  let { data = [], columns = [], sortKey: controlledSortKey, sortDirection: controlledSortDir, selectable, selectedKeys: controlledSelectedKeys = [], getRowKey, texts: localTexts, class: className, style, id, 'data-testid': dataTestId, onsort, onselectionchange, ...rest }: DataTableProps = $props();
  const defaults: DataTableTexts = { selectAll: 'Select all', selectRow: 'Select row' };
  const t = $derived({ ...defaults, ...localTexts });

  let internalSortKey = $state<string | undefined>(untrack(() => controlledSortKey));
  let internalSortDir = $state<'asc' | 'desc'>(untrack(() => controlledSortDir ?? 'asc'));
  let currentSortKey = $derived(controlledSortKey ?? internalSortKey);
  let currentSortDir = $derived(controlledSortDir ?? internalSortDir);
  let internalSelected = $state<string[]>([]);
  let selectedSet = $derived(new Set(controlledSelectedKeys ?? internalSelected));

  const rowKey = $derived(getRowKey ?? ((_: Record<string, unknown>, i: number) => String(i)));

  let sortedData = $derived.by(() => {
    if (!currentSortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[currentSortKey as keyof typeof a];
      const bVal = b[currentSortKey as keyof typeof b];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return currentSortDir === 'desc' ? -cmp : cmp;
    });
  });

  function handleSort(colKey: string) {
    const col = columns.find(c => c.key === colKey);
    if (!col?.sortable) return;
    if (currentSortKey === colKey) {
      const next: 'asc' | 'desc' = currentSortDir === 'asc' ? 'desc' : 'asc';
      if (controlledSortKey === undefined) internalSortDir = next;
      onsort?.(colKey, next);
    } else {
      if (controlledSortKey === undefined) internalSortKey = colKey;
      if (controlledSortDir === undefined) internalSortDir = 'asc';
      onsort?.(colKey, 'asc');
    }
  }

  function toggleSelect(key: string) {
    const next = selectedSet.has(key)
      ? (controlledSelectedKeys ?? internalSelected).filter(k => k !== key)
      : [...(controlledSelectedKeys ?? internalSelected), key];
    if (controlledSelectedKeys === undefined) internalSelected = next;
    onselectionchange?.(next);
  }

  function toggleSelectAll() {
    if (selectedSet.size === sortedData.length) {
      const next: string[] = [];
      if (controlledSelectedKeys === undefined) internalSelected = next;
      onselectionchange?.(next);
    } else {
      const next = sortedData.map((row, i) => rowKey(row, i));
      if (controlledSelectedKeys === undefined) internalSelected = next;
      onselectionchange?.(next);
    }
  }

  // indeterminate is a DOM property, not an HTML attribute — set via ref
  let selectAllEl: HTMLInputElement | undefined = $state();
  $effect(() => {
    if (!selectAllEl) return;
    selectAllEl.indeterminate = sortedData.length > 0 && selectedSet.size > 0 && selectedSet.size < sortedData.length;
  });
</script>
<div class="overflow-x-auto rounded-(--pui-radius-container) border border-(--pui-outline-subtle)">
  <table {...rest} id={id} class={cn('pui-data-table w-full text-sm', className)} style={style} data-testid={dataTestId}>
    <thead class="bg-(--pui-surface-variant)">
      <tr>
        {#if selectable}
          <th class="px-3 py-2 w-10">
            <input type="checkbox" aria-label={t.selectAll} bind:this={selectAllEl}
              checked={sortedData.length > 0 && selectedSet.size === sortedData.length}
              onchange={toggleSelectAll} />
          </th>
        {/if}
        {#each columns as col}
          <th class="px-3 py-2 text-left font-medium text-(--pui-text-secondary)">
            {#if col.sortable}
              <button type="button" class="inline-flex items-center gap-1 hover:text-(--pui-text-primary) transition-colors"
                onclick={() => handleSort(col.key)}>
                {col.header}
                {#if currentSortKey === col.key}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    {#if currentSortDir === 'asc'}
                      <path d="M6 2l-3 3h6z" fill="currentColor"/>
                    {:else}
                      <path d="M6 10l-3-3h6z" fill="currentColor"/>
                    {/if}
                  </svg>
                {:else}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" class="opacity-30">
                    <path d="M6 2l-3 3h6zM6 10l-3-3h6z" fill="currentColor"/>
                  </svg>
                {/if}
              </button>
            {:else}
              {col.header}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="divide-y divide-(--pui-outline-subtle)">
      {#each sortedData as row, i}
        <tr class={cn('transition-colors', selectable && selectedSet.has(rowKey(row, i)) && 'bg-(--pui-color-primary-container)', !selectable && 'hover:bg-(--pui-surface-variant)')}>
          {#if selectable}
            <td class="px-3 py-2">
              <input type="checkbox" aria-label={t.selectRow}
                checked={selectedSet.has(rowKey(row, i))}
                onchange={() => toggleSelect(rowKey(row, i))} />
            </td>
          {/if}
          {#each columns as col}
            <td class="px-3 py-2 text-(--pui-text-primary)">
              {#if col.render}
                {@render col.render(row)}
              {:else}
                {String(row[col.key as keyof typeof row] ?? '')}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
