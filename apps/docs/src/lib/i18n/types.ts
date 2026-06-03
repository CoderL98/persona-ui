import type { Locale } from './locales';

export interface Messages {
	// 顶栏 / layout
	brandAria: string;
	footer: string;
	version: string;
	toggleThemeApple: string;
	toggleThemeMaterial: string;
	toggleModeLight: string;
	toggleModeDark: string;

	// Hero
	pageTitle: string;
	pageDescription: string;
	heroEyebrow: string;
	heroTitleA: string; // "Two design"
	heroTitleEm: string; // "personalities"
	heroTitleB1: string; // ","
	heroTitleB2: string; // "one component"
	heroTitleB3: string; // "library."
	heroDescription: (apple: string, material: string) => string;
	ctaGetStarted: string;
	ctaBrowse: string;
	hintSearch: string;
	search: string;

	// Hero preview cards
	previewLabelApple: string;
	previewLabelMaterial: string;
	previewEditorial: string;
	previewSystematic: string;
	previewContinue: string;
	previewCancel: string;
	previewLive: string;

	// Section nav
	sectionFoundation: string;
	sectionForm: string;
	sectionFeedback: string;
	sectionOverlays: string;
	sectionNavigation: string;
	sectionData: string;
	sectionAdvanced: string;
	sectionFoundationDesc: string;
	sectionFormDesc: string;
	sectionFeedbackDesc: string;
	sectionOverlaysDesc: string;
	sectionNavigationDesc: string;
	sectionDataDesc: string;
	sectionAdvancedDesc: string;
	sectionNavAria: string;
	skipToContent: string;

	// Demo placeholders
	demoShadowRaised: string;
	demoTintedBg: string;
	demoBorderOnly: string;
	demoCardElevated: string;
	demoCardFilled: string;
	demoCardOutlined: string;

	// Sidebar
	backToHome: string;
	sidebarGuides: string;
	sidebarComponents: string;

	// Docs page
	docNotFound: string;
	docNotFoundBody: (slug: string) => string;

	// Language switcher
	langSwitcherAria: string;
	langEn: string;
	langZhCN: string;
	langZhTW: string;
}
