<script lang="ts">
	import { getRaw, renderHtml } from '../../../lib/docs';
	import { page } from '$app/state';

	const slug = $derived(page.params.slug ?? '');
	const raw = $derived(getRaw(slug));
	const html = $derived(raw ? renderHtml(raw) : '');

	const notFound = $derived(!raw);
</script>

<svelte:head>
	<title>{slug.split('/').pop()} — Persona UI</title>
</svelte:head>

{#if notFound}
	<h1>Document not found</h1>
	<p>No documentation exists for <code>{slug}</code>.</p>
{:else}
	<!-- marked 输出的 HTML，受信任的本地 md，无 XSS 风险 -->
	{@html html}
{/if}
