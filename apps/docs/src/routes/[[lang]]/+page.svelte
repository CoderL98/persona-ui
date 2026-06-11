<script lang="ts">
  // ── Foundation ──
  import { Button } from '@persona-ui/lib/components/button';
  import { IconButton } from '@persona-ui/lib/components/icon-button';
  import { Card } from '@persona-ui/lib/components/card';
  import { Divider } from '@persona-ui/lib/components/divider';
  import { Badge } from '@persona-ui/lib/components/badge';
  import { Chip } from '@persona-ui/lib/components/chip';
  import { Avatar } from '@persona-ui/lib/components/avatar';
  import { Kbd } from '@persona-ui/lib/components/kbd';
  import { Fab } from '@persona-ui/lib/components/fab';
  // ── Form ──
  import { TextField } from '@persona-ui/lib/components/text-field';
  import { Textarea } from '@persona-ui/lib/components/textarea';
  import { Checkbox } from '@persona-ui/lib/components/checkbox';
  import { RadioGroup, Radio } from '@persona-ui/lib/components/radio';
  import { Switch } from '@persona-ui/lib/components/switch';
  import { Slider } from '@persona-ui/lib/components/slider';
  import { Select } from '@persona-ui/lib/components/select';
  import { Listbox } from '@persona-ui/lib/components/listbox';
  import { Combobox } from '@persona-ui/lib/components/combobox';
  import { SearchField } from '@persona-ui/lib/components/search-field';
  import { InputOTP } from '@persona-ui/lib/components/input-otp';
  import { InputGroup } from '@persona-ui/lib/components/input-group';
  import { ColorPicker } from '@persona-ui/lib/components/color-picker';
  import { Rating } from '@persona-ui/lib/components/rating';
  import { FileUpload } from '@persona-ui/lib/components/file-upload';
  import { Form, FormField } from '@persona-ui/lib/components/form';
  // ── Feedback ──
  import { Alert } from '@persona-ui/lib/components/alert';
  import { Banner } from '@persona-ui/lib/components/banner';
  import { Message } from '@persona-ui/lib/components/message';
  import {
    Toast,
    ToastViewport,
    toast,
  } from '@persona-ui/lib/components/toast';
  import { Snackbar } from '@persona-ui/lib/components/snackbar';
  import { Progress } from '@persona-ui/lib/components/progress';
  import { Spinner } from '@persona-ui/lib/components/spinner';
  import { Skeleton } from '@persona-ui/lib/components/skeleton';
  import { EmptyState } from '@persona-ui/lib/components/empty-state';
  // ── Overlays ──
  import { Tooltip } from '@persona-ui/lib/components/tooltip';
  import { Popover } from '@persona-ui/lib/components/popover';
  import { HoverCard } from '@persona-ui/lib/components/hover-card';
  import { Menu } from '@persona-ui/lib/components/menu';
  import { ContextMenu } from '@persona-ui/lib/components/context-menu';
  import { Dialog } from '@persona-ui/lib/components/dialog';
  import { Sheet } from '@persona-ui/lib/components/sheet';
  import { Drawer } from '@persona-ui/lib/components/drawer';
  import { ConfirmDialog } from '@persona-ui/lib/components/confirm-dialog';
  import { Tour } from '@persona-ui/lib/components/tour';
  import { CommandPalette } from '@persona-ui/lib/components/command-palette';
  // ── Navigation ──
  import { Tabs } from '@persona-ui/lib/components/tabs';
  import { SegmentedControl } from '@persona-ui/lib/components/segmented-control';
  import { Breadcrumb } from '@persona-ui/lib/components/breadcrumb';
  import { Pagination } from '@persona-ui/lib/components/pagination';
  import { Stepper } from '@persona-ui/lib/components/stepper';
  import { Toolbar } from '@persona-ui/lib/components/toolbar';
  import { Sidebar } from '@persona-ui/lib/components/sidebar';
  import { NavigationRail } from '@persona-ui/lib/components/navigation-rail';
  import { BottomNavigation } from '@persona-ui/lib/components/bottom-navigation';
  // ── Data ──
  import { List, ListItem } from '@persona-ui/lib/components/list';
  import { Accordion } from '@persona-ui/lib/components/accordion';
  import { Table } from '@persona-ui/lib/components/table';
  import { DataTable } from '@persona-ui/lib/components/data-table';
  import { Calendar } from '@persona-ui/lib/components/calendar';
  import { DatePicker } from '@persona-ui/lib/components/date-picker';
  import { TimePicker } from '@persona-ui/lib/components/time-picker';
  import { DateRangePicker } from '@persona-ui/lib/components/date-range-picker';
  import { TreeView } from '@persona-ui/lib/components/tree-view';
  import { VirtualList } from '@persona-ui/lib/components/virtual-list';
  import { Timeline } from '@persona-ui/lib/components/timeline';
  // ── Advanced ──
  import { Carousel } from '@persona-ui/lib/components/carousel';
  import { Chart } from '@persona-ui/lib/components/chart';
  import { CodeBlock } from '@persona-ui/lib/components/code-block';
  import { Stack } from '@persona-ui/lib/components/stack';
  // ── Local ──
  import { SectionHeading } from '@persona-ui/lib/components/section-heading';
  import { t, brand } from '../../lib/i18n/t';
  import { currentLocale } from '../../lib/i18n/store.svelte';
  import { localeToPath } from '../../lib/i18n/locales';
  import { THEMES, DEFAULT_THEME, type ThemeId } from '../../lib/themes';

  // 章节索引（id 固定为英文用于 HTML anchor，label/description 随 locale 切换）
  const sections = $derived([
    {
      id: 'foundation',
      eyebrow: '01',
      label: t('sectionFoundation'),
      desc: t('sectionFoundationDesc'),
      count: 10,
    },
    {
      id: 'form',
      eyebrow: '02',
      label: t('sectionForm'),
      desc: t('sectionFormDesc'),
      count: 16,
    },
    {
      id: 'feedback',
      eyebrow: '03',
      label: t('sectionFeedback'),
      desc: t('sectionFeedbackDesc'),
      count: 9,
    },
    {
      id: 'overlays',
      eyebrow: '04',
      label: t('sectionOverlays'),
      desc: t('sectionOverlaysDesc'),
      count: 11,
    },
    {
      id: 'navigation',
      eyebrow: '05',
      label: t('sectionNavigation'),
      desc: t('sectionNavigationDesc'),
      count: 9,
    },
    {
      id: 'data',
      eyebrow: '06',
      label: t('sectionData'),
      desc: t('sectionDataDesc'),
      count: 11,
    },
    {
      id: 'advanced',
      eyebrow: '07',
      label: t('sectionAdvanced'),
      desc: t('sectionAdvancedDesc'),
      count: 3,
    },
  ]);

  let activeSection = $state('foundation');
  let dialogOpen = $state(false);
  let sheetOpen = $state(false);
  let drawerOpen = $state(false);
  let confirmOpen = $state(false);
  let tourOpen = $state(false);
  let commandOpen = $state(false);
  let bottomNavValue = $state('feed');
  let messageOpen = $state(false);
  let themeDemo = $state<ThemeId>(DEFAULT_THEME);
  let stepperValue = $state(1);
  let stepperSteps = [
    { label: 'Cart' },
    { label: 'Shipping' },
    { label: 'Payment' },
    { label: 'Review' },
  ];
  let timerValue = 30;

  // locale-aware 跳转链接
  const locale = $derived(currentLocale.value);
  const gettingStartedHref = $derived(
    `${localeToPath(locale)}/docs/getting-started`,
  );
  const browseComponentsHref = $derived(
    `${localeToPath(locale)}/docs/components/button`,
  );

  // 站点 baseUrl（用于 OG/Twitter/canonical 绝对地址）
  const origin = $derived(
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://persona-ui.ricecakecat.com',
  );
  const baseUrl = $derived(`${origin}${localeToPath(locale)}`);

  // IntersectionObserver：标记当前 section
  $effect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  });

  // Tour steps for demo
  const tourSteps = [
    {
      target: '#spec-button',
      title: 'Button',
      content: 'Five variants across both themes.',
    },
    {
      target: '#spec-icon-button',
      title: 'IconButton',
      content: 'MD3 2024 — four variants, two shapes.',
    },
    {
      target: '#spec-card',
      title: 'Card',
      content: 'Five variants from elevated to flat.',
    },
  ];
