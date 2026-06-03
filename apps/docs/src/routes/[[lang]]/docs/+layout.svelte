<script lang="ts">
	import { page } from '$app/state';
	import { docs, getTitle } from '../../../lib/docs';
	import { currentLocale } from '../../../lib/i18n/store.svelte';
	import { localeToPath } from '../../../lib/i18n/locales';
	import { t } from '../../../lib/i18n/t';
	import SearchModal from '../../../lib/components/SearchModal.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
	let searchOpen = $state(false);

	const locale = $derived(currentLocale.value);

	const guide = $derived(
		docs(locale)
			.filter((d) => d.group === 'guide')
			.sort((a, b) => a.slug.localeCompare(b.slug)),
	);
	const components = $derived(
		docs(locale)
			.filter((d) => d.group === 'components')
			.sort((a, b) => a.slug.localeCompare(b.slug)),
	);

	// 当前路径的"裸"段（不包含 locale 前缀）
	const currentBareSlug = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		// [lang, 'docs', ...slug] → 取出 docs 之后
		if ((segments[0] === 'zh-cn' || segments[0] === 'zh-tw') && segments[1] === 'docs') {
			return segments.slice(2).join('/');
		}
		// ['docs', ...slug] → docs 之后
		if (segments[0] === 'docs') return segments.slice(1).join('/');
		return '';
	});

	function isActive(slug: string): boolean {
		return currentBareSlug === slug;
	}

	function linkFor(slug: string): string {
		return `${localeToPath(locale)}/docs/${slug}`;
	}

	// 文档显示标题：优先用 frontmatter title（已含翻译），fallback 到 slug 美化
	function displayTitle(slug: string): string {
		return getTitle(slug, locale) ?? slug;
	}
</script>

