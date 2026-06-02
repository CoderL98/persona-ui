<script lang="ts">
	import { getRaw, renderHtml } from '../../../../lib/docs';
	import { currentLocale } from '../../../../lib/i18n/store.svelte';
	import { t } from '../../../../lib/i18n/t';
	import { page } from '$app/state';
	import { localeToPath } from '../../../../lib/i18n/locales';

	const locale = $derived(currentLocale.value);
	const slug = $derived(page.params.slug ?? '');
	const raw = $derived(getRaw(slug, locale));
	const html = $derived(raw ? renderHtml(raw) : '');

	const notFound = $derived(!raw);

	// 从 md frontmatter 解析 title（用 -- 分隔：'zh-CN:components/button' 不可能用 --）
	function titleFromRaw(md: string | undefined): string {
		if (!md) return slug.split('/').pop() ?? '';
		const m = md.match(/^---\s*\n([\s\S]*?)\n---/);
		if (!m) return slug.split('/').pop() ?? '';
		const fm = m[1];
		const titleLine = fm.split('\n').find((l) => l.startsWith('title:'));
		if (!titleLine) return slug.split('/').pop() ?? '';
		return titleLine.replace(/^title:\s*/, '').replace(/^['"]|['"]$/g, '').trim();
	}

	const pageTitle = $derived(titleFromRaw(raw));
</script>

<svelte:head>
	<title>{pageTitle} — Persona UI</title>
</svelte:head>

{#if notFound}
	<h1>{t('docNotFound')}</h1>
	<p>{@html t('docNotFoundBody', slug)}</p>
{:else}
	<!-- marked 输出的 HTML，受信任的本地 md，无 XSS 风险 -->
	{@html html}
{/if}