</script>

<!-- BottomNavigation icons — defined as snippets for item.icon prop -->
{#snippet navIconHome()}
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
{/snippet}
{#snippet navIconSearch()}
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M16.5 16.5L21 21" />
  </svg>
{/snippet}
{#snippet navIconUser()}
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-7 8-7" />
  </svg>
{/snippet}

<svelte:head>
  <title>{t('pageTitle')}</title>
  <meta name="description" content={t('pageDescription')} />
  <!-- Open Graph / Twitter Card -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={t('pageTitle')} />
  <meta property="og:description" content={t('pageDescription')} />
  <meta property="og:image" content="{baseUrl}/og-image.png" />
  <meta property="og:url" content={baseUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={t('pageTitle')} />
  <meta name="twitter:description" content={t('pageDescription')} />
  <meta name="twitter:image" content="{baseUrl}/og-image.png" />
  <!-- hreflang：三语互链 -->
  <link rel="canonical" href={baseUrl} />
  <link rel="alternate" hreflang="en" href="{origin}/" />
  <link rel="alternate" hreflang="zh-CN" href="{origin}/zh-cn/" />
  <link rel="alternate" hreflang="zh-TW" href="{origin}/zh-tw/" />
  <link rel="alternate" hreflang="x-default" href="{origin}/" />
</svelte:head>

<div id="top"></div>

<!-- =================== HERO =================== -->
<section
  class="relative isolate flex flex-col gap-10 pb-20 pt-8 sm:pt-16
         md:flex-row md:items-end md:gap-16"
>
  <!-- 左侧：标题 + CTA -->
  <div class="pui-reveal-stagger flex max-w-2xl flex-col gap-6">
    <span
      class="font-(family-name:--pui-font-mono) text-xs font-medium uppercase tracking-[0.2em]
             text-(--pui-text-secondary) opacity-80"
    >
      {t('heroEyebrow')}
    </span>

    <h1
      class="font-(family-name:--pui-font-display) text-5xl font-normal leading-[0.95]
             tracking-[-0.035em] text-(--pui-text-primary)
             sm:text-6xl md:text-7xl lg:text-[88px]"
    >
      {t('heroTitleA')}
      <em
        class="not-italic"
        style="font-style: italic; color: oklch(from var(--pui-color-primary) calc(l + 0.05) c h)"
        >{t('heroTitleEm')}</em
      >{t('heroTitleB1')}<br />
      {t('heroTitleB2')}<br />
      {t('heroTitleB3')}
    </h1>

    <p class="max-w-xl text-lg leading-relaxed text-(--pui-text-secondary)">
      {t('heroDescription', brand('apple'), brand('material'))}
    </p>

    <div class="flex flex-wrap items-center gap-3">
      <a href={gettingStartedHref} class="contents">
        <Button size="lg" variant="filled">{t('ctaGetStarted')}</Button>
      </a>
      <a href={browseComponentsHref} class="contents">
        <Button size="lg" variant="outlined">{t('ctaBrowse')}</Button>
      </a>
      <span
        class="ml-2 inline-flex items-center gap-1.5 text-xs text-(--pui-text-secondary)"
      >
        {t('hintSearch').split('⌘K')[0]}<Kbd>⌘K</Kbd>{t('hintSearch').split(
          '⌘K',
        )[1] ?? ''}
      </span>
    </div>
  </div>

  <!-- 右侧：Live Preview（同一组件 × N 主题，由 THEMES 自动遍历） -->
  <div
    class="pui-reveal-stagger relative grid w-full max-w-md gap-4 self-stretch md:w-auto"
  >
    {#each THEMES as themeDef (themeDef.id)}
      {@const labelKey =
        themeDef.id === 'apple'
          ? 'previewLabelApple'
          : themeDef.id === 'material'
            ? 'previewLabelMaterial'
            : 'previewLabelMinimalist'}
      {@const moodKey =
        themeDef.id === 'apple'
          ? 'previewEditorial'
          : themeDef.id === 'material'
            ? 'previewSystematic'
            : 'previewEssential'}
      <div
        data-theme={themeDef.id}
        class="flex flex-col gap-3 rounded-(--pui-radius-container,14px)
               border border-(--pui-outline-subtle) bg-(--pui-surface-base)
               p-5 shadow-(--pui-elevation-1)
               {themeDef.id === 'apple'
          ? '[box-shadow:var(--pui-apple-inner-highlight),var(--pui-elevation-1)]'
          : ''}
               {themeDef.id === 'material'
          ? 'rounded-(--pui-md-sys-shape-corner-large) bg-(--pui-md-sys-color-surface-container-low) shadow-(--pui-md-sys-elevation-level1)'
          : ''}"
      >
        <div class="flex items-center justify-between">
          <span
            class="font-(family-name:--pui-font-mono) text-[10px] uppercase tracking-[0.2em]
                   text-(--pui-text-secondary)"
          >
            {t(labelKey)}
          </span>
          <span
            class="font-(family-name:--pui-font-display) text-xs text-(--pui-text-secondary)
                   {themeDef.id === 'apple' ? 'italic' : ''}"
          >
            {t(moodKey)}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <Button variant="filled" size="sm">{t('previewContinue')}</Button>
          <Button variant="outlined" size="sm">{t('previewCancel')}</Button>
        </div>
        <div
          class="flex items-center gap-2 text-xs text-(--pui-text-secondary)"
        >
          <Switch defaultChecked size="sm" aria-label="Preview option" />
          <span>{t('previewLive')}</span>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- =================== THEME SWITCHER (interactive demo) =================== -->
<section
  class="mb-20 rounded-(--pui-radius-container) border border-(--pui-outline-subtle)
         bg-(--pui-surface-base) p-6 sm:p-10"
>
  <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div class="max-w-2xl">
      <span
        class="font-(family-name:--pui-font-mono) text-[10px] uppercase tracking-[0.2em]
               text-(--pui-text-secondary) opacity-70"
      >
        {t('sectionOverlays')}
      </span>
      <h2
        class="mt-1 font-(family-name:--pui-font-display) text-2xl font-normal
               tracking-[-0.015em] text-(--pui-text-primary) sm:text-3xl"
      >
        {t('themeSwitcherTitle')}
      </h2>
      <p class="mt-2 text-sm text-(--pui-text-secondary)">
        {t('themeSwitcherDesc')}
      </p>
    </div>
    <div
      class="inline-flex rounded-(--pui-radius-control) border border-(--pui-outline-subtle) p-0.5"
    >
      {#each THEMES as themeDef (themeDef.id)}
        <button
          type="button"
          onclick={() => (themeDemo = themeDef.id as ThemeId)}
          class="rounded-(--pui-radius-control) px-4 py-1.5 text-xs font-medium transition-colors
                 {themeDemo === themeDef.id
            ? 'bg-(--pui-text-primary) text-(--pui-surface-base)'
            : 'text-(--pui-text-secondary) hover:text-(--pui-text-primary)'}"
        >
          {themeDef.label}
        </button>
      {/each}
    </div>
  </div>

  <div
    data-theme={themeDemo}
    class="rounded-(--pui-radius-container) bg-(--pui-surface-base) p-6 sm:p-10
           border border-(--pui-outline-subtle)
           transition-[background-color,border-color] duration-300"
  >
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="flex flex-col gap-2">
        <span
          class="text-[10px] font-(family-name:--pui-font-mono) uppercase tracking-[0.15em] opacity-60"
          >Button</span
        >
        <div class="flex flex-wrap gap-2">
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span
          class="text-[10px] font-(family-name:--pui-font-mono) uppercase tracking-[0.15em] opacity-60"
          >Switch</span
        >
        <div class="flex items-center gap-3">
          <Switch defaultChecked label="Active" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span
          class="text-[10px] font-(family-name:--pui-font-mono) uppercase tracking-[0.15em] opacity-60"
          >Chip & Badge</span
        >
        <div class="flex flex-wrap gap-2">
          <Chip selected>Selected</Chip>
          <Badge count={12} />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =================== SECTION INDEX (DESKTOP) =================== -->
<aside class="mb-8 hidden lg:block" aria-label={t('sectionNavAria')}>
  <nav
    class="sticky top-20 flex flex-wrap gap-x-6 gap-y-2 border-b
           border-(--pui-outline-subtle) pb-3 text-sm"
  >
    {#each sections as s}
      <a
        href="#{s.id}"
        class="group flex items-baseline gap-2 transition-colors
               {activeSection === s.id
          ? 'text-(--pui-text-primary)'
          : 'text-(--pui-text-secondary) hover:text-(--pui-text-primary)'}"
      >
        <span
          class="font-(family-name:--pui-font-mono) text-[10px] uppercase tracking-[0.15em] opacity-60
                 group-hover:opacity-100 transition-opacity"
        >
          {s.eyebrow}
        </span>
        <span
          class="border-b-2 transition-all
                 {activeSection === s.id
            ? 'border-(--pui-color-primary) pb-0.5'
            : 'border-transparent'}"
        >
          {s.label}
        </span>
        <span class="font-(family-name:--pui-font-mono) text-[10px] opacity-50">
          {s.count}
        </span>
      </a>
    {/each}
  </nav>
</aside>

<!-- =================== 01 FOUNDATION =================== -->
<section
  id="foundation"
  aria-labelledby="heading-foundation"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="01"
    title={t('sectionFoundation')}
    description={t('sectionFoundationDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- Button -->
    <article id="spec-button" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Button</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/button`}
          class="specimen-link"
          aria-label="Button docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specButton')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap gap-2">
          <Button variant="filled">Filled</Button>
          <Button variant="elevated">Elevated</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </div>
      </div>
    </article>

    <!-- IconButton -->
    <article id="spec-icon-button" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">IconButton</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/icon-button`}
          class="specimen-link"
          aria-label="IconButton docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specIconButton')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap items-center gap-2">
          <IconButton label="Search" variant="standard">
            <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
              ><circle
                cx="9"
                cy="9"
                r="5.5"
                stroke="currentColor"
                stroke-width="1.5"
              /><path
                d="M13 13l4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
            >
          </IconButton>
          <IconButton label="Add" variant="filled">
            <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
              ><path
                d="M10 4v12M4 10h12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
            >
          </IconButton>
          <IconButton label="Filter" variant="filled-tonal">
            <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
              ><path
                d="M3 5h14M6 10h8M9 15h2"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
            >
          </IconButton>
          <IconButton label="Settings" variant="outlined">
            <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
              ><circle
                cx="10"
                cy="10"
                r="2"
                stroke="currentColor"
                stroke-width="1.5"
              /><path
                d="M10 1v3M10 16v3M1 10h3M16 10h3"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
            >
          </IconButton>
        </div>
      </div>
    </article>

    <!-- Fab -->
    <article id="spec-fab" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Fab</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/fab`}
          class="specimen-link"
          aria-label="Fab docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specFab')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap items-center gap-3">
          <Fab label="Add" size="small">
            <svg viewBox="0 0 20 20" width="18" aria-hidden="true"
              ><path
                d="M10 4v12M4 10h12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
            >
          </Fab>
          <Fab label="Add" size="regular">
            <svg viewBox="0 0 20 20" width="22" aria-hidden="true"
              ><path
                d="M10 4v12M4 10h12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              /></svg
            >
          </Fab>
        </div>
      </div>
    </article>

    <!-- Chip -->
    <article id="spec-chip" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Chip</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/chip`}
          class="specimen-link"
          aria-label="Chip docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specChip')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap gap-2">
          <Chip>Default</Chip>
          <Chip variant="outlined">Outlined</Chip>
          <Chip selected>Selected</Chip>
          <Chip removable>Removable</Chip>
          <Chip tone="primary">Primary</Chip>
        </div>
      </div>
    </article>

    <!-- Badge -->
    <article id="spec-badge" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Badge</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/badge`}
          class="specimen-link"
          aria-label="Badge docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specBadge')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap items-center gap-3">
          <Badge count={5} />
          <Badge count={100} max={99} />
          <Badge dot />
          <Badge dot tone="error" />
          <Badge tone="primary">New</Badge>
          <Badge tone="warning">Warn</Badge>
        </div>
      </div>
    </article>

    <!-- Avatar -->
    <article id="spec-avatar" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Avatar</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/avatar`}
          class="specimen-link"
          aria-label="Avatar docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specAvatar')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap items-center gap-3">
          <Avatar name="John Doe" status="online" />
          <Avatar name="Jane Smith" status="busy" />
          <Avatar name="A" />
          <Avatar size="xs" name="XS" />
          <Avatar size="lg" name="LG" />
        </div>
      </div>
    </article>

    <!-- Kbd -->
    <article id="spec-kbd" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Kbd</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/kbd`}
          class="specimen-link"
          aria-label="Kbd docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specKbd')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap items-center gap-2">
          <Kbd>⌘K</Kbd>
          <Kbd>Ctrl</Kbd>
          <span class="text-xs text-(--pui-text-secondary)">+</span>
          <Kbd>S</Kbd>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </article>

    <!-- Divider -->
    <article id="spec-divider" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Divider</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/divider`}
          class="specimen-link"
          aria-label="Divider docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specDivider')}</p>
      <div class="specimen-demo">
        <div class="flex h-12 items-center gap-3">
          <span class="text-sm">Left</span>
          <Divider orientation="vertical" />
          <span class="text-sm">Middle</span>
          <Divider orientation="vertical" />
          <span class="text-sm">Right</span>
        </div>
        <Divider
          ><span class="text-xs uppercase tracking-wider">or</span></Divider
        >
      </div>
    </article>

    <!-- Card -->
    <article id="spec-card" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Card</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/card`}
          class="specimen-link"
          aria-label="Card docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCard')}</p>
      <div class="specimen-demo">
        <div class="grid gap-2 sm:grid-cols-2">
          <Card variant="elevated" padding="sm">
            <p class="text-sm font-medium">{t('demoCardElevated')}</p>
            <p class="text-xs text-(--pui-text-secondary)">
              {t('demoShadowRaised')}
            </p>
          </Card>
          <Card variant="filled" padding="sm">
            <p class="text-sm font-medium">{t('demoCardFilled')}</p>
            <p class="text-xs text-(--pui-text-secondary)">
              {t('demoTintedBg')}
            </p>
          </Card>
          <Card variant="outlined" padding="sm">
            <p class="text-sm font-medium">{t('demoCardOutlined')}</p>
            <p class="text-xs text-(--pui-text-secondary)">
              {t('demoBorderOnly')}
            </p>
          </Card>
          <Card variant="tonal" padding="sm">
            <p class="text-sm font-medium">Tonal</p>
            <p class="text-xs text-(--pui-text-secondary)">MD3 2024</p>
          </Card>
        </div>
      </div>
    </article>

    <!-- Stack -->
    <article id="spec-stack" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Stack</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/stack`}
          class="specimen-link"
          aria-label="Stack docs">↗</a
        >
      </header>
      <p class="specimen-caption">
        Layout primitive — direction, gap, align, justify, wrap.
      </p>
      <div class="specimen-demo">
        <Stack direction="column" gap={2}>
          <div
            class="rounded bg-(--pui-surface-variant) p-2 text-center text-xs"
          >
            Item 1
          </div>
          <div
            class="rounded bg-(--pui-surface-variant) p-2 text-center text-xs"
          >
            Item 2
          </div>
          <div
            class="rounded bg-(--pui-surface-variant) p-2 text-center text-xs"
          >
            Item 3
          </div>
        </Stack>
      </div>
    </article>
  </div>
</section>

<!-- =================== 02 FORM CONTROLS =================== -->
<section
  id="form"
  aria-labelledby="heading-form"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="02"
    title={t('sectionForm')}
    description={t('sectionFormDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- TextField -->
    <article id="spec-text-field" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">TextField</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/text-field`}
          class="specimen-link"
          aria-label="TextField docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTextField')}</p>
      <div class="specimen-demo flex-col">
        <TextField label="Email" type="email" placeholder="you@example.com" />
        <TextField label="With Error" error="Required" />
      </div>
    </article>

    <!-- Textarea -->
    <article id="spec-textarea" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Textarea</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/textarea`}
          class="specimen-link"
          aria-label="Textarea docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTextarea')}</p>
      <div class="specimen-demo">
        <Textarea label="Bio" placeholder="Tell us about yourself" rows={3} />
      </div>
    </article>

    <!-- Select -->
    <article id="spec-select" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Select</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/select`}
          class="specimen-link"
          aria-label="Select docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSelect')}</p>
      <div class="specimen-demo">
        <Select
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana' },
            { value: 'c', label: 'Cherry' },
          ]}
          label="Fruit"
        />
      </div>
    </article>

    <!-- Combobox -->
    <article id="spec-combobox" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Combobox</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/combobox`}
          class="specimen-link"
          aria-label="Combobox docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCombobox')}</p>
      <div class="specimen-demo">
        <Combobox
          options={[
            { value: 'us', label: 'US' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
          ]}
          label="Country"
          placeholder="Type…"
        />
      </div>
    </article>

    <!-- Listbox -->
    <article id="spec-listbox" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Listbox</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/listbox`}
          class="specimen-link"
          aria-label="Listbox docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specListbox')}</p>
      <div class="specimen-demo">
        <Listbox
          options={[
            { value: 'r', label: 'Recent' },
            { value: 'p', label: 'Popular' },
            { value: 'a', label: 'Archived' },
          ]}
          label="Filter"
        />
      </div>
    </article>

    <!-- SearchField -->
    <article id="spec-search-field" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">SearchField</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/search-field`}
          class="specimen-link"
          aria-label="SearchField docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSearchField')}</p>
      <div class="specimen-demo">
        <SearchField label="Search" placeholder="Type to search…" />
      </div>
    </article>

    <!-- Checkbox -->
    <article id="spec-checkbox" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Checkbox</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/checkbox`}
          class="specimen-link"
          aria-label="Checkbox docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCheckbox')}</p>
      <div class="specimen-demo">
        <div class="flex flex-col gap-2">
          <Checkbox label="Accept terms" />
          <Checkbox label="Subscribe" defaultChecked />
          <Checkbox label="Select all" indeterminate />
        </div>
      </div>
    </article>

    <!-- Radio -->
    <article id="spec-radio" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Radio</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/radio`}
          class="specimen-link"
          aria-label="Radio docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specRadio')}</p>
      <div class="specimen-demo">
        <RadioGroup label="Choose one" defaultValue="b">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
          <Radio value="c" label="Option C" disabled />
        </RadioGroup>
      </div>
    </article>

    <!-- Switch -->
    <article id="spec-switch" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Switch</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/switch`}
          class="specimen-link"
          aria-label="Switch docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSwitch')}</p>
      <div class="specimen-demo flex-col">
        <Switch label="Airplane Mode" />
        <Switch label="Dark Mode" defaultChecked />
        <Switch label="Notifications" disabled />
      </div>
    </article>

    <!-- Slider -->
    <article id="spec-slider" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Slider</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/slider`}
          class="specimen-link"
          aria-label="Slider docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSlider')}</p>
      <div class="specimen-demo flex-col">
        <Slider label="Volume" showValue defaultValue={60} />
        <Slider
          label="Range"
          min={0}
          max={200}
          step={10}
          defaultValue={100}
          showValue
        />
      </div>
    </article>

    <!-- InputOTP -->
    <article id="spec-input-otp" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">InputOTP</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/input-otp`}
          class="specimen-link"
          aria-label="InputOTP docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specInputOTP')}</p>
      <div class="specimen-demo">
        <InputOTP length={6} defaultValue="123456" />
      </div>
    </article>

    <!-- InputGroup -->
    <article id="spec-input-group" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">InputGroup</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/input-group`}
          class="specimen-link"
          aria-label="InputGroup docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specInputGroup')}</p>
      <div class="specimen-demo">
        <InputGroup>
          {#snippet leading()}
            <span class="text-sm text-(--pui-text-secondary)">https://</span>
          {/snippet}
          <TextField placeholder="your-domain" />
        </InputGroup>
      </div>
    </article>

    <!-- ColorPicker -->
    <article id="spec-color-picker" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">ColorPicker</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/color-picker`}
          class="specimen-link"
          aria-label="ColorPicker docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specColorPicker')}</p>
      <div class="specimen-demo">
        <ColorPicker defaultValue="#5b8def" />
      </div>
    </article>

    <!-- Rating -->
    <article id="spec-rating" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Rating</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/rating`}
          class="specimen-link"
          aria-label="Rating docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specRating')}</p>
      <div class="specimen-demo">
        <Rating defaultValue={3.5} allowHalf />
      </div>
    </article>

    <!-- FileUpload -->
    <article id="spec-file-upload" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">FileUpload</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/file-upload`}
          class="specimen-link"
          aria-label="FileUpload docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specFileUpload')}</p>
      <div class="specimen-demo">
        <FileUpload placeholder="Attach files" />
      </div>
    </article>

    <!-- Form / FormField -->
    <article id="spec-form" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Form</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/form`}
          class="specimen-link"
          aria-label="Form docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specForm')}</p>
      <div class="specimen-demo">
        <Form>
          <FormField label="Name">
            <TextField placeholder="Your name" />
          </FormField>
        </Form>
      </div>
    </article>
  </div>
</section>

<!-- =================== 03 FEEDBACK =================== -->
<section
  id="feedback"
  aria-labelledby="heading-feedback"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="03"
    title={t('sectionFeedback')}
    description={t('sectionFeedbackDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- Alert -->
    <article id="spec-alert" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Alert</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/alert`}
          class="specimen-link"
          aria-label="Alert docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specAlert')}</p>
      <div class="specimen-demo flex-col">
        <Alert tone="info">Info message.</Alert>
        <Alert tone="error" dismissible>Dismissible error.</Alert>
      </div>
    </article>

    <!-- Banner -->
    <article id="spec-banner" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Banner</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/banner`}
          class="specimen-link"
          aria-label="Banner docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specBanner')}</p>
      <div class="specimen-demo">
        <Banner tone="warning">Your session expires soon.</Banner>
      </div>
    </article>

    <!-- Message -->
    <article id="spec-message" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Message</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/message`}
          class="specimen-link"
          aria-label="Message docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specMessage')}</p>
      <div class="specimen-demo" style="min-height: 80px;">
        <button
          type="button"
          class="rounded-(--pui-radius-control) bg-(--pui-color-primary) px-3 py-1.5 text-xs font-medium text-(--pui-text-on-primary)"
          onclick={() => (messageOpen = !messageOpen)}
        >
          {messageOpen ? 'Hide message' : 'Show message'}
        </button>
        <Message
          tone="info"
          title="System"
          placement="bottom-right"
          open={messageOpen}
          onOpenChange={(v: boolean) => (messageOpen = v)}
        >
          Toast-style floating notification.
        </Message>
      </div>
    </article>

    <!-- Toast -->
    <article id="spec-toast" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Toast</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/toast`}
          class="specimen-link"
          aria-label="Toast docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specToast')}</p>
      <div class="specimen-demo">
        <ToastViewport />
        <div class="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outlined"
            onClick={() => toast.info('Info toast')}>Info</Button
          >
          <Button
            size="sm"
            variant="outlined"
            onClick={() => toast.success('Saved!')}>Success</Button
          >
          <Button
            size="sm"
            variant="outlined"
            onClick={() => toast.error('Failed')}>Error</Button
          >
        </div>
      </div>
    </article>

    <!-- Snackbar -->
    <article id="spec-snackbar" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Snackbar</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/snackbar`}
          class="specimen-link"
          aria-label="Snackbar docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSnackbar')}</p>
      <div class="specimen-demo">
        <Snackbar
          message="File deleted"
          actionLabel="Undo"
          defaultOpen
          kind="action"
        />
      </div>
    </article>

    <!-- Progress -->
    <article id="spec-progress" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Progress</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/progress`}
          class="specimen-link"
          aria-label="Progress docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specProgress')}</p>
      <div class="specimen-demo flex-col">
        <Progress value={65} label="Upload" />
        <Progress indeterminate label="Loading…" />
      </div>
    </article>

    <!-- Spinner -->
    <article id="spec-spinner" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Spinner</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/spinner`}
          class="specimen-link"
          aria-label="Spinner docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSpinner')}</p>
      <div class="specimen-demo">
        <div class="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>
    </article>

    <!-- Skeleton -->
    <article id="spec-skeleton" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Skeleton</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/skeleton`}
          class="specimen-link"
          aria-label="Skeleton docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSkeleton')}</p>
      <div class="specimen-demo">
        <div class="flex flex-col gap-3">
          <Skeleton shape="text" width="80%" />
          <Skeleton shape="text" width="60%" />
          <div class="flex gap-3">
            <Skeleton shape="circle" width="48px" height="48px" />
            <Skeleton shape="rect" height="48px" />
          </div>
        </div>
      </div>
    </article>

    <!-- EmptyState -->
    <article id="spec-empty-state" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">EmptyState</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/empty-state`}
          class="specimen-link"
          aria-label="EmptyState docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specEmptyState')}</p>
      <div class="specimen-demo">
        <EmptyState>
          {#snippet title()}No results{/snippet}
          <p>Try adjusting your search.</p>
        </EmptyState>
      </div>
    </article>
  </div>
</section>

<!-- =================== 04 OVERLAYS =================== -->
<section
  id="overlays"
  aria-labelledby="heading-overlays"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="04"
    title={t('sectionOverlays')}
    description={t('sectionOverlaysDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- Tooltip -->
    <article id="spec-tooltip" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Tooltip</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/tooltip`}
          class="specimen-link"
          aria-label="Tooltip docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTooltip')}</p>
      <div class="specimen-demo">
        <div class="flex flex-wrap gap-3">
          <Tooltip content="Tooltip on top" placement="top">
            <Button variant="text">Top</Button>
          </Tooltip>
          <Tooltip content="On bottom" placement="bottom">
            <Button variant="text">Bottom</Button>
          </Tooltip>
        </div>
      </div>
    </article>

    <!-- Popover -->
    <article id="spec-popover" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Popover</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/popover`}
          class="specimen-link"
          aria-label="Popover docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specPopover')}</p>
      <div class="specimen-demo">
        <Popover>
          {#snippet trigger()}<Button variant="outlined">Open Popover</Button
            >{/snippet}
          <div class="p-3 text-sm">Popover content</div>
        </Popover>
      </div>
    </article>

    <!-- HoverCard -->
    <article id="spec-hover-card" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">HoverCard</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/hover-card`}
          class="specimen-link"
          aria-label="HoverCard docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specHoverCard')}</p>
      <div class="specimen-demo">
        <HoverCard>
          {#snippet content()}
            <p class="text-sm">
              Hover cards surface rich content on demand — without leaving the
              page.
            </p>
          {/snippet}
          <Button variant="text">Hover me</Button>
        </HoverCard>
      </div>
    </article>

    <!-- Menu -->
    <article id="spec-menu" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Menu</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/menu`}
          class="specimen-link"
          aria-label="Menu docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specMenu')}</p>
      <div class="specimen-demo">
        <Menu
          items={[
            { id: 'edit', label: 'Edit', shortcut: '⌘E' },
            { id: 'duplicate', label: 'Duplicate' },
            { id: 'delete', label: 'Delete', destructive: true },
          ]}
        >
          {#snippet trigger()}<Button variant="outlined">Open Menu</Button
            >{/snippet}
        </Menu>
      </div>
    </article>

    <!-- ContextMenu -->
    <article id="spec-context-menu" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">ContextMenu</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/context-menu`}
          class="specimen-link"
          aria-label="ContextMenu docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specContextMenu')}</p>
      <div class="specimen-demo">
        <div
          class="rounded-(--pui-radius-control) border border-dashed border-(--pui-outline-subtle) p-6 text-center text-xs text-(--pui-text-secondary)"
        >
          <ContextMenu
            items={[
              { id: 'cut', label: 'Cut', shortcut: '⌘X' },
              { id: 'copy', label: 'Copy', shortcut: '⌘C' },
              { id: 'paste', label: 'Paste', shortcut: '⌘V' },
            ]}
          />
          Right-click here
        </div>
      </div>
    </article>

    <!-- Dialog -->
    <article id="spec-dialog" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Dialog</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/dialog`}
          class="specimen-link"
          aria-label="Dialog docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specDialog')}</p>
      <div class="specimen-demo">
        <Button onClick={() => (dialogOpen = true)}>Open Dialog</Button>
        <Dialog
          open={dialogOpen}
          onOpenChange={(o: boolean) => (dialogOpen = o)}
        >
          {#snippet title()}Confirm Action{/snippet}
          <p class="text-sm">Are you sure you want to proceed?</p>
          {#snippet footer()}
            <Button variant="outlined" onClick={() => (dialogOpen = false)}
              >Cancel</Button
            >
            <Button onClick={() => (dialogOpen = false)}>Confirm</Button>
          {/snippet}
        </Dialog>
      </div>
    </article>

    <!-- Sheet -->
    <article id="spec-sheet" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Sheet</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/sheet`}
          class="specimen-link"
          aria-label="Sheet docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSheet')}</p>
      <div class="specimen-demo">
        <Button variant="outlined" onClick={() => (sheetOpen = true)}
          >Open Sheet</Button
        >
        <Sheet open={sheetOpen} onOpenChange={(o: boolean) => (sheetOpen = o)}>
          {#snippet title()}<span>Sheet Title</span>{/snippet}
          <p class="text-sm">Slides in from the bottom.</p>
        </Sheet>
      </div>
    </article>

    <!-- Drawer -->
    <article id="spec-drawer" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Drawer</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/drawer`}
          class="specimen-link"
          aria-label="Drawer docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specDrawer')}</p>
      <div class="specimen-demo">
        <Button variant="outlined" onClick={() => (drawerOpen = true)}
          >Open Drawer</Button
        >
        <Drawer
          open={drawerOpen}
          onOpenChange={(o: boolean) => (drawerOpen = o)}
        >
          {#snippet title()}<span>Drawer Title</span>{/snippet}
          <p class="text-sm">Slides in from the left.</p>
        </Drawer>
      </div>
    </article>

    <!-- ConfirmDialog -->
    <article id="spec-confirm-dialog" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">ConfirmDialog</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/confirm-dialog`}
          class="specimen-link"
          aria-label="ConfirmDialog docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specConfirmDialog')}</p>
      <div class="specimen-demo">
        <Button variant="tonal" onClick={() => (confirmOpen = true)}
          >Confirm</Button
        >
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={(o: boolean) => (confirmOpen = o)}
          title="Delete this item?"
          description="This action cannot be undone."
          tone="danger"
          onConfirm={() => (confirmOpen = false)}
        />
      </div>
    </article>

    <!-- Tour -->
    <article id="spec-tour" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Tour</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/tour`}
          class="specimen-link"
          aria-label="Tour docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTour')}</p>
      <div class="specimen-demo">
        <Button variant="outlined" onClick={() => (tourOpen = true)}
          >Start Tour</Button
        >
        <Tour
          open={tourOpen}
          onOpenChange={(o: boolean) => (tourOpen = o)}
          steps={tourSteps}
        />
      </div>
    </article>

    <!-- CommandPalette -->
    <article id="spec-command-palette" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">CommandPalette</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/command-palette`}
          class="specimen-link"
          aria-label="CommandPalette docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCommandPalette')}</p>
      <div class="specimen-demo">
        <Button variant="outlined" onClick={() => (commandOpen = true)}>
          <Kbd>⌘</Kbd><span class="mx-1">+</span><Kbd>K</Kbd>
        </Button>
        <CommandPalette
          open={commandOpen}
          onOpenChange={(o: boolean) => (commandOpen = o)}
          items={[
            { id: 'new', label: 'New file', shortcut: '⌘N' },
            { id: 'open', label: 'Open', shortcut: '⌘O' },
            { id: 'save', label: 'Save', shortcut: '⌘S' },
          ]}
        />
      </div>
    </article>
  </div>
</section>

<!-- =================== 05 NAVIGATION =================== -->
<section
  id="navigation"
  aria-labelledby="heading-navigation"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="05"
    title={t('sectionNavigation')}
    description={t('sectionNavigationDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- Tabs -->
    <article id="spec-tabs" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Tabs</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/tabs`}
          class="specimen-link"
          aria-label="Tabs docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTabs')}</p>
      <div class="specimen-demo">
        <Tabs
          items={[
            { value: 'a', label: 'Details' },
            { value: 'b', label: 'Settings' },
            { value: 'c', label: 'History' },
          ]}
        />
      </div>
    </article>

    <!-- SegmentedControl -->
    <article id="spec-segmented-control" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">SegmentedControl</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/segmented-control`}
          class="specimen-link"
          aria-label="SegmentedControl docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSegmentedControl')}</p>
      <div class="specimen-demo">
        <SegmentedControl
          items={[
            { value: 'd', label: 'Day' },
            { value: 'w', label: 'Week' },
            { value: 'm', label: 'Month' },
          ]}
        />
      </div>
    </article>

    <!-- Breadcrumb -->
    <article id="spec-breadcrumb" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Breadcrumb</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/breadcrumb`}
          class="specimen-link"
          aria-label="Breadcrumb docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specBreadcrumb')}</p>
      <div class="specimen-demo">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products' },
            { label: 'Details', current: true },
          ]}
        />
      </div>
    </article>

    <!-- Pagination -->
    <article id="spec-pagination" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Pagination</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/pagination`}
          class="specimen-link"
          aria-label="Pagination docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specPagination')}</p>
      <div class="specimen-demo">
        <Pagination total={12} defaultValue={5} />
      </div>
    </article>

    <!-- Stepper -->
    <article id="spec-stepper" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Stepper</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/stepper`}
          class="specimen-link"
          aria-label="Stepper docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specStepper')}</p>
      <div class="specimen-demo">
        <Stepper bind:value={stepperValue} steps={stepperSteps} />
      </div>
    </article>

    <!-- Toolbar -->
    <article id="spec-toolbar" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Toolbar</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/toolbar`}
          class="specimen-link"
          aria-label="Toolbar docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specToolbar')}</p>
      <div class="specimen-demo">
        <Toolbar title="Document">
          {#snippet leading()}
            <IconButton label="Back">
              <svg width="18" viewBox="0 0 18 18" aria-hidden="true"
                ><path
                  d="M12 4l-5 5 5 5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                /></svg
              >
            </IconButton>
          {/snippet}
        </Toolbar>
      </div>
    </article>

    <!-- Sidebar -->
    <article id="spec-sidebar" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Sidebar</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/sidebar`}
          class="specimen-link"
          aria-label="Sidebar docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specSidebar')}</p>
      <div class="specimen-demo p-0">
        <div
          class="h-40 overflow-hidden rounded-(--pui-radius-container) border border-(--pui-outline-subtle)"
        >
          <Sidebar>
            {#snippet header()}
              <span class="font-semibold text-sm">Files</span>
            {/snippet}
            {#snippet children()}
              <div class="flex flex-col gap-1 p-2 text-sm">
                <button
                  type="button"
                  class="rounded-(--pui-radius-control) bg-(--pui-surface-variant) px-3 py-1.5 text-left"
                  >📁 Documents</button
                >
                <button
                  type="button"
                  class="rounded-(--pui-radius-control) px-3 py-1.5 text-left"
                  >📁 Downloads</button
                >
              </div>
            {/snippet}
          </Sidebar>
        </div>
      </div>
    </article>

    <!-- NavigationRail -->
    <article id="spec-navigation-rail" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">NavigationRail</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/navigation-rail`}
          class="specimen-link"
          aria-label="NavigationRail docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specNavigationRail')}</p>
      <div class="specimen-demo p-0">
        <div
          class="h-40 overflow-hidden rounded-(--pui-radius-container) border border-(--pui-outline-subtle)"
        >
          <NavigationRail
            value={bottomNavValue}
            onValueChange={(v: string) => (bottomNavValue = v)}
            items={[
              { value: 'home', label: 'Home' },
              { value: 'search', label: 'Search' },
              { value: 'profile', label: 'Profile' },
            ]}
          />
        </div>
      </div>
    </article>

    <!-- BottomNavigation -->
    <article id="spec-bottom-navigation" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">BottomNavigation</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/bottom-navigation`}
          class="specimen-link"
          aria-label="BottomNavigation docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specBottomNavigation')}</p>
      <div class="specimen-demo p-4">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each THEMES as themeDef (themeDef.id)}
            <!-- {themeDef.id} 主题下的 BottomNavigation 演示 -->
            <div data-theme={themeDef.id} class="phone-frame">
              <span class="phone-label">{themeDef.label}</span>
              <div class="phone-screen">
                <div class="phone-content">
                  <div class="phone-status-bar">
                    <span>9:41</span>
                    {#if themeDef.id === 'apple'}
                      <span class="phone-notch"></span>
                    {/if}
                    <span class="phone-status-icons">
                      <svg
                        viewBox="0 0 16 12"
                        width="14"
                        height="10"
                        aria-hidden="true"
                        ><path
                          d="M1 6h2v5H1zM5 4h2v7H5zM9 2h2v9H9zM13 0h2v11h-2z"
                          fill="currentColor"
                        /></svg
                      >
                      <svg
                        viewBox="0 0 16 12"
                        width="14"
                        height="10"
                        aria-hidden="true"
                        ><path
                          d="M8 2.4C5.6 2.4 3.6 3.2 2 4.4l1.4 1.4C4.6 5 6.2 4.4 8 4.4s3.4.6 4.6 1.4L14 4.4C12.4 3.2 10.4 2.4 8 2.4zM4 6.4l1.4 1.4c.7-.7 1.6-1 2.6-1s1.9.3 2.6 1L12 6.4c-1-.9-2.4-1.6-4-1.6s-3 .7-4 1.6zm2 2l2 2 2-2c-.6-.5-1.2-.8-2-.8s-1.4.3-2 .8z"
                          fill="currentColor"
                        /></svg
                      >
                      <svg
                        viewBox="0 0 20 12"
                        width="16"
                        height="10"
                        aria-hidden="true"
                        ><rect
                          x="1"
                          y="2"
                          width="16"
                          height="8"
                          rx="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-width="1"
                        /><rect
                          x="18"
                          y="4"
                          width="1.5"
                          height="4"
                          fill="currentColor"
                        /><rect
                          x="2.5"
                          y="3.5"
                          width="10"
                          height="5"
                          rx="1"
                          fill="currentColor"
                        /></svg
                      >
                    </span>
                  </div>
                  <div class="phone-body">
                    <p class="phone-app-name">Sample</p>
                    <p class="phone-app-section">Tab content</p>
                  </div>
                  <div class="phone-bottom-nav-wrap">
                    <BottomNavigation
                      value={bottomNavValue}
                      onValueChange={(v: string) => (bottomNavValue = v)}
                      items={[
                        { id: 'feed', label: 'Feed', icon: navIconHome },
                        {
                          id: 'explore',
                          label: 'Explore',
                          icon: navIconSearch,
                        },
                        {
                          id: 'inbox',
                          label: 'Inbox',
                          icon: navIconUser,
                          badge: 3,
                        },
                      ]}
                    />
                    {#if themeDef.id === 'apple'}
                      <div class="phone-home-indicator"></div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </article>
  </div>
</section>

<!-- =================== 06 DATA =================== -->
<section
  id="data"
  aria-labelledby="heading-data"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="06"
    title={t('sectionData')}
    description={t('sectionDataDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- List -->
    <article id="spec-list" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">List</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/list`}
          class="specimen-link"
          aria-label="List docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specList')}</p>
      <div class="specimen-demo p-0">
        <List variant="grouped">
          {#snippet children()}
            <ListItem title="Inbox" description="3 new" />
            <ListItem title="Sent" />
            <ListItem title="Trash" />
          {/snippet}
        </List>
      </div>
    </article>

    <!-- Accordion -->
    <article id="spec-accordion" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Accordion</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/accordion`}
          class="specimen-link"
          aria-label="Accordion docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specAccordion')}</p>
      <div class="specimen-demo p-0">
        <Accordion
          items={[
            { value: '1', title: 'How to install?' },
            { value: '2', title: 'Browser support?' },
            { value: '3', title: 'Custom themes?' },
          ]}
        />
      </div>
    </article>

    <!-- Timeline -->
    <article id="spec-timeline" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Timeline</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/timeline`}
          class="specimen-link"
          aria-label="Timeline docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTimeline')}</p>
      <div class="specimen-demo p-0">
        <Timeline
          items={[
            { title: 'Order placed', timestamp: '10:32', status: 'success' },
            { title: 'Shipped', timestamp: '16:00', status: 'info' },
            { title: 'Delivered', timestamp: 'Pending', status: 'default' },
          ]}
        />
      </div>
    </article>

    <!-- Table -->
    <article id="spec-table" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Table</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/table`}
          class="specimen-link"
          aria-label="Table docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTable')}</p>
      <div class="specimen-demo p-0">
        <Table striped>
          {#snippet children()}
            <thead>
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium">Name</th>
                <th class="px-3 py-2 text-left text-xs font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                ><td class="px-3 py-2 text-sm">Alice</td><td class="px-3 py-2"
                  ><Badge tone="primary">Active</Badge></td
                ></tr
              >
              <tr
                ><td class="px-3 py-2 text-sm">Bob</td><td class="px-3 py-2"
                  ><Badge tone="warning">Pending</Badge></td
                ></tr
              >
            </tbody>
          {/snippet}
        </Table>
      </div>
    </article>

    <!-- DataTable -->
    <article id="spec-data-table" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">DataTable</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/data-table`}
          class="specimen-link"
          aria-label="DataTable docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specDataTable')}</p>
      <div class="specimen-demo p-0">
        <DataTable
          data={[
            { name: 'Alice', role: 'Admin' },
            { name: 'Bob', role: 'User' },
          ]}
          columns={[
            { key: 'name', header: 'Name', sortable: true },
            { key: 'role', header: 'Role' },
          ]}
        />
      </div>
    </article>

    <!-- TreeView -->
    <article id="spec-tree-view" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">TreeView</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/tree-view`}
          class="specimen-link"
          aria-label="TreeView docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTreeView')}</p>
      <div class="specimen-demo p-0">
        <TreeView
          nodes={[
            {
              id: '1',
              label: 'src',
              children: [
                { id: '1.1', label: 'components' },
                { id: '1.2', label: 'lib' },
              ],
            },
            { id: '2', label: 'package.json' },
          ]}
        />
      </div>
    </article>

    <!-- VirtualList -->
    <article id="spec-virtual-list" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">VirtualList</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/virtual-list`}
          class="specimen-link"
          aria-label="VirtualList docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specVirtualList')}</p>
      <div class="specimen-demo p-0">
        <div
          class="h-40 overflow-hidden rounded-(--pui-radius-container) border border-(--pui-outline-subtle)"
        >
          <VirtualList itemCount={1000} itemHeight={28} height={160}>
            {#snippet item(p)}
              <div class="flex items-center px-3 text-xs">
                Item {p.index + 1}
              </div>
            {/snippet}
          </VirtualList>
        </div>
      </div>
    </article>

    <!-- Calendar -->
    <article id="spec-calendar" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Calendar</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/calendar`}
          class="specimen-link"
          aria-label="Calendar docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCalendar')}</p>
      <div class="specimen-demo p-0">
        <Calendar />
      </div>
    </article>

    <!-- DatePicker -->
    <article id="spec-date-picker" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">DatePicker</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/date-picker`}
          class="specimen-link"
          aria-label="DatePicker docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specDatePicker')}</p>
      <div class="specimen-demo">
        <DatePicker label="Date" />
      </div>
    </article>

    <!-- TimePicker -->
    <article id="spec-time-picker" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">TimePicker</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/time-picker`}
          class="specimen-link"
          aria-label="TimePicker docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specTimePicker')}</p>
      <div class="specimen-demo">
        <TimePicker label="Time" />
      </div>
    </article>

    <!-- DateRangePicker -->
    <article id="spec-date-range-picker" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">DateRangePicker</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/date-range-picker`}
          class="specimen-link"
          aria-label="DateRangePicker docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specDateRangePicker')}</p>
      <div class="specimen-demo">
        <DateRangePicker granularity="day" label="Date Range" />
      </div>
    </article>
  </div>
</section>

<!-- =================== 07 ADVANCED =================== -->
<section
  id="advanced"
  aria-labelledby="heading-advanced"
  class="scroll-mt-24 space-y-10 border-t border-(--pui-outline-subtle) pt-12"
>
  <SectionHeading
    eyebrow="07"
    title={t('sectionAdvanced')}
    description={t('sectionAdvancedDesc')}
    level={2}
  />

  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <!-- Carousel -->
    <article id="spec-carousel" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Carousel</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/carousel`}
          class="specimen-link"
          aria-label="Carousel docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCarousel')}</p>
      <div class="specimen-demo p-0">
        <Carousel
          slides={[
            { id: 'a', alt: 'Slide A' },
            { id: 'b', alt: 'Slide B' },
            { id: 'c', alt: 'Slide C' },
          ]}
        />
      </div>
    </article>

    <!-- Chart -->
    <article id="spec-chart" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">Chart</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/chart`}
          class="specimen-link"
          aria-label="Chart docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specChart')}</p>
      <div class="specimen-demo">
        <Chart
          kind="line"
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
          series={[{ name: 'Revenue', data: [120, 200, 180, 240, 220, 300] }]}
        />
      </div>
    </article>

    <!-- CodeBlock -->
    <article id="spec-code-block" class="specimen">
      <header class="specimen-head">
        <h3 class="specimen-title">CodeBlock</h3>
        <a
          href={`${localeToPath(locale)}/docs/components/code-block`}
          class="specimen-link"
          aria-label="CodeBlock docs">↗</a
        >
      </header>
      <p class="specimen-caption">{t('specCodeBlock')}</p>
      <div class="specimen-demo p-0">
        <CodeBlock
          code={`import { Button } from '@persona-ui/lib';
<Button variant="filled">Hello</Button>`}
          language="ts"
          filename="example.ts"
        />
      </div>
    </article>
  </div>
</section>

<style>
  /* ── Specimen card 样式（统一视觉节奏） ──
     设计原则：
     - 卡片整体是一个连贯单元，不在内部分割"舞台"
     - 演示区不增加新的视觉容器，组件直接活在卡片表面
     - 用极轻的 outline 边框 + 顶部分隔线营造层次
  */
  .specimen {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    border-radius: 20px;
    border: 1px solid var(--pui-outline-subtle);
    background: var(--pui-surface-container-low, var(--pui-surface-base));
    transition:
      border-color 200ms,
      box-shadow 200ms;
  }
  /* Apple 主题：squircle 22px + 极轻 glass material */
  :global([data-theme='apple']) .specimen {
    border-radius: 22px;
    background: color-mix(
      in oklch,
      var(--pui-apple-system-background) 88%,
      transparent
    );
    backdrop-filter: blur(8px) saturate(180%);
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    border-color: color-mix(
      in oklch,
      var(--pui-apple-separator) 40%,
      transparent
    );
  }
  /* MD3 主题：surface-container-low 静态层，16px 圆角 */
  :global([data-theme='material']) .specimen {
    border-radius: 16px;
    background: var(
      --pui-md-sys-color-surface-container-low,
      var(--pui-surface-base)
    );
    border-color: var(
      --pui-md-sys-color-outline-variant,
      var(--pui-outline-subtle)
    );
  }
  /* Minimalist 主题：near-zero radius + hairline border，无装饰 */
  :global([data-theme='minimalist']) .specimen {
    border-radius: 6px;
    background: var(--pui-surface-base);
    border-color: var(--pui-outline-subtle);
  }
  .specimen:hover {
    border-color: var(--pui-outline);
  }
  .specimen-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .specimen-title {
    font-family: var(--pui-font-display);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--pui-text-primary);
  }
  .specimen-link {
    font-family: var(--pui-font-mono);
    font-size: 0.75rem;
    color: var(--pui-text-secondary);
    text-decoration: none;
    opacity: 0.4;
    transition:
      opacity 200ms,
      color 200ms;
  }
  .specimen:hover .specimen-link {
    opacity: 1;
    color: var(--pui-color-primary);
  }
  .specimen-caption {
    font-size: 0.75rem;
    line-height: 1.45;
    color: var(--pui-text-secondary);
    margin: 0;
    min-height: 2.2em;
  }
  /* 演示区：透明背景，继承卡片 surface；只保留顶部分隔线和呼吸 padding */
  .specimen-demo {
    min-height: 110px;
    padding: 1.5rem 0.5rem 0.25rem;
    border-radius: 0;
    background: transparent;
    border-top: 1px solid var(--pui-outline-subtle);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }
  .specimen-demo.flex-col {
    align-items: stretch;
    flex-direction: column;
  }
  .specimen-demo.p-0 {
    padding: 0;
    border-top: none;
    overflow: hidden;
  }
</style>
