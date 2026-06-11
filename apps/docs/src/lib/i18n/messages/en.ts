import type { Messages } from '../types';

export const messages: Messages = {
  // 顶栏 / layout
  brandAria: 'Persona UI — back to top',
  footer: 'persona ui · dual-personality component library',
  version: 'v0.1.0 · svelte 5 · tailwind 4',
  toggleTheme_apple: 'Toggle theme: Apple HIG',
  toggleTheme_material: 'Toggle theme: Material 3',
  toggleTheme_minimalist: 'Toggle theme: Minimalist',
  toggleModeLight: 'Toggle light mode',
  toggleModeDark: 'Toggle dark mode',

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
  previewLabelMinimalist: 'minimalist · light',
  previewEditorial: 'editorial',
  previewSystematic: 'systematic',
  previewEssential: 'essential',
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
  sectionAdvanced: 'Advanced',
  sectionAdvancedDesc:
    'Specialized primitives — carousels, charts, code blocks, color pickers, steppers, timelines, tours and more.',
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
  search: 'Search docs…',

  // Docs page
  docNotFound: 'Document not found',
  docNotFoundBody: (slug) =>
    `No documentation exists for <code>${slug}</code>.`,

  // 404 / error page
  notFoundTitle: 'Page not found',
  notFoundBody: "The page you're looking for doesn't exist or has been moved.",
  notFoundHome: 'Back to home',

  // Language switcher
  langSwitcherAria: 'Language',
  langEn: 'EN',
  langZhCN: '简',
  langZhTW: '繁',

  // Specimen captions (one-liner for each component card on homepage)
  specButton: 'Five variants across both themes',
  specIconButton: 'MD3 2024 — four variants, two shapes',
  specFab: 'Floating action — 3 sizes, 4 variants',
  specChip: 'Tag, filter, and dismiss surfaces',
  specBadge: 'Counts, dots, and status pills',
  specAvatar: 'Identity with presence indicators',
  specKbd: 'Keyboard shortcut hints',
  specDivider: 'Horizontal and vertical rules',
  specCard: 'Five variants — elevated, filled, outlined, tonal, flat',
  specTextField: 'Text input with label, helper, and error states',
  specTextarea: 'Multi-line text with resize control',
  specSelect: 'Single-select dropdown',
  specCombobox: 'Typeahead select with filtering',
  specListbox: 'Accessible list of selectable options',
  specSearchField: 'Search input with clear button',
  specCheckbox: 'Binary choice with indeterminate state',
  specRadio: 'Mutually exclusive selection',
  specSwitch: 'Toggle with instant effect',
  specSlider: 'Numeric range input',
  specInputOTP: 'One-time password entry',
  specInputGroup: 'Composed input with addons',
  specColorPicker: 'Color picker with format control',
  specRating: 'Star rating with half-step support',
  specFileUpload: 'File dropzone with progress',
  specForm: 'Form orchestration with validation',
  specAlert: 'Inline message — info, success, warning, error',
  specBanner: 'Full-width system message',
  specMessage: 'Chat and message-bubble surfaces',
  specToast: 'Command-palette style notifications',
  specSnackbar: 'MD3 — bottom feedback with optional action',
  specProgress: 'Linear and indeterminate progress',
  specSpinner: 'Loading indicator with sizes',
  specSkeleton: 'Content placeholder while loading',
  specEmptyState: 'Empty and zero-state messaging',
  specTooltip: 'Hover label with smart placement',
  specPopover: 'Click-triggered floating content',
  specHoverCard: 'Rich preview on hover',
  specMenu: 'Dropdown action menu',
  specContextMenu: 'Right-click action menu',
  specDialog: 'Modal dialog with backdrop',
  specSheet: 'Bottom / side panel',
  specDrawer: 'Side drawer navigation',
  specConfirmDialog: 'Destructive action confirmation',
  specTour: 'Multi-step product tour',
  specCommandPalette: 'Keyboard-first command launcher',
  specTabs: 'Horizontal content switcher',
  specSegmentedControl: 'Compact inline selector',
  specBreadcrumb: 'Hierarchical location trail',
  specPagination: 'Page navigation control',
  specStepper: 'Step-by-step progress indicator',
  specToolbar: 'Container for grouped actions',
  specSidebar: 'Persistent side navigation',
  specNavigationRail: 'MD3 navigation rail',
  specBottomNavigation:
    'Mobile tab bar — compare Apple and MD3 side by side in phone frames',
  specList: 'Stacked content rows',
  specAccordion: 'Collapsible content panels',
  specTimeline: 'Vertical event sequence',
  specTable: 'Static data table',
  specDataTable: 'Sortable, filterable data grid',
  specTreeView: 'Hierarchical expandable tree',
  specVirtualList: 'Windowed list for 10k+ items',
  specCalendar: 'Month-view date picker',
  specDatePicker: 'Single date input',
  specTimePicker: 'Time-of-day input',
  specDateRangePicker: 'Date range selection',
  specCarousel: 'Slideshow with keyboard control',
  specChart: 'Line, bar, pie, area — SVG-native',
  specCodeBlock: 'Syntax-highlighted code with copy',

  // Theme switcher card
  themeSwitcherTitle: 'One attribute. Two design languages.',
  themeSwitcherDesc:
    'Flip data-theme between apple and material — every component re-skins. The same component, the same API, the same TypeScript types.',
};