<div class="docs-layout">
	<aside class="docs-sidebar">
		<a class="docs-sidebar__back" href="{localeToPath(locale)}/">{t('backToHome')}</a>

		<button
			type="button"
			class="docs-search-trigger w-full mt-2 mb-3 flex items-center gap-2 px-3 py-2 text-sm rounded-(--pui-radius-control) bg-(--pui-surface-variant) text-(--pui-text-secondary) hover:bg-(--pui-surface-base) border border-(--pui-outline-subtle) transition-colors"
			onclick={() => { searchOpen = true; }}
		>
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5"/>
				<path d="M9 9l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
			<span class="flex-1 text-left">{t('search')}</span>
			<kbd class="text-[10px] font-mono bg-(--pui-surface-base) px-1.5 py-0.5 rounded border border-(--pui-outline-subtle)">⌘K</kbd>
		</button>

		<nav class="docs-nav">
			<section class="docs-nav__group">
				<h3>{t('sidebarGuides')}</h3>
				<ul>
					{#each guide as doc (doc.slug)}
						<li>
							<a
								href={linkFor(doc.slug)}
								class:active={isActive(doc.slug)}
							>
								{displayTitle(doc.slug)}
							</a>
						</li>
					{/each}
				</ul>
			</section>

			<section class="docs-nav__group">
				<h3>{t('sidebarComponents')}</h3>
				<ul>
					{#each components as doc (doc.slug)}
						<li>
							<a
								href={linkFor(doc.slug)}
								class:active={isActive(doc.slug)}
							>
								{displayTitle(doc.slug)}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		</nav>
	</aside>

	<SearchModal bind:open={searchOpen} />

	<article class="docs-content">
		{@render children?.()}
	</article>
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 2.5rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.docs-sidebar {
		position: sticky;
		top: 5rem;
		align-self: start;
		max-height: calc(100vh - 6rem);
		overflow-y: auto;
		padding-right: 0.5rem;
	}

	.docs-sidebar__back {
		display: inline-block;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		opacity: 0.7;
		text-decoration: none;
	}

	.docs-sidebar__back:hover {
		opacity: 1;
	}

	.docs-nav__group {
		margin-bottom: 1.5rem;
	}

	.docs-nav__group h3 {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.5;
		margin-bottom: 0.5rem;
		padding: 0 0.5rem;
	}

	.docs-nav__group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.docs-nav__group a {
		display: block;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
		text-decoration: none;
		opacity: 0.75;
		transition: background-color 0.15s, opacity 0.15s;
	}

	.docs-nav__group a:hover {
		opacity: 1;
		background-color: var(--pui-color-surface, rgba(0, 0, 0, 0.05));
	}

	.docs-nav__group a.active {
		opacity: 1;
		font-weight: 600;
		background-color: var(--pui-color-surface, rgba(0, 0, 0, 0.08));
	}

	.docs-content {
		min-width: 0;
		max-width: 760px;
	}

	.docs-content :global(h1) {
		font-size: 2.25rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
	}

	.docs-content :global(h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--pui-color-border, rgba(0, 0, 0, 0.1));
	}

	.docs-content :global(h3) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.docs-content :global(p) {
		line-height: 1.7;
		margin-bottom: 1rem;
		opacity: 0.9;
	}

	.docs-content :global(code) {
		font-family: var(--pui-font-mono, monospace);
		font-size: 0.875em;
		padding: 0.125em 0.375em;
		border-radius: 0.25em;
		background-color: var(--pui-color-surface, rgba(0, 0, 0, 0.06));
	}

	.docs-content :global(pre) {
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.5;
		margin: 1.25rem 0;
		background-color: var(--pui-color-surface, rgba(0, 0, 0, 0.04));
		border: 1px solid var(--pui-color-border, rgba(0, 0, 0, 0.08));
	}

	.docs-content :global(pre code) {
		padding: 0;
		background: transparent;
		font-size: inherit;
	}

	.docs-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.25rem 0;
		font-size: 0.875rem;
	}

	.docs-content :global(th),
	.docs-content :global(td) {
		text-align: left;
		padding: 0.625rem 0.75rem;
		border-bottom: 1px solid var(--pui-color-border, rgba(0, 0, 0, 0.08));
	}

	.docs-content :global(th) {
		font-weight: 600;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}

	.docs-content :global(ul),
	.docs-content :global(ol) {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	.docs-content :global(li) {
		margin-bottom: 0.25rem;
	}

	.docs-content :global(a) {
		color: var(--pui-color-primary, oklch(0.5 0.18 250));
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: var(--pui-color-primary, oklch(0.5 0.18 250));
		text-decoration-thickness: 1px;
	}

	.docs-content :global(a:hover) {
		text-decoration-thickness: 2px;
	}

	.docs-content :global(.docs-code-block) {
		position: relative;
		margin: 1.25rem 0;
		border-radius: 0.5rem;
		overflow: hidden;
		background: oklch(0.15 0 0);
		color: oklch(0.9 0 0);
		border: 1px solid var(--pui-color-border, rgba(0, 0, 0, 0.1));
	}

	:global(.docs-code-block__bar) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.4rem 0.75rem;
		background: oklch(0.2 0 0);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 0.7rem;
	}

	:global(.docs-code-block__lang) {
		color: oklch(0.65 0 0);
		font-family: var(--pui-font-mono, monospace);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.docs-code-block__copy) {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		background: transparent;
		border: 0;
		color: oklch(0.7 0 0);
		cursor: pointer;
		font-size: 0.7rem;
		font-family: inherit;
		transition: color 0.15s, background-color 0.15s;
	}

	:global(.docs-code-block__copy:hover) {
		color: oklch(0.9 0 0);
		background: rgba(255, 255, 255, 0.08);
	}

	.docs-content :global(.docs-code-block pre) {
		margin: 0;
		padding: 1rem;
		background: transparent;
		border: 0;
		font-size: 0.8rem;
		line-height: 1.6;
		color: inherit;
		overflow-x: auto;
		tab-size: 2;
	}

	.docs-content :global(.docs-code-block pre code) {
		background: transparent;
		padding: 0;
		font-size: inherit;
		color: inherit;
	}

	/* 让横向滚动的代码块可键盘聚焦（axe scrollable-region-focusable） */
	.docs-content :global(.docs-code-block pre:focus-visible) {
		outline: 2px solid var(--pui-color-primary, oklch(0.5 0.18 250));
		outline-offset: -2px;
	}

	.docs-content :global(.docs-code-block pre code) {
		background: transparent;
		padding: 0;
		font-size: inherit;
		color: inherit;
	}

	.docs-content :global(blockquote) {
		margin: 1.25rem 0;
		padding: 0.5rem 1rem;
		border-left: 3px solid var(--pui-color-primary, oklch(0.5 0.18 250));
		opacity: 0.8;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.docs-layout {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.docs-sidebar {
			position: static;
			max-height: none;
		}
	}
</style>
