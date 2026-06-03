<script lang="ts">
	import { getRaw, renderHtml } from '../../../../lib/docs';
	import { currentLocale } from '../../../../lib/i18n/store.svelte';
	import { t } from '../../../../lib/i18n/t';
	import { page } from '$app/state';
	import { localeToPath, LOCALES } from '../../../../lib/i18n/locales';

	const locale = $derived(currentLocale.value);
	const slug = $derived(page.params.slug ?? '');
	const raw = $derived(getRaw(slug, locale));
	const html = $derived(raw ? renderHtml(raw) : '');

	const notFound = $derived(!raw);

	// 从 md frontmatter 解析 title
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

	// SEO 用的绝对 URL（SSR 时 fallback 到 production 域名）
	const origin =
		typeof window !== 'undefined' ? window.location.origin : 'https://persona-ui.dev';
	const pageUrl = $derived(`${origin}${localeToPath(locale)}/docs/${slug}`);

	// hreflang：三语互链相同 slug
	const alternates = LOCALES.map((l) => ({
		lang: l,
		href: `${origin}${localeToPath(l)}/docs/${slug}`,
	}));
</script>

<svelte:head>
	<title>{pageTitle} — Persona UI</title>
	<meta name="description" content="Persona UI component documentation: {pageTitle}." />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{pageTitle} — Persona UI" />
	<meta property="og:description" content="Persona UI component documentation: {pageTitle}." />
	<meta property="og:image" content="{origin}/og-image.png" />
	<meta property="og:url" content={pageUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{pageTitle} — Persona UI" />
	<meta name="twitter:description" content="Persona UI component documentation: {pageTitle}." />
	<meta name="twitter:image" content="{origin}/og-image.png" />

	<!-- Canonical + hreflang -->
	<link rel="canonical" href={pageUrl} />
	{#each alternates as alt}
		<link rel="alternate" hreflang={alt.lang} href={alt.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={alternates[0].href} />
</svelte:head>

{#if notFound}
	<h1>{t('docNotFound')}</h1>
	<p>{@html t('docNotFoundBody', slug)}</p>
{:else}
	<!-- marked 输出的 HTML，受信任的本地 md，无 XSS 风险 -->
	{@html html}
{/if}
