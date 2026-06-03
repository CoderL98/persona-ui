<script lang="ts">
	import '../app.css';
	import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
	import { t } from '../lib/i18n/t';
	import { currentLocale, setLocale } from '../lib/i18n/store.svelte';
	import { pathToLocale } from '../lib/i18n/locales';
	import { page } from '$app/state';

	let { children } = $props();

	// 主题/模式：localStorage 持久化，跨页面保留
	const STORAGE_THEME = 'pui:theme';
	const STORAGE_MODE = 'pui:mode';
	const VALID_THEMES = ['apple', 'material'] as const;
	const VALID_MODES = ['light', 'dark'] as const;
	type Theme = (typeof VALID_THEMES)[number];
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

	let theme = $state<Theme>(readPersisted(STORAGE_THEME, VALID_THEMES, 'apple'));
	let mode = $state<Mode>(readPersisted(STORAGE_MODE, VALID_MODES, 'light'));

	// 初始化时把当前主题/模式同步到 <html>（SSR/CSR 一致性）
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', theme);
		document.documentElement.setAttribute('data-mode', mode);
	});

	// 切换函数：同时改 state + DOM + localStorage
	//（直接同步写 DOM，避免 $effect 跨异步边界的追踪陷阱）
	function setTheme(next: Theme) {
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
			<!-- 主题切换（分段控件：Apple | Material） -->
			<div
				role="group"
				aria-label="Theme"
				class="flex items-center divide-x divide-(--pui-outline-subtle)"
			>
				<button
					type="button"
					onclick={() => setTheme('apple')}
					aria-pressed={theme === 'apple'}
					aria-label={t('toggleThemeApple')}
					class="inline-flex h-7 items-center gap-1.5 rounded-(--pui-radius-control)
                     px-2.5 text-xs font-medium
                     text-(--pui-text-secondary)
                     transition-colors duration-(--pui-duration-enter)
                     hover:text-(--pui-text-primary)
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     {theme === 'apple'
						? 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)'
						: ''}"
				>
					<svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
						<path
							d="M9.5 2.5c-.5.5-1.2.8-1.8.7-.1-.7.2-1.4.6-1.9.5-.5 1.1-.8 1.7-.8.1.7-.2 1.4-.5 2zm.8.8c-.9 0-1.6.5-2 .5s-1-.5-1.7-.5c-.9 0-1.7.5-2.1 1.3-.9 1.5-.2 3.7.7 4.9.4.6.9 1.2 1.5 1.2.6 0 .8-.4 1.5-.4s.9.4 1.5.4c.6 0 1-.6 1.4-1.2.4-.6.6-1.2.6-1.2s-1.2-.5-1.2-1.8c0-1.1.9-1.6.9-1.7-.5-.7-1.2-.8-1.5-.8z"
						/>
					</svg>
					<span class="hidden sm:inline">Apple</span>
				</button>
				<button
					type="button"
					onclick={() => setTheme('material')}
					aria-pressed={theme === 'material'}
					aria-label={t('toggleThemeMaterial')}
					class="inline-flex h-7 items-center gap-1.5 rounded-(--pui-radius-control)
                     px-2.5 text-xs font-medium
                     text-(--pui-text-secondary)
                     transition-colors duration-(--pui-duration-enter)
                     hover:text-(--pui-text-primary)
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     {theme === 'material'
						? 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)'
						: ''}"
				>
					<svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
						<path d="M7 1l5.5 9.5h-11z" />
					</svg>
					<span class="hidden sm:inline">Material</span>
				</button>
			</div>

			<!-- 模式切换（分段控件：Sun | Moon，纯图标） -->
			<div
				role="group"
				aria-label="Mode"
				class="flex items-center divide-x divide-(--pui-outline-subtle)"
			>
				<button
					type="button"
					onclick={() => setMode('light')}
					aria-pressed={mode === 'light'}
					aria-label={t('toggleModeLight')}
					class="inline-flex h-7 w-8 items-center justify-center rounded-(--pui-radius-control)
                     text-(--pui-text-secondary)
                     transition-colors duration-(--pui-duration-enter)
                     hover:text-(--pui-text-primary)
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     {mode === 'light'
						? 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)'
						: ''}"
				>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
						<circle cx="7" cy="7" r="2.5" />
						<path
							d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.8 2.8l1.1 1.1M10.1 10.1l1.1 1.1M2.8 11.2l1.1-1.1M10.1 3.9l1.1-1.1"
							stroke-linecap="round"
						/>
					</svg>
				</button>
				<button
					type="button"
					onclick={() => setMode('dark')}
					aria-pressed={mode === 'dark'}
					aria-label={t('toggleModeDark')}
					class="inline-flex h-7 w-8 items-center justify-center rounded-(--pui-radius-control)
                     text-(--pui-text-secondary)
                     transition-colors duration-(--pui-duration-enter)
                     hover:text-(--pui-text-primary)
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     {mode === 'dark'
						? 'bg-(--pui-color-primary-container) text-(--pui-color-on-primary-container)'
						: ''}"
				>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
						<path
							d="M9 7c0-1.7-1.3-3-3-3v6c1.7 0 3-1.3 3-3zm-3 5c-2.8 0-5-2.2-5-5s2.2-5 5-5c.4 0 .7 0 1 .1-.6.7-1 1.7-1 2.9 0 2.2 1.8 4 4 4 1.2 0 2.2-.4 2.9-1 .1.3.1.6.1 1 0 2.7-2.2 5-5 5-.3 0-.7 0-1-.1.6-.7 1-1.7 1-2.9z"
						/>
					</svg>
				</button>
			</div>

			<LanguageSwitcher />
		</div>
	</div>
</header>

<main class="mx-auto max-w-6xl px-4 py-10 sm:py-16">
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
