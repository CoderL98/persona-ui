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

	// 404 / error page
	notFoundTitle: string;
	notFoundBody: string;
	notFoundHome: string;

	// Language switcher
	langSwitcherAria: string;
	langEn: string;
	langZhCN: string;
	langZhTW: string;

	// Specimen captions
	specButton: string;
	specIconButton: string;
	specFab: string;
	specChip: string;
	specBadge: string;
	specAvatar: string;
	specKbd: string;
	specDivider: string;
	specCard: string;
	specTextField: string;
	specTextarea: string;
	specSelect: string;
	specCombobox: string;
	specListbox: string;
	specSearchField: string;
	specCheckbox: string;
	specRadio: string;
	specSwitch: string;
	specSlider: string;
	specInputOTP: string;
	specInputGroup: string;
	specColorPicker: string;
	specRating: string;
	specFileUpload: string;
	specForm: string;
	specAlert: string;
	specBanner: string;
	specMessage: string;
	specToast: string;
	specSnackbar: string;
	specProgress: string;
	specSpinner: string;
	specSkeleton: string;
	specEmptyState: string;
	specTooltip: string;
	specPopover: string;
	specHoverCard: string;
	specMenu: string;
	specContextMenu: string;
	specDialog: string;
	specSheet: string;
	specDrawer: string;
	specConfirmDialog: string;
	specTour: string;
	specCommandPalette: string;
	specTabs: string;
	specSegmentedControl: string;
	specBreadcrumb: string;
	specPagination: string;
	specStepper: string;
	specToolbar: string;
	specSidebar: string;
	specNavigationRail: string;
	specBottomNavigation: string;
	specList: string;
	specAccordion: string;
	specTimeline: string;
	specTable: string;
	specDataTable: string;
	specTreeView: string;
	specVirtualList: string;
	specCalendar: string;
	specDatePicker: string;
	specTimePicker: string;
	specDateRangePicker: string;
	specCarousel: string;
	specChart: string;
	specCodeBlock: string;

	// Theme switcher card
	themeSwitcherTitle: string;
	themeSwitcherDesc: string;
}
