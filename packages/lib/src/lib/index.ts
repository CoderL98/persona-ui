// Persona UI — Svelte 5 dual-personality component library

// Components
export { default as Button } from "./components/button/Button.svelte";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/button/button.types.js";

export { default as Card } from "./components/card/Card.svelte";
export type {
  CardProps,
  CardVariant,
  CardPadding,
} from "./components/card/card.types.js";

export { default as TextField } from "./components/text-field/TextField.svelte";
export type { TextFieldProps } from "./components/text-field/text-field.types.js";

export { default as Switch } from "./components/switch/Switch.svelte";
export type { SwitchProps } from "./components/switch/switch.types.js";

export { default as IconButton } from "./components/icon-button/IconButton.svelte";
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
} from "./components/icon-button/icon-button.types.js";

export { default as Divider } from "./components/divider/Divider.svelte";
export type {
  DividerProps,
  DividerOrientation,
} from "./components/divider/divider.types.js";

export { default as Badge } from "./components/badge/Badge.svelte";
export type {
  BadgeProps,
  BadgeTone,
  BadgeSize,
} from "./components/badge/badge.types.js";

export { default as Chip } from "./components/chip/Chip.svelte";
export type {
  ChipProps,
  ChipVariant,
  ChipTone,
} from "./components/chip/chip.types.js";

export { default as Avatar } from "./components/avatar/Avatar.svelte";
export type {
  AvatarProps,
  AvatarSize,
  AvatarStatus,
} from "./components/avatar/avatar.types.js";

export { default as Kbd } from "./components/kbd/Kbd.svelte";
export type { KbdProps } from "./components/kbd/kbd.types.js";

export { default as Textarea } from "./components/textarea/Textarea.svelte";
export type {
  TextareaProps,
  TextareaResize,
} from "./components/textarea/textarea.types.js";

export { default as Checkbox } from "./components/checkbox/Checkbox.svelte";
export type { CheckboxProps } from "./components/checkbox/checkbox.types.js";

export { default as RadioGroup } from "./components/radio/RadioGroup.svelte";
export type {
  RadioGroupProps,
  RadioGroupOrientation,
} from "./components/radio/radio.types.js";
export { default as Radio } from "./components/radio/Radio.svelte";
export type { RadioProps } from "./components/radio/radio.types.js";

export { default as Slider } from "./components/slider/Slider.svelte";
export type { SliderProps } from "./components/slider/slider.types.js";

export { default as Select } from "./components/select/Select.svelte";
export type {
  SelectProps,
  SelectOption,
} from "./components/select/select.types.js";

export { default as Listbox } from "./components/listbox/Listbox.svelte";
export type {
  ListboxProps,
  ListboxOption,
} from "./components/listbox/listbox.types.js";

export { default as Combobox } from "./components/combobox/Combobox.svelte";
export type {
  ComboboxProps,
  ComboboxOption,
} from "./components/combobox/combobox.types.js";

export { default as SearchField } from "./components/search-field/SearchField.svelte";
export type { SearchFieldProps } from "./components/search-field/search-field.types.js";

export { default as Alert } from "./components/alert/Alert.svelte";
export type {
  AlertProps,
  AlertTone,
  AlertVariant,
} from "./components/alert/alert.types.js";

export { default as Banner } from "./components/banner/Banner.svelte";
export type {
  BannerProps,
  BannerTone,
} from "./components/banner/banner.types.js";

export { default as Toast } from "./components/toast/Toast.svelte";
export type { ToastProps, ToastTone } from "./components/toast/toast.types.js";
export { default as ToastViewport } from "./components/toast/ToastViewport.svelte";
export type { ToastViewportProps } from "./components/toast/toast.types.js";

export { default as Progress } from "./components/progress/Progress.svelte";
export type { ProgressProps } from "./components/progress/progress.types.js";

export { default as Spinner } from "./components/spinner/Spinner.svelte";
export type {
  SpinnerProps,
  SpinnerSize,
} from "./components/spinner/spinner.types.js";

export { default as Skeleton } from "./components/skeleton/Skeleton.svelte";
export type {
  SkeletonProps,
  SkeletonShape,
} from "./components/skeleton/skeleton.types.js";

export { default as EmptyState } from "./components/empty-state/EmptyState.svelte";
export type { EmptyStateProps } from "./components/empty-state/empty-state.types.js";

export { default as Tooltip } from "./components/tooltip/Tooltip.svelte";
export type {
  TooltipProps,
  TooltipPlacement,
} from "./components/tooltip/tooltip.types.js";

export { default as Popover } from "./components/popover/Popover.svelte";
export type {
  PopoverProps,
  PopoverPlacement,
} from "./components/popover/popover.types.js";

