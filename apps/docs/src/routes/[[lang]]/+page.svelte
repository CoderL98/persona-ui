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
  // ── Form ──
  import { TextField } from '@persona-ui/lib/components/text-field';
  import { Textarea } from '@persona-ui/lib/components/textarea';
  import { Checkbox } from '@persona-ui/lib/components/checkbox';
  import { RadioGroup, Radio } from '@persona-ui/lib/components/radio';
  import { Switch } from '@persona-ui/lib/components/switch';
  import { Slider } from '@persona-ui/lib/components/slider';
  import { Select } from '@persona-ui/lib/components/select';
  import { Combobox } from '@persona-ui/lib/components/combobox';
  import { SearchField } from '@persona-ui/lib/components/search-field';
  // ── Feedback ──
  import { Alert } from '@persona-ui/lib/components/alert';
  import { Banner } from '@persona-ui/lib/components/banner';
  import { Toast, ToastViewport } from '@persona-ui/lib/components/toast';
  import { Progress } from '@persona-ui/lib/components/progress';
  import { Spinner } from '@persona-ui/lib/components/spinner';
  import { Skeleton } from '@persona-ui/lib/components/skeleton';
  import { EmptyState } from '@persona-ui/lib/components/empty-state';
  // ── Overlay ──
  import { Tooltip } from '@persona-ui/lib/components/tooltip';
  import { Popover } from '@persona-ui/lib/components/popover';
  import { Menu } from '@persona-ui/lib/components/menu';
  import { Dialog } from '@persona-ui/lib/components/dialog';
  // ── Navigation ──
  import { Tabs } from '@persona-ui/lib/components/tabs';
  import { SegmentedControl } from '@persona-ui/lib/components/segmented-control';
  import { Breadcrumb } from '@persona-ui/lib/components/breadcrumb';
  import { Toolbar } from '@persona-ui/lib/components/toolbar';
  import { Sidebar } from '@persona-ui/lib/components/sidebar';
  // ── Data ──
  import { List, ListItem } from '@persona-ui/lib/components/list';
  import { Accordion } from '@persona-ui/lib/components/accordion';
  import { Table } from '@persona-ui/lib/components/table';
  import { Calendar } from '@persona-ui/lib/components/calendar';
  import { TimePicker } from '@persona-ui/lib/components/time-picker';
  import { DateRangePicker } from '@persona-ui/lib/components/date-range-picker';
  // ── Local ──
  import { SectionHeading } from '@persona-ui/lib/components/section-heading';
  // ── Advanced (M3 batches) ──
  import { Carousel } from '@persona-ui/lib/components/carousel';
  import { Chart } from '@persona-ui/lib/components/chart';
  import { CodeBlock } from '@persona-ui/lib/components/code-block';
  import { ColorPicker } from '@persona-ui/lib/components/color-picker';
  import { ConfirmDialog } from '@persona-ui/lib/components/confirm-dialog';
  import { ContextMenu } from '@persona-ui/lib/components/context-menu';
  import { DataTable } from '@persona-ui/lib/components/data-table';
  import { DatePicker } from '@persona-ui/lib/components/date-picker';
  import { Drawer } from '@persona-ui/lib/components/drawer';
  import { FileUpload } from '@persona-ui/lib/components/file-upload';
  import { HoverCard } from '@persona-ui/lib/components/hover-card';
  import { InputGroup } from '@persona-ui/lib/components/input-group';
  import { InputOTP } from '@persona-ui/lib/components/input-otp';
  import { Message } from '@persona-ui/lib/components/message';
  import { NavigationRail } from '@persona-ui/lib/components/navigation-rail';
  import { Pagination } from '@persona-ui/lib/components/pagination';
  import { Rating } from '@persona-ui/lib/components/rating';
  import { Sheet } from '@persona-ui/lib/components/sheet';
  import { Stack } from '@persona-ui/lib/components/stack';
  import { Stepper } from '@persona-ui/lib/components/stepper';
  import { Timeline } from '@persona-ui/lib/components/timeline';
  import { Tour } from '@persona-ui/lib/components/tour';
  import { TreeView } from '@persona-ui/lib/components/tree-view';
  import { VirtualList } from '@persona-ui/lib/components/virtual-list';
  import { t, brand } from '../../lib/i18n/t';
  import { currentLocale } from '../../lib/i18n/store.svelte';
  import { localeToPath } from '../../lib/i18n/locales';

  // 章节索引（id 固定为英文用于 HTML anchor，label/description 随 locale 切换）
  const sections = $derived([
    { id: 'foundation', eyebrow: '01', label: t('sectionFoundation'), desc: t('sectionFoundationDesc') },
    { id: 'form', eyebrow: '02', label: t('sectionForm'), desc: t('sectionFormDesc') },
    { id: 'feedback', eyebrow: '03', label: t('sectionFeedback'), desc: t('sectionFeedbackDesc') },
    { id: 'overlays', eyebrow: '04', label: t('sectionOverlays'), desc: t('sectionOverlaysDesc') },
    { id: 'navigation', eyebrow: '05', label: t('sectionNavigation'), desc: t('sectionNavigationDesc') },
    { id: 'data', eyebrow: '06', label: t('sectionData'), desc: t('sectionDataDesc') },
    { id: 'advanced', eyebrow: '07', label: t('sectionAdvanced'), desc: t('sectionAdvancedDesc') },
  ]);

  let activeSection = $state('foundation');
  let dialogOpen = $state(false);
  let sheetOpen = $state(false);
  let drawerOpen = $state(false);
  let confirmOpen = $state(false);

  // locale-aware 跳转链接
  const locale = $derived(currentLocale.value);
  const gettingStartedHref = $derived(`${localeToPath(locale)}/docs/getting-started`);
  const browseComponentsHref = $derived(`${localeToPath(locale)}/docs/components/button`);

  // 站点 baseUrl（用于 OG/Twitter/canonical 绝对地址）
  const origin = $derived(typeof window !== 'undefined' ? window.location.origin : 'https://persona-ui.dev');
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
</script>

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
      {t('heroTitleA')} <em
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
        {t('hintSearch').split('⌘K')[0]}<Kbd>⌘K</Kbd>{t('hintSearch').split('⌘K')[1] ?? ''}
      </span>
    </div>
  </div>

  <!-- 右侧：Live Preview（同一组件 × 两主题） -->
  <div
    class="pui-reveal-stagger relative grid w-full max-w-md gap-4 self-stretch md:w-auto"
  >
    <!-- Apple 预览 -->
    <div
      data-theme="apple"
      class="flex flex-col gap-3 rounded-(--pui-radius-card-hero)
             border border-(--pui-outline-subtle) bg-(--pui-surface-base)
             p-5 shadow-(--pui-elevation-1)
             [box-shadow:var(--pui-apple-inner-highlight),var(--pui-elevation-1)]"
    >
      <div class="flex items-center justify-between">
        <span
          class="font-(family-name:--pui-font-mono) text-[10px] uppercase tracking-[0.2em]
                 text-(--pui-text-secondary)"
        >
          {t('previewLabelApple')}
        </span>
        <span
          class="font-(family-name:--pui-font-display) italic text-xs text-(--pui-text-secondary)"
        >
          {t('previewEditorial')}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <Button variant="filled" size="sm">{t('previewContinue')}</Button>
        <Button variant="outlined" size="sm">{t('previewCancel')}</Button>
      </div>
      <div class="flex items-center gap-2 text-xs text-(--pui-text-secondary)">
        <Switch defaultChecked size="sm" aria-label="Preview option" />
        <span>{t('previewLive')}</span>
      </div>
    </div>

    <!-- Material 预览 -->
    <div
      data-theme="material"
      class="flex flex-col gap-3 rounded-(--pui-md-sys-shape-corner-large)
             bg-(--pui-md-sys-color-surface-container-low)
             p-5 shadow-(--pui-md-sys-elevation-level1)"
    >
      <div class="flex items-center justify-between">
        <span
          class="font-(family-name:--pui-font-mono) text-[10px] uppercase tracking-[0.2em]
                 text-(--pui-md-sys-color-on-surface-variant)"
        >
          {t('previewLabelMaterial')}
        </span>
        <span
          class="font-(family-name:--pui-font-display) text-xs text-(--pui-md-sys-color-primary)"
        >
          {t('previewSystematic')}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <Button variant="filled" size="sm">{t('previewContinue')}</Button>
        <Button variant="outlined" size="sm">{t('previewCancel')}</Button>
      </div>
      <div
        class="flex items-center gap-2 text-xs text-(--pui-md-sys-color-on-surface-variant)"
      >
        <Switch defaultChecked size="sm" aria-label="Preview option" />
        <span>{t('previewLive')}</span>
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

  <div class="pui-reveal-stagger space-y-10">
    <!-- Button 矩阵 -->
    <section class="space-y-4" aria-labelledby="buttons-heading">
      <h3
        id="buttons-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Button
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <Button variant="filled">Filled</Button>
        <Button variant="elevated">Elevated</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button size="sm">Sm</Button>
        <Button size="lg">Lg</Button>
        <Button
          variant="filled"
          style="--pui-button-radius:2px;--pui-button-bg:oklch(0.4 0.16 250)"
        >
          Override
        </Button>
      </div>
    </section>

    <!-- IconButton -->
    <section class="space-y-4" aria-labelledby="icon-buttons-heading">
      <h3
        id="icon-buttons-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        IconButton
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <IconButton label="Search" variant="filled">
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
        <IconButton label="Settings" variant="tonal">
          <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
            ><circle
              cx="10"
              cy="10"
              r="2"
              stroke="currentColor"
              stroke-width="1.5"
            /><path
              d="M10 1v3M10 16v3M1 10h3M16 10h3M3.5 3.5l2 2M14.5 14.5l2 2M3.5 16.5l2-2M14.5 5.5l2-2"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            /></svg
          >
        </IconButton>
        <IconButton label="Close" variant="outlined">
          <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
            ><path
              d="M5 5l10 10M15 5l-10 10"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            /></svg
          >
        </IconButton>
        <IconButton label="Edit" variant="text">
          <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
            ><path
              d="M13.5 2.5l4 4L6 18H2v-4L13.5 2.5z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            /></svg
          >
        </IconButton>
        <IconButton label="Delete" disabled>
          <svg viewBox="0 0 20 20" width="20" aria-hidden="true"
            ><path
              d="M4 5h12M8 5V3a1 1 0 011-1h2a1 1 0 011 1v2M5 5l1 12a1 1 0 001 1h6a1 1 0 001-1l1-12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            /></svg
          >
        </IconButton>
      </div>
    </section>

    <!-- Cards -->
    <section class="space-y-4" aria-labelledby="cards-heading">
      <h3
        id="cards-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Card
      </h3>
      <div class="grid gap-4 sm:grid-cols-3">
        <Card variant="elevated" padding="md">
          {#snippet title()}<h4 class="font-semibold">{t('demoCardElevated')}</h4>{/snippet}
          <p class="text-sm text-(--pui-text-secondary)">
            {t('demoShadowRaised')}
          </p>
        </Card>
        <Card variant="filled" padding="md">
          {#snippet title()}<h4 class="font-semibold">{t('demoCardFilled')}</h4>{/snippet}
          <p class="text-sm text-(--pui-text-secondary)">{t('demoTintedBg')}</p>
        </Card>
        <Card variant="outlined" padding="md">
          {#snippet title()}<h4 class="font-semibold">{t('demoCardOutlined')}</h4>{/snippet}
          <p class="text-sm text-(--pui-text-secondary)">{t('demoBorderOnly')}</p>
        </Card>
      </div>
    </section>

    <!-- Badges + Dividers -->
    <section class="space-y-4" aria-labelledby="badges-heading">
      <h3
        id="badges-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Badge & Divider
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <Badge count={5} />
        <Badge count={100} max={99} />
        <Badge dot />
        <Badge dot tone="error" />
        <Badge tone="primary">New</Badge>
        <Badge tone="warning">Warn</Badge>
      </div>
      <Divider />
      <Divider inset />
      <Divider>Label</Divider>
      <div class="flex h-12 items-center gap-3">
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </section>

    <!-- Chips -->
    <section class="space-y-4" aria-labelledby="chips-heading">
      <h3
        id="chips-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Chip
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <Chip>Default</Chip>
        <Chip variant="outlined">Outlined</Chip>
        <Chip variant="text">Text</Chip>
        <Chip selected>Selected</Chip>
        <Chip removable>Removable</Chip>
        <Chip disabled>Disabled</Chip>
        <Chip tone="primary">Primary</Chip>
        <Chip tone="error">Error</Chip>
      </div>
    </section>

    <!-- Avatar + Kbd -->
    <section class="space-y-4" aria-labelledby="avatars-heading">
      <h3
        id="avatars-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Avatar & Kbd
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <Avatar name="John Doe" status="online" />
        <Avatar name="Jane Smith" status="busy" />
        <Avatar name="A" />
        <Avatar size="xs" name="XS" />
        <Avatar size="lg" name="LG" />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Kbd>⌘K</Kbd>
        <Kbd>Ctrl+S</Kbd>
        <Kbd style="--pui-kbd-bg:oklch(0.8 0.1 250);--pui-kbd-fg:white">
          Custom
        </Kbd>
      </div>
    </section>
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

  <div class="pui-reveal-stagger space-y-10">
    <section class="space-y-4" aria-labelledby="fields-heading">
      <h3
        id="fields-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        TextField
      </h3>
      <div class="grid gap-3 sm:grid-cols-3">
        <TextField
          label="Username"
          placeholder="Enter username"
          helperText="Display name"
        />
        <TextField label="Email" type="email" placeholder="you@example.com" />
        <TextField label="Password" type="password" defaultValue="hunter2" />
        <TextField label="With Error" error="Required" />
        <TextField label="Disabled" disabled defaultValue="Can't touch" />
        <TextField
          label="Override"
          style="--pui-field-radius:2px;--pui-field-border:deeppink"
          placeholder="Custom"
        />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="textarea-heading">
      <h3
        id="textarea-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Textarea
      </h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself"
          helperText="Brief description"
        />
        <Textarea label="With Error" error="Required" />
        <Textarea label="Disabled" disabled defaultValue="Read only" />
        <Textarea
          label="Override"
          style="--pui-field-radius:2px"
          placeholder="Custom"
        />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="checkbox-heading">
      <h3
        id="checkbox-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Checkbox
      </h3>
      <div class="flex flex-wrap gap-4">
        <Checkbox label="Accept terms" />
        <Checkbox label="Subscribe" defaultChecked />
        <Checkbox label="Disabled" disabled />
        <Checkbox
          label="Custom"
          style="--pui-checkbox-checked-bg:oklch(0.7 0.2 150)"
          defaultChecked
        />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="radio-heading">
      <h3
        id="radio-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Radio
      </h3>
      <RadioGroup label="Choose one">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" disabled />
      </RadioGroup>
    </section>

    <section class="space-y-4" aria-labelledby="switch-demo-heading">
      <h3
        id="switch-demo-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Switch
      </h3>
      <div class="flex flex-wrap gap-4">
        <Switch label="Airplane Mode" />
        <Switch label="Dark Mode" defaultChecked />
        <Switch label="Notifications" disabled />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="slider-heading">
      <h3
        id="slider-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Slider
      </h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <Slider label="Volume" showValue />
        <Slider
          label="Range"
          min={0}
          max={200}
          step={10}
          defaultValue={100}
          showValue
        />
        <Slider label="Disabled" disabled defaultValue={30} />
        <Slider
          label="Custom"
          style="--pui-slider-thumb-size:28px;--pui-slider-active-track-bg:oklch(0.7 0.2 150)"
          defaultValue={70}
          showValue
        />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="select-heading">
      <h3
        id="select-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Select & Combobox
      </h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <Select
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana' },
            { value: 'c', label: 'Cherry' },
          ]}
          label="Fruit"
        />
        <Select
          options={[
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
          label="Disabled"
          disabled
        />
        <Select
          options={[{ value: 'e', label: 'Error' }]}
          label="With Error"
          error="Required"
        />
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
    </section>

    <section class="space-y-4" aria-labelledby="search-heading">
      <h3
        id="search-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        SearchField
      </h3>
      <div class="grid gap-3 sm:grid-cols-2">
        <SearchField label="Search" />
        <SearchField label="Disabled" disabled defaultValue="No search" />
      </div>
    </section>
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

  <div class="pui-reveal-stagger space-y-10">
    <section class="space-y-4" aria-labelledby="alert-heading">
      <h3
        id="alert-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Alert & Banner
      </h3>
      <Alert tone="info">Info message.</Alert>
      <Alert tone="error" dismissible>Dismissible error.</Alert>
      <Banner tone="warning">Your session expires soon.</Banner>
    </section>

    <section class="space-y-4" aria-labelledby="progress-heading">
      <h3
        id="progress-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Progress & Spinner
      </h3>
      <Progress value={65} label="Upload" />
      <Progress indeterminate label="Loading…" />
      <div class="flex items-center gap-3">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner decorative />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="skeleton-heading">
      <h3
        id="skeleton-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Skeleton & EmptyState
      </h3>
      <div class="flex gap-3">
        <Skeleton shape="text" width="60%" />
        <Skeleton shape="circle" width="48px" height="48px" />
        <Skeleton shape="rect" height="80px" />
      </div>
      <EmptyState>
        {#snippet title()}No results{/snippet}
        <p>Try adjusting your search.</p>
      </EmptyState>
    </section>
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

  <div class="pui-reveal-stagger space-y-10">
    <section class="space-y-4" aria-labelledby="tooltip-heading">
      <h3
        id="tooltip-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Tooltip
      </h3>
      <div class="flex flex-wrap gap-3">
        <Tooltip content="Tooltip on top" placement="top">
          <Button variant="text">Top</Button>
        </Tooltip>
        <Tooltip content="On bottom" placement="bottom">
          <Button variant="text">Bottom</Button>
        </Tooltip>
        <Tooltip content="Disabled" disabled>
          <Button variant="text">Disable</Button>
        </Tooltip>
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="popover-heading">
      <h3
        id="popover-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Popover & Menu
      </h3>
      <div class="flex flex-wrap gap-3">
        <Popover>
          {#snippet trigger()}<Button variant="outlined">Open Popover</Button
            >{/snippet}
          <div class="p-2 text-sm">Popover content</div>
        </Popover>
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
    </section>

    <section class="space-y-4" aria-labelledby="dialog-heading">
      <h3
        id="dialog-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Dialog
      </h3>
      <p class="text-sm text-(--pui-text-secondary)">
        Click the button to open the dialog.
      </p>
      <Button onClick={() => (dialogOpen = true)}>Open Dialog</Button>
      <Dialog open={dialogOpen} onOpenChange={(o: boolean) => (dialogOpen = o)}>
        {#snippet title()}Confirm Action{/snippet}
        <p>Are you sure you want to proceed?</p>
        {#snippet footer()}
          <Button variant="outlined" onClick={() => (dialogOpen = false)}
            >Cancel</Button
          >
          <Button onClick={() => (dialogOpen = false)}>Confirm</Button>
        {/snippet}
      </Dialog>
    </section>
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

  <div class="pui-reveal-stagger space-y-10">
    <section class="space-y-4" aria-labelledby="tabs-heading">
      <h3
        id="tabs-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Tabs & SegmentedControl
      </h3>
      <Tabs
        items={[
          { value: 'a', label: 'Details' },
          { value: 'b', label: 'Settings' },
          { value: 'c', label: 'History' },
        ]}
      />
      <SegmentedControl
        items={[
          { value: 'd', label: 'Day' },
          { value: 'w', label: 'Week' },
          { value: 'm', label: 'Month' },
        ]}
      />
    </section>

    <section class="space-y-4" aria-labelledby="breadcrumb-heading">
      <h3
        id="breadcrumb-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Breadcrumb & Toolbar
      </h3>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: 'https://example.com/products' },
          { label: 'Details', current: true },
        ]}
      />
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
    </section>

    <section class="space-y-4" aria-labelledby="list-heading">
      <h3
        id="list-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        List & Accordion
      </h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <List variant="grouped">
          {#snippet children()}
            <ListItem title="Inbox" description="3 new" />
            <ListItem title="Sent" />
            <ListItem title="Trash" />
          {/snippet}
        </List>
        <Accordion
          items={[
            { value: '1', title: 'How to install?' },
            { value: '2', title: 'Browser support?' },
            { value: '3', title: 'Custom themes?' },
          ]}
        />
      </div>
    </section>

    <section class="space-y-4" aria-labelledby="sidebar-heading">
      <h3
        id="sidebar-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Sidebar
      </h3>
      <div
        class="h-64 overflow-hidden rounded-(--pui-radius-container) border border-(--pui-outline-subtle)"
      >
        <Sidebar>
          {#snippet header()}
            <span class="font-semibold">Files</span>
          {/snippet}
          {#snippet children()}
            <div class="flex flex-col gap-1 p-2 text-sm">
              <button
                type="button"
                class="rounded-(--pui-radius-control) px-3 py-2 text-left hover:bg-(--pui-surface-variant)"
              >
                📁 Documents
              </button>
              <button
                type="button"
                class="rounded-(--pui-radius-control) bg-(--pui-surface-variant) px-3 py-2 text-left"
              >
                📁 Downloads
              </button>
              <button
                type="button"
                class="rounded-(--pui-radius-control) px-3 py-2 text-left hover:bg-(--pui-surface-variant)"
              >
                📁 Pictures
              </button>
            </div>
          {/snippet}
        </Sidebar>
      </div>
    </section>
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

  <div class="pui-reveal-stagger space-y-10">
    <section class="space-y-4" aria-labelledby="table-heading">
      <h3
        id="table-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Table
      </h3>
      <Table striped>
        {#snippet children()}
          <thead>
            <tr>
              <th class="px-4 py-3 text-left font-medium">Name</th>
              <th class="px-4 py-3 text-left font-medium">Role</th>
              <th class="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-3">Alice</td>
              <td class="px-4 py-3">Admin</td>
              <td class="px-4 py-3"><Badge tone="primary">Active</Badge></td>
            </tr>
            <tr>
              <td class="px-4 py-3">Bob</td>
              <td class="px-4 py-3">User</td>
              <td class="px-4 py-3"><Badge tone="warning">Pending</Badge></td>
            </tr>
          </tbody>
        {/snippet}
      </Table>
    </section>

    <section class="space-y-4" aria-labelledby="calendar-heading">
      <h3
        id="calendar-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Calendar & Time
      </h3>
      <div class="grid gap-6 lg:grid-cols-2">
        <Calendar />
        <div class="space-y-4">
          <TimePicker label="Time" />
          <DateRangePicker granularity="day" label="Date Range" />
        </div>
      </div>
    </section>
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

  <div class="pui-reveal-stagger space-y-10">
    <!-- Carousel -->
    <section class="space-y-4" aria-labelledby="carousel-heading">
      <h3
        id="carousel-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Carousel
      </h3>
      <Carousel
        slides={[
          { id: 'a', alt: 'Slide A' },
          { id: 'b', alt: 'Slide B' },
          { id: 'c', alt: 'Slide C' },
        ]}
      />
    </section>

    <!-- Chart -->
    <section class="space-y-4" aria-labelledby="chart-heading">
      <h3
        id="chart-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Chart
      </h3>
      <Chart
        kind="line"
        labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
        series={[
          { name: 'Revenue', data: [120, 200, 180, 240, 220, 300] },
          { name: 'Profit', data: [40, 60, 55, 80, 70, 95] },
        ]}
      />
    </section>

    <!-- CodeBlock + Stack -->
    <section class="space-y-4" aria-labelledby="code-heading">
      <h3
        id="code-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        CodeBlock &amp; Stack
      </h3>
      <Stack direction="row" gap={4} wrap="wrap">
        <div class="min-w-65 flex-1">
          <CodeBlock
            code={`import { Button } from '@persona-ui/lib';
<Button variant="filled">Hello</Button>`}
            language="ts"
            filename="example.ts"
          />
        </div>
        <div class="min-w-50 flex-1">
          <CodeBlock
            code={`function add(a, b) {
  return a + b;
}`}
            language="js"
            showLineNumbers
          />
        </div>
      </Stack>
    </section>

    <!-- ColorPicker + Rating + InputOTP -->
    <section class="space-y-4" aria-labelledby="inputs-heading">
      <h3
        id="inputs-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Color, Rating &amp; OTP
      </h3>
      <Stack direction="row" gap={6} wrap="wrap" align="start">
        <div class="space-y-2">
          <span class="text-xs text-(--pui-text-secondary)">ColorPicker</span>
          <ColorPicker defaultValue="#5b8def" />
        </div>
        <div class="space-y-2">
          <span class="text-xs text-(--pui-text-secondary)">Rating</span>
          <Rating defaultValue={3.5} allowHalf />
        </div>
        <div class="space-y-2">
          <span class="text-xs text-(--pui-text-secondary)">InputOTP</span>
          <InputOTP length={6} defaultValue="123456" />
        </div>
      </Stack>
    </section>

    <!-- Stepper + Timeline -->
    <section class="space-y-4" aria-labelledby="flow-heading">
      <h3
        id="flow-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Stepper &amp; Timeline
      </h3>
      <Stepper
        defaultValue={1}
        steps={[
          { label: 'Cart' },
          { label: 'Shipping' },
          { label: 'Payment' },
          { label: 'Review' },
        ]}
      />
      <Timeline
        items={[
          { title: 'Order placed', timestamp: '2024-01-15 10:32', status: 'success' },
          { title: 'Paid', timestamp: '2024-01-15 10:33', status: 'success' },
          { title: 'Shipped', timestamp: '2024-01-16 09:00', status: 'info' },
          { title: 'Delivered', timestamp: 'Pending', status: 'default' },
        ]}
      />
    </section>

    <!-- HoverCard + InputGroup + Pagination -->
    <section class="space-y-4" aria-labelledby="input-extras-heading">
      <h3
        id="input-extras-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        HoverCard, InputGroup &amp; Pagination
      </h3>
      <Stack direction="row" gap={4} wrap="wrap" align="start">
        <HoverCard>
          {#snippet content()}
            <p class="text-sm">Hover cards surface rich content on demand — without leaving the page.</p>
          {/snippet}
          <Button variant="text">Hover me</Button>
        </HoverCard>
        <InputGroup>
          {#snippet leading()}
            <span class="text-sm text-(--pui-text-secondary)">https://</span>
          {/snippet}
          <TextField placeholder="your-domain" />
        </InputGroup>
      </Stack>
      <Pagination total={12} defaultValue={5} />
    </section>

    <!-- Sheet + Drawer + ConfirmDialog + Tour -->
    <section class="space-y-4" aria-labelledby="overlays-extras-heading">
      <h3
        id="overlays-extras-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        Sheet, Drawer &amp; Confirm
      </h3>
      <Stack direction="row" gap={3} wrap="wrap">
        <Button
          variant="outlined"
          onclick={() => (sheetOpen = true)}
        >
          Open Sheet
        </Button>
        <Button
          variant="outlined"
          onclick={() => (drawerOpen = true)}
        >
          Open Drawer
        </Button>
        <Button
          variant="tonal"
          onclick={() => (confirmOpen = true)}
        >
          Confirm
        </Button>
      </Stack>
    </section>

    <Sheet open={sheetOpen} onOpenChange={(o: boolean) => (sheetOpen = o)}>
      {#snippet title()}<span>Sheet Title</span>{/snippet}
      <p class="text-sm">Sheet content slides in from the bottom.</p>
    </Sheet>

    <Drawer open={drawerOpen} onOpenChange={(o: boolean) => (drawerOpen = o)}>
      {#snippet title()}<span>Drawer Title</span>{/snippet}
      <p class="text-sm">Drawer content slides in from the left.</p>
    </Drawer>

    <ConfirmDialog
      open={confirmOpen}
      onOpenChange={(o: boolean) => (confirmOpen = o)}
      title="Delete this item?"
      description="This action cannot be undone."
      tone="danger"
      onConfirm={() => (confirmOpen = false)}
    />

    <!-- DataTable + NavigationRail + TreeView + VirtualList -->
    <section class="space-y-4" aria-labelledby="data-extras-heading">
      <h3
        id="data-extras-heading"
        class="font-(family-name:--pui-font-display) text-xl font-normal tracking-[-0.01em]
               text-(--pui-text-primary)"
      >
        DataTable, NavigationRail, TreeView &amp; VirtualList
      </h3>
      <div class="grid gap-4 lg:grid-cols-2">
        <DataTable
          data={[
            { name: 'Alice', role: 'Admin', status: 'active' },
            { name: 'Bob', role: 'User', status: 'pending' },
            { name: 'Carol', role: 'User', status: 'active' },
          ]}
          columns={[
            { key: 'name', header: 'Name', sortable: true },
            { key: 'role', header: 'Role' },
            { key: 'status', header: 'Status' },
          ]}
        />
        <NavigationRail
          defaultValue="home"
          items={[
            { value: 'home', label: 'Home' },
            { value: 'search', label: 'Search' },
            { value: 'profile', label: 'Profile' },
            { value: 'settings', label: 'Settings' },
          ]}
        />
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <TreeView
          nodes={[
            {
              id: '1',
              label: 'src',
              children: [
                { id: '1.1', label: 'components' },
                { id: '1.2', label: 'lib' },
                { id: '1.3', label: 'routes' },
              ],
            },
            { id: '2', label: 'package.json' },
            { id: '3', label: 'README.md' },
          ]}
        />
        <div class="h-48 overflow-hidden rounded-(--pui-radius-control) border border-(--pui-outline-subtle)">
          <VirtualList
            itemCount={1000}
            itemHeight={32}
            height={192}
          >
            {#snippet item(p)}
              <div class="flex items-center px-3 text-sm">Item {p.index + 1}</div>
            {/snippet}
          </VirtualList>
        </div>
      </div>
    </section>
  </div>
</section>