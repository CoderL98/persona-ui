<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { LOCALES, DEFAULT_LOCALE, localeToPath, pathToLocale, type Locale } from '../i18n/locales';
	import { currentLocale, setLocale, isActiveLocale } from '../i18n/store.svelte';
	import { t } from '../i18n/t';

	// 当前 URL 在不带 locale 前缀时的"裸路径"（去掉已有的 /zh-cn /zh-tw 等）
	function stripLocaleFromPath(pathname: string): string {
		// 切分首段
		const segs = pathname.split('/').filter(Boolean);
		if (segs.length === 0) return '/';
		if (segs[0] === 'zh-cn' || segs[0] === 'zh-tw' || segs[0] === 'zh') {
			const rest = segs.slice(1).join('/');
			return rest ? `/${rest}` : '/';
		}
		return pathname;
	}

	// 当前路由对应的"裸路径"
	const barePath = $derived(stripLocaleFromPath(page.url.pathname));

	function pickLocale(l: Locale): void {
		if (isActiveLocale(l)) return;
		setLocale(l);
		const target = `${localeToPath(l)}${barePath === '/' ? '' : barePath}${page.url.search}`;
		void goto(target, { replaceState: true, noScroll: true, keepFocus: true });
	}

	// 当前路由带的 locale（从 URL 第一段）
	const routeLocale = $derived(pathToLocale(page.url.pathname.split('/').filter(Boolean)[0]));
</script>

<div
	class="inline-flex items-center gap-0.5 rounded-(--pui-radius-control)
         border border-(--pui-outline) bg-(--pui-surface-base) p-0.5 text-xs"
	role="group"
	aria-label={t('langSwitcherAria')}
>
	{#each LOCALES as l (l)}
		<button
			type="button"
			onclick={() => pickLocale(l)}
			aria-pressed={currentLocale.value === l}
			class="inline-flex h-8 min-w-8 items-center justify-center rounded-(--pui-radius-control-sm,6px)
               px-2 font-(family-name:--pui-font-mono) text-[11px] font-medium uppercase tracking-[0.05em]
               transition-all active:scale-[0.96]
               focus-visible:outline-2 focus-visible:outline-offset-2
               {currentLocale.value === l
				? 'bg-(--pui-color-primary) text-(--pui-color-on-primary)'
				: 'text-(--pui-text-secondary) hover:text-(--pui-text-primary) hover:bg-(--pui-surface-variant)'}"
		>
			{l === 'en' ? t('langEn') : l === 'zh-CN' ? t('langZhCN') : t('langZhTW')}
		</button>
	{/each}
</div>
