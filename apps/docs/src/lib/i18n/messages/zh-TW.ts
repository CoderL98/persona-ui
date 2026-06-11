import type { Messages } from '../types';

export const messages: Messages = {
  // 頂欄 / layout
  brandAria: 'Persona UI — 回到頂部',
  footer: 'persona ui · 雙主題元件庫',
  version: 'v0.1.0 · svelte 5 · tailwind 4',
  toggleTheme_apple: '切換主題：Apple HIG',
  toggleTheme_material: '切換主題：Material 3',
  toggleTheme_minimalist: '切換主題：Minimalist',
  toggleModeLight: '切換淺色模式',
  toggleModeDark: '切換深色模式',
	modeLight: '淺',
	modeDark: '深',

  // Hero
  pageTitle: 'Persona UI — 兩套設計語言，一套元件庫',
  pageDescription:
    'Svelte 5 雙主題元件庫 —— Apple HIG × Material 3，透過一個屬性即可切換。',
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
  previewLabelMinimalist: 'minimalist · 淺色',
  previewEditorial: '編輯感',
  previewSystematic: '系統化',
  previewEssential: '本質',
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
  sectionAdvancedDesc:
    '專用原語 —— Carousel、Chart、CodeBlock、ColorPicker、Stepper、Timeline、Tour 等。',
  sectionFoundationDesc:
    '系統的原子 —— 按鈕、容器、狀態指示。所有其他元件都由這些原語組合而成。',
  sectionFormDesc:
    '遵循設計語言的輸入控制項。所有表單元件在不同主題下共用同一套 props API。',
  sectionFeedbackDesc:
    'Alert、Banner、Toast、Progress、Spinner —— 系統與使用者溝通的表面。',
  sectionOverlaysDesc:
    'Tooltip、Menu、Popover、Dialog —— 懸浮在頁面之上的瞬時 UI。',
  sectionNavigationDesc:
    'Tabs、Breadcrumb、Sidebar、Toolbar —— 使用者在應用內移動的方式。',
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

  // Specimen captions（首頁每個元件卡片的單行描述）
  specButton: '兩套主題下共 5 種變體',
  specIconButton: 'MD3 2024 — 4 檔變體，2 檔圓角',
  specFab: '懸浮操作按鈕 — 3 尺寸，4 變體',
  specChip: '標籤、篩選、可關閉表面',
  specBadge: '計數、圓點、狀態藥丸',
  specAvatar: '帶在線狀態指示的身分識別',
  specKbd: '鍵盤快速鍵提示',
  specDivider: '水平與垂直分隔線',
  specCard: '5 檔變體 — 浮起/填充/描邊/tonal/flat',
  specTextField: '帶標籤、輔助、錯誤態的輸入框',
  specTextarea: '可調尺寸的多行文字',
  specSelect: '單選下拉',
  specCombobox: '可篩選的聯想下拉',
  specListbox: '無障礙的可選項清單',
  specSearchField: '帶清除按鈕的搜尋框',
  specCheckbox: '支援半選狀態的二元選擇',
  specRadio: '互斥的單選',
  specSwitch: '即時生效的開關',
  specSlider: '數值範圍輸入',
  specInputOTP: '一次性密碼輸入',
  specInputGroup: '帶前後綴的複合輸入',
  specColorPicker: '支援多格式的拾色器',
  specRating: '支援半星的評分',
  specFileUpload: '帶進度的檔案拖放區',
  specForm: '帶校驗的表單編排',
  specAlert: '行內訊息 — info/success/warning/error',
  specBanner: '全寬系統訊息',
  specMessage: '聊天與訊息氣泡',
  specToast: '命令面板式通知',
  specSnackbar: 'MD3 — 底部反饋條，可選操作',
  specProgress: '線性和不確定進度',
  specSpinner: '多尺寸載入指示器',
  specSkeleton: '載入中內容佔位',
  specEmptyState: '空狀態與零資料訊息',
  specTooltip: '帶智慧定位的懸浮提示',
  specPopover: '點擊觸發的浮層',
  specHoverCard: '懸浮展開的富預覽',
  specMenu: '下拉操作選單',
  specContextMenu: '右鍵操作選單',
  specDialog: '帶遮罩的模態對話框',
  specSheet: '底部 / 側邊面板',
  specDrawer: '側邊抽屜導覽',
  specConfirmDialog: '破壞性操作確認',
  specTour: '多步產品引導',
  specCommandPalette: '鍵盤優先的命令啟動器',
  specTabs: '水平內容切換',
  specSegmentedControl: '緊湊的內聯選擇器',
  specBreadcrumb: '層級位置軌跡',
  specPagination: '分頁導覽控制',
  specStepper: '分步進度指示',
  specToolbar: '操作組容器',
  specSidebar: '常駐側邊導覽',
  specNavigationRail: 'MD3 導覽軌',
  specBottomNavigation: '行動端 Tab Bar — 在手機外殼中並排對比 Apple 與 MD3',
  specList: '堆疊的內容行',
  specAccordion: '可摺疊內容面板',
  specTimeline: '縱向事件序列',
  specTable: '靜態資料表',
  specDataTable: '可排序可篩選的資料網格',
  specTreeView: '層級可展開樹',
  specVirtualList: '10k+ 行的視窗化清單',
  specCalendar: '月視圖日期選擇',
  specDatePicker: '單日期輸入',
  specTimePicker: '時刻輸入',
  specDateRangePicker: '日期範圍選擇',
  specCarousel: '帶鍵盤控制的輪播',
  specChart: '折線/柱/餅/面積圖 — 原生 SVG',
  specCodeBlock: '帶複製按鈕的語法高亮',

  // Theme switcher card
  themeSwitcherTitle: '一個屬性。兩套設計語言。',
  themeSwitcherDesc:
    '透過 data-theme 在 apple 和 material 之間切換 — 每個元件都會重新換膚。同一個元件，同一套 API，同一份 TypeScript 類型。',
};
