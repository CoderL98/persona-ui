import type { Messages } from '../types';

export const messages: Messages = {
	// 顶栏 / layout
	brandAria: 'Persona UI — 返回顶部',
	footer: 'persona ui · 双主题组件库',
	version: 'v0.1.0 · svelte 5 · tailwind 4',
	toggleThemeApple: '切换主题：Apple',
	toggleThemeMaterial: '切换主题：Material',
	toggleModeLight: '切换亮色模式',
	toggleModeDark: '切换暗色模式',

	// Hero
	pageTitle: 'Persona UI — 两套设计语言，一套组件库',
	pageDescription: 'Svelte 5 双主题组件库 —— Apple HIG × Material 3，通过一个属性即可切换。',
	heroEyebrow: 'v0.1.0 · 双主题',
	heroTitleA: '两套设计',
	heroTitleEm: '语言',
	heroTitleB1: '，',
	heroTitleB2: '一套组件',
	heroTitleB3: '库。',
	heroDescription: (apple, material) =>
		`Persona UI 提供同一套 Svelte 5 组件，通过一个属性即可在 ${apple} 与 ${material} 之间自由切换。同一份 API，两种严谨不同的设计语言。`,
	ctaGetStarted: '开始使用',
	ctaBrowse: '浏览组件',
	hintSearch: '按 ⌘K 搜索',

	// Hero preview cards
	previewLabelApple: 'apple · 亮色',
	previewLabelMaterial: 'material · 亮色',
	previewEditorial: '编辑感',
	previewSystematic: '系统化',
	previewContinue: '继续',
	previewCancel: '取消',
	previewLive: '实时预览',

	// Section nav
	sectionFoundation: '基础',
	sectionForm: '表单控件',
	sectionFeedback: '反馈',
	sectionOverlays: '浮层',
	sectionNavigation: '导航',
	sectionData: '数据',
	sectionFoundationDesc: '系统的原子 —— 按钮、容器、状态指示。所有其他组件都由这些原语组合而成。',
	sectionFormDesc: '遵循设计语言的输入控件。所有表单组件在不同主题下共用同一套 props API。',
	sectionFeedbackDesc: 'Alert、Banner、Toast、Progress、Spinner —— 系统与用户沟通的表面。',
	sectionOverlaysDesc: 'Tooltip、Menu、Popover、Dialog —— 悬浮在页面之上的瞬时 UI。',
	sectionNavigationDesc: 'Tabs、Breadcrumb、Sidebar、Toolbar —— 用户在应用内移动的方式。',
	sectionDataDesc: 'List、Table、Calendar、TreeView —— 渲染结构化数据集合。',
	sectionNavAria: '章节导航',
	skipToContent: '跳到正文',

	// Demo placeholders
	demoShadowRaised: '带阴影的浮起表面。',
	demoTintedBg: '淡色填充背景。',
	demoBorderOnly: '仅描边。',
	demoCardElevated: '浮起',
	demoCardFilled: '填充',
	demoCardOutlined: '描边',

	// Sidebar
	backToHome: '← 返回首页',
	sidebarGuides: '指南',
	sidebarComponents: '组件',

	// Docs page
	docNotFound: '未找到文档',
	docNotFoundBody: (slug) => `<code>${slug}</code> 没有对应的文档。`,

	// Language switcher
	langSwitcherAria: '语言',
	langEn: 'EN',
	langZhCN: '简',
	langZhTW: '繁',
};
