import type { Messages } from '../types';

export const messages: Messages = {
	// 頂欄 / layout
	brandAria: 'Persona UI — 回到頂部',
	footer: 'persona ui · 雙主題元件庫',
	version: 'v0.1.0 · svelte 5 · tailwind 4',
	toggleThemeApple: '切換主題：Apple',
	toggleThemeMaterial: '切換主題：Material',
	toggleModeLight: '切換淺色模式',
	toggleModeDark: '切換深色模式',

	// Hero
	pageTitle: 'Persona UI — 兩套設計語言，一套元件庫',
	pageDescription: 'Svelte 5 雙主題元件庫 —— Apple HIG × Material 3，透過一個屬性即可切換。',
	heroEyebrow: 'v0.1.0 · 雙主題',
	heroTitleA: '兩套設計',
	heroTitleEm: '語言',
	heroTitleB1: '，',
	heroTitleB2: '一套元件',
	heroTitleB3: '庫。',
	heroDescription: (apple, material) =>
		`Persona UI 提供同一套 Svelte 5 元件，透過一個屬性即可在 ${apple} 與 ${material} 之間自由切換。同一份 API，兩種嚴謹不同的設計語言。`,
	ctaGetStarted: '開始使用',
	ctaBrowse: '瀏覽元件',
	hintSearch: '按 ⌘K 搜尋',

	// Hero preview cards
	previewLabelApple: 'apple · 淺色',
	previewLabelMaterial: 'material · 淺色',
	previewEditorial: '編輯感',
	previewSystematic: '系統化',
	previewContinue: '繼續',
	previewCancel: '取消',
	previewLive: '即時預覽',

	// Section nav
	sectionFoundation: '基礎',
	sectionForm: '表單控制項',
	sectionFeedback: '回饋',
	sectionOverlays: '浮層',
	sectionNavigation: '導覽',
	sectionData: '資料',
	sectionAdvanced: '進階',
	sectionAdvancedDesc: '專用原語 —— Carousel、Chart、CodeBlock、ColorPicker、Stepper、Timeline、Tour 等。',
	sectionFoundationDesc: '系統的原子 —— 按鈕、容器、狀態指示。所有其他元件都由這些原語組合而成。',
	sectionFormDesc: '遵循設計語言的輸入控制項。所有表單元件在不同主題下共用同一套 props API。',
	sectionFeedbackDesc: 'Alert、Banner、Toast、Progress、Spinner —— 系統與使用者溝通的表面。',
	sectionOverlaysDesc: 'Tooltip、Menu、Popover、Dialog —— 懸浮在頁面之上的瞬時 UI。',
	sectionNavigationDesc: 'Tabs、Breadcrumb、Sidebar、Toolbar —— 使用者在應用內移動的方式。',
	sectionDataDesc: 'List、Table、Calendar、TreeView —— 渲染結構化資料集合。',
	sectionNavAria: '章節導覽',
	skipToContent: '跳至內文',

	// Demo placeholders
	demoShadowRaised: '帶陰影的浮起表面。',
	demoTintedBg: '淡色填充背景。',
	demoBorderOnly: '僅描邊。',
	demoCardElevated: '浮起',
	demoCardFilled: '填充',
	demoCardOutlined: '描邊',

	// Sidebar
	backToHome: '← 返回首頁',
	sidebarGuides: '指南',
	sidebarComponents: '元件',
	search: '搜尋文件…',

	// Docs page
	docNotFound: '找不到文件',
	docNotFoundBody: (slug) => `<code>${slug}</code> 沒有對應的文件。`,

	// 404 / error page
	notFoundTitle: '頁面不存在',
	notFoundBody: '您存取的頁面不存在或已被移動。',
	notFoundHome: '返回首頁',

	// Language switcher
	langSwitcherAria: '語言',
	langEn: 'EN',
	langZhCN: '簡',
	langZhTW: '繁',
};
