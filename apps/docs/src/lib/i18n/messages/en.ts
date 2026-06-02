import type { Messages } from '../types';

export const messages: Messages = {
	// 顶栏 / layout
	brandAria: 'Persona UI — back to top',
	footer: 'persona ui · dual-personality component library',
	version: 'v0.1.0 · svelte 5 · tailwind 4',
	toggleThemeApple: 'Toggle theme: Apple',
	toggleThemeMaterial: 'Toggle theme: Material',
	toggleModeLight: 'Toggle dark mode',
	toggleModeDark: 'Toggle light mode',

	// Hero
	pageTitle: 'Persona UI — Two design personalities, one component library',
	pageDescription:
		'A Svelte 5 dual-personality component library — Apple HIG × Material 3, switchable via a single attribute.',
	heroEyebrow: 'v0.1.0 · dual-personality',
	heroTitleA: 'Two design',
	heroTitleEm: 'personalities',
	heroTitleB1: ',',
	heroTitleB2: 'one component',
	heroTitleB3: 'library.',
	heroDescription: (apple, material) =>
		`Persona UI ships a single set of Svelte 5 components that flip between ${apple} and ${material} with one attribute. Same API, two rigorously different design languages.`,
	ctaGetStarted: 'Get started',
	ctaBrowse: 'Browse components',
	hintSearch: 'Press ⌘K to search',

	// Hero preview cards
	previewLabelApple: 'apple · light',
	previewLabelMaterial: 'material · light',
	previewEditorial: 'editorial',
	previewSystematic: 'systematic',
	previewContinue: 'Continue',
	previewCancel: 'Cancel',
	previewLive: 'Live preview',

	// Section nav
	sectionFoundation: 'Foundation',
	sectionForm: 'Form Controls',
	sectionFeedback: 'Feedback',
	sectionOverlays: 'Overlays',
	sectionNavigation: 'Navigation',
	sectionData: 'Data',
	sectionFoundationDesc:
		'The atoms of the system — buttons, surfaces, status indicators. Every other component composes these primitives.',
	sectionFormDesc:
		'Inputs that respect the design language. All form components share the same prop API across themes.',
	sectionFeedbackDesc:
		'Alerts, banners, toasts, progress, spinners — the surface area for system ↔ user communication.',
	sectionOverlaysDesc:
		'Tooltips, menus, popovers, dialogs — the transient UI that lives above the page surface.',
	sectionNavigationDesc:
		'Tabs, breadcrumbs, sidebars, toolbars — how users move through your app.',
	sectionDataDesc:
		'Lists, tables, calendars, trees — render collections of structured information.',
	sectionNavAria: 'Section navigation',
	skipToContent: 'Skip to content',

	// Demo placeholders
	demoShadowRaised: 'Shadow-raised surface.',
	demoTintedBg: 'Tinted background.',
	demoBorderOnly: 'Border only.',
	demoCardElevated: 'Elevated',
	demoCardFilled: 'Filled',
	demoCardOutlined: 'Outlined',

	// Sidebar
	backToHome: '← Back to home',
	sidebarGuides: 'Guides',
	sidebarComponents: 'Components',

	// Docs page
	docNotFound: 'Document not found',
	docNotFoundBody: (slug) => `No documentation exists for <code>${slug}</code>.`,

	// Language switcher
	langSwitcherAria: 'Language',
	langEn: 'EN',
	langZhCN: '简',
	langZhTW: '繁',
};