export { default as Menu } from "./components/menu/Menu.svelte";
export type { MenuProps, MenuItem } from "./components/menu/menu.types.js";

export { default as Dialog } from "./components/dialog/Dialog.svelte";
export type { DialogProps } from "./components/dialog/dialog.types.js";

export { default as Sheet } from "./components/sheet/Sheet.svelte";
export type { SheetProps, SheetSide } from "./components/sheet/sheet.types.js";

export { default as Drawer } from "./components/drawer/Drawer.svelte";
export type {
  DrawerProps,
  DrawerSide,
} from "./components/drawer/drawer.types.js";

export { default as Tabs } from "./components/tabs/Tabs.svelte";
export type { TabsProps, TabItem } from "./components/tabs/tabs.types.js";

export { default as SegmentedControl } from "./components/segmented-control/SegmentedControl.svelte";
export type {
  SegmentedControlProps,
  SegmentItem,
} from "./components/segmented-control/segmented-control.types.js";

export { default as Breadcrumb } from "./components/breadcrumb/Breadcrumb.svelte";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
} from "./components/breadcrumb/breadcrumb.types.js";

export { default as Toolbar } from "./components/toolbar/Toolbar.svelte";
export type { ToolbarProps } from "./components/toolbar/toolbar.types.js";

export { default as NavigationRail } from "./components/navigation-rail/NavigationRail.svelte";
export type {
  NavigationRailProps,
  NavigationRailItem,
} from "./components/navigation-rail/navigation-rail.types.js";

export { default as Sidebar } from "./components/sidebar/Sidebar.svelte";
export type { SidebarProps } from "./components/sidebar/sidebar.types.js";

export { default as List } from "./components/list/List.svelte";
export type { ListProps } from "./components/list/list.types.js";
export { default as ListItem } from "./components/list/ListItem.svelte";
export type { ListItemProps } from "./components/list/list.types.js";

export { default as Accordion } from "./components/accordion/Accordion.svelte";
export type {
  AccordionProps,
  AccordionItem,
} from "./components/accordion/accordion.types.js";

export { default as Table } from "./components/table/Table.svelte";
export type { TableProps } from "./components/table/table.types.js";

export { default as DataTable } from "./components/data-table/DataTable.svelte";
export type {
  DataTableProps,
  DataTableColumn,
} from "./components/data-table/data-table.types.js";

export { default as Calendar } from "./components/calendar/Calendar.svelte";
export type { CalendarProps } from "./components/calendar/calendar.types.js";

export { default as DatePicker } from "./components/date-picker/DatePicker.svelte";
export type { DatePickerProps } from "./components/date-picker/date-picker.types.js";

export { default as CommandPalette } from "./components/command-palette/CommandPalette.svelte";
export type {
  CommandPaletteProps,
  CommandItem,
} from "./components/command-palette/command-palette.types.js";

export { default as TreeView } from "./components/tree-view/TreeView.svelte";
export type {
  TreeViewProps,
  TreeNode,
} from "./components/tree-view/tree-view.types.js";

// ── Time / Date Range ──
export { default as TimePicker } from "./components/time-picker/TimePicker.svelte";
export type { TimePickerProps, TimePickerFormat } from "./components/time-picker/time-picker.types.js";

export { default as DateRangePicker } from "./components/date-range-picker/DateRangePicker.svelte";
export type { DateRangePickerProps, DateRangeValue } from "./components/date-range-picker/date-range-picker.types.js";

// Internal utilities (public for advanced use)
export { cn } from "./internal/class.js";
export { dataAttrs } from "./internal/attrs.js";

// ── Form (M3 batch 1) ──
export { default as Form } from "./components/form/Form.svelte";
export { default as FormField } from "./components/form/FormField.svelte";
export type { FormProps, FormLayout } from "./components/form/form.types.js";

export { default as FileUpload } from "./components/file-upload/FileUpload.svelte";
export type {
  FileUploadProps,
  FileUploadFile,
  FileUploadStatus,
} from "./components/file-upload/file-upload.types.js";

export { default as InputOTP } from "./components/input-otp/InputOTP.svelte";
export type { InputOTPProps } from "./components/input-otp/input-otp.types.js";

// ── Data Viz & Navigation (M3 batch 2) ──
export { default as Chart } from "./components/chart/Chart.svelte";
export type {
  ChartProps,
  ChartKind,
  ChartSeries,
  ChartDataPoint,
} from "./components/chart/chart.types.js";

export { default as Pagination } from "./components/pagination/Pagination.svelte";
export type { PaginationProps } from "./components/pagination/pagination.types.js";

export { default as Stepper } from "./components/stepper/Stepper.svelte";
export type {
  StepperProps,
  StepperStep,
  StepperOrientation,
} from "./components/stepper/stepper.types.js";
