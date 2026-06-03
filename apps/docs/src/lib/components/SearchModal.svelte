<script lang="ts">
	import { goto } from '$app/navigation';
	import { searchDocs, type SearchResult } from '$lib/docs';
	import { currentLocale } from '$lib/i18n/store.svelte';
	import { localeToPath } from '$lib/i18n/locales';

	function cn(...args: (string | false | null | undefined)[]) {
		return args.filter(Boolean).join(' ');
	}

	let { open = $bindable(false) }: { open?: boolean } = $props();

	let query = $state('');
	let activeIndex = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	const locale = $derived(currentLocale.value);
	const results = $derived<SearchResult[]>(query.trim() ? searchDocs(query, locale) : []);

	$effect(() => {
		if (open) {
			activeIndex = 0;
			queueMicrotask(() => inputEl?.focus());
		} else {
			query = '';
		}
	});

	function close() {
		open = false;
	}

	function selectResult(r: SearchResult) {
		close();
		goto(`${localeToPath(locale)}/docs/${r.slug}`);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			activeIndex = Math.min(results.length - 1, activeIndex + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			activeIndex = Math.max(0, activeIndex - 1);
		} else if (e.key === 'Enter' && results[activeIndex]) {
			e.preventDefault();
			selectResult(results[activeIndex]);
		}
	}

	// 全局 Cmd/Ctrl+K 打开
	function handleGlobalKey(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = !open;
		}
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		window.addEventListener('keydown', handleGlobalKey);
		return () => window.removeEventListener('keydown', handleGlobalKey);
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (!open && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = true;
		} else if (open && e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}}
/>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-(--pui-z-modal) flex items-start justify-center pt-20 px-4"
		role="dialog"
		aria-modal="true"
		aria-label="Search documentation"
	>
		<div
			class="absolute inset-0 bg-(--pui-md-sys-color-scrim,rgb(0 0 0 / 0.4))"
			onclick={close}
		></div>
		<div
			class="relative w-full max-w-xl bg-(--pui-surface-base) rounded-(--pui-radius-container) shadow-(--pui-elevation-3) border border-(--pui-outline-subtle) overflow-hidden"
		>
			<div class="flex items-center gap-2 px-4 py-3 border-b border-(--pui-outline-subtle)">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" class="text-(--pui-text-disabled) shrink-0">
					<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
					<path d="M12.5 12.5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<input
					bind:this={inputEl}
					bind:value={query}
					type="search"
					placeholder="Search documentation…"
					aria-label="Search"
					autocomplete="off"
					spellcheck="false"
					onkeydown={handleKey}
					class="flex-1 bg-transparent text-(--pui-text-primary) placeholder:text-(--pui-text-disabled) outline-none text-sm"
				/>
				<kbd class="text-[10px] font-mono text-(--pui-text-disabled) bg-(--pui-surface-variant) px-1.5 py-0.5 rounded">Esc</kbd>
			</div>

			<div class="max-h-80 overflow-y-auto">
				{#if !query.trim()}
					<div class="px-4 py-8 text-center text-sm text-(--pui-text-disabled)">
						Start typing to search…
					</div>
				{:else if results.length === 0}
					<div class="px-4 py-8 text-center text-sm text-(--pui-text-disabled)">
						No results for <span class="text-(--pui-text-secondary)">"{query}"</span>
					</div>
				{:else}
					<ul role="listbox" aria-label="Search results">
						{#each results as r, i (r.slug + r.locale)}
							{@const isActive = i === activeIndex}
							<li role="option" aria-selected={isActive}>
								<button
									type="button"
									onclick={() => selectResult(r)}
									onmouseenter={() => { activeIndex = i; }}
									class={cn(
										'w-full text-left px-4 py-2 transition-colors',
										isActive ? 'bg-(--pui-surface-variant)' : 'hover:bg-(--pui-surface-variant)',
									)}
								>
									<div class="flex items-center gap-2 mb-0.5">
										<span class="text-xs uppercase tracking-wide text-(--pui-text-disabled)">{r.group}</span>
									</div>
									<div class="text-sm font-medium text-(--pui-text-primary)">{r.title}</div>
									{#if r.excerpt}
										<div class="text-xs text-(--pui-text-secondary) mt-0.5 line-clamp-2">{r.excerpt}</div>
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div class="flex items-center justify-between gap-2 px-4 py-2 border-t border-(--pui-outline-subtle) bg-(--pui-surface-variant) text-[10px] text-(--pui-text-disabled)">
				<div class="flex items-center gap-3">
					<span class="flex items-center gap-1">
						<kbd class="font-mono bg-(--pui-surface-base) px-1 rounded">↑</kbd>
						<kbd class="font-mono bg-(--pui-surface-base) px-1 rounded">↓</kbd>
						navigate
					</span>
					<span class="flex items-center gap-1">
						<kbd class="font-mono bg-(--pui-surface-base) px-1 rounded">↵</kbd>
						select
					</span>
				</div>
				<span>{results.length} result{results.length === 1 ? '' : 's'}</span>
			</div>
		</div>
	</div>
{/if}
