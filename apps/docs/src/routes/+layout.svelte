<script lang="ts">
	import '../app.css';
	import { SegmentedControl } from '@persona-ui/lib/components/segmented-control';
	import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
	import { t, tAny } from '../lib/i18n/t';
	import { currentLocale, setLocale } from '../lib/i18n/store.svelte';
	import { pathToLocale } from '../lib/i18n/locales';
	import { page } from '$app/state';
	import { THEMES, THEME_IDS, DEFAULT_THEME, type ThemeId } from '../lib/themes';

	let { children } = $props();

	// 主题/模式：localStorage 持久化，跨页面保留
	const STORAGE_THEME = 'pui:theme';
	const STORAGE_MODE = 'pui:mode';
	const VALID_MODES = ['light', 'dark'] as const;
	type Mode = (typeof VALID_MODES)[number];

	function readPersisted<T extends string>(
		key: string,
		valid: readonly T[],
		fallback: T,
	): T {
		if (typeof localStorage === 'undefined') return fallback;
		const v = localStorage.getItem(key);
		return (valid as readonly string[]).includes(v ?? '') ? (v as T) : fallback;
	}

	// 默认主题取注册表第一项（DEFAULT_THEME = THEME_IDS[0]）
	let theme = $state<ThemeId>(readPersisted(STORAGE_THEME, THEME_IDS, DEFAULT_THEME));
	let mode = $state<Mode>(readPersisted(STORAGE_MODE, VALID_MODES, 'light'));

	// 初始化时把当前主题/模式同步到 <html>（SSR/CSR 一致性）
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', theme);
		document.documentElement.setAttribute('data-mode', mode);
	});

	// 切换函数：同时改 state + DOM + localStorage
	//（直接同步写 DOM，避免 $effect 跨异步边界的追踪陷阱）
	function setTheme(next: ThemeId) {
		theme = next;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', next);
		}
		try {
			localStorage.setItem(STORAGE_THEME, next);
		} catch {
			/* 忽略 */
		}
	}

	function setMode(next: Mode) {
		mode = next;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-mode', next);
		}
		try {
			localStorage.setItem(STORAGE_MODE, next);
		} catch {
			/* 忽略 */
		}
	}

	// URL 改变时同步 locale（这是事实来源，store 是展示缓存）
	$effect(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		const fromUrl = pathToLocale(segments[0]);
		if (fromUrl !== currentLocale.value) {
			setLocale(fromUrl);
		}
		// 同步 <html lang>
		if (typeof document !== 'undefined') {
			document.documentElement.lang = currentLocale.value;
		}
	});
</script>

<!-- 键盘 a11y：tab 跳过 header 直接到主内容（WCAG 2.4.1 Bypass Blocks）
     必须是页面上第一个 focusable 元素，否则失去意义 -->
<a
	href="#top"
	class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
           focus:rounded-(--pui-radius-control)
           focus:bg-(--pui-color-primary-container) focus:px-3 focus:py-2
           focus:text-(--pui-color-on-primary-container)
           focus:shadow-(--pui-elevation-2) focus:outline-2 focus:outline-(--pui-color-primary)"
>
	{t('skipToContent')}
</a>

<!-- Sticky 顶部导航条：Apple 半透明 + Material 实色 hairline -->
<header
	class="sticky top-0 z-50 border-b border-(--pui-outline-subtle)
         bg-(--pui-surface-raised)
         backdrop-blur-(--pui-backdrop-blur,18px)"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
		<!-- Logo + 名称 + 主题徽章 -->
		<div class="flex items-center gap-3">
			<a
				href="/"
				class="group flex items-center gap-2.5 outline-none"
				aria-label={t('brandAria')}
			>
				<span
					class="flex h-7 w-7 items-center justify-center rounded-[10px]
                     bg-(--pui-color-primary) text-(--pui-color-on-primary)
                     font-(family-name:--pui-font-display) text-lg font-normal leading-none
                     shadow-(--pui-elevation-1)
                     transition-transform duration-(--pui-duration-swap)
                     group-hover:scale-105"
					aria-hidden="true"
				>
					P
				</span>
				<span
					class="font-(family-name:--pui-font-display) text-lg font-normal tracking-[-0.01em]
                     text-(--pui-text-primary)"
				>
					Persona UI
				</span>
			</a>

			<!-- 主题指示器：当前主题 + 模式的小徽章 -->
			<span
				class="hidden items-center gap-1.5 rounded-full
                       border border-(--pui-outline-subtle) bg-(--pui-surface-base)
                       px-2.5 py-1 text-[10px] font-medium
                       font-(family-name:--pui-font-mono) uppercase tracking-[0.12em]
                       text-(--pui-text-secondary) sm:inline-flex"
				aria-label={`Theme: ${theme}, mode: ${mode}`}
			>
				<span class="h-1.5 w-1.5 rounded-full bg-(--pui-color-primary)" aria-hidden="true"></span>
				{theme} · {mode}
			</span>
		</div>

		<!-- 主题/模式/语言切换（统一玻璃面板） -->
		<div
			class="flex items-center gap-1 rounded-(--pui-radius-container)
                border border-(--pui-outline-subtle) bg-(--pui-surface-base)
                p-1 shadow-(--pui-elevation-1)
                [backdrop-filter:blur(var(--pui-backdrop-blur,18px))]"
		>
			<!-- 主题切换（SegmentedControl 组件） -->
			<SegmentedControl
				value={theme}
				onValueChange={(v) => setTheme(v as ThemeId)}
				items={THEMES.map((t) => ({
					value: t.id,
					label: t.label,
				}))}
			/>

			<!-- 模式切换（SegmentedControl 组件） -->
			<SegmentedControl
				value={mode}
				onValueChange={(v) => setMode(v as Mode)}
				items={[
					{ value: 'light', label: t('modeLight') },
					{ value: 'dark', label: t('modeDark') },
				]}
			/>

			<LanguageSwitcher />
		</div>
	</div>
</header>

<main id="top" tabindex="-1" class="mx-auto max-w-6xl px-4 py-10 sm:py-16 focus:outline-none">
	{@render children()}
</main>

<!-- Footer -->
<footer class="mt-20 border-t border-(--pui-outline-subtle)">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6
           text-xs text-(--pui-text-secondary) sm:flex-row"
	>
		<span
			class="font-(family-name:--pui-font-mono) uppercase tracking-[0.15em]"
		>
			{t('footer')}
		</span>
		<span>{t('version')}</span>
	</div>
</footer>
