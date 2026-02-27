/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export { InstUISettingsProvider, withStyle } from '@instructure/emotion'
export {
  AccessibleContent,
  PresentationContent,
  ScreenReaderContent
} from '@instructure/ui-a11y-content'
export type {
  AccessibleContentProps,
  ScreenReaderContentProps,
  PresentationContentProps
} from '@instructure/ui-a11y-content'
export { Alert } from '@instructure/ui-alerts/v11_5'
export type { AlertProps } from '@instructure/ui-alerts/v11_5'
export { Avatar } from '@instructure/ui-avatar/v11_5'
export type { AvatarProps } from '@instructure/ui-avatar/v11_5'
export { Badge } from '@instructure/ui-badge/v11_5'
export type { BadgeProps } from '@instructure/ui-badge/v11_5'
export { Billboard } from '@instructure/ui-billboard/v11_5'
export type { BillboardProps } from '@instructure/ui-billboard/v11_5'
export { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb/v11_5'
export type {
  BreadcrumbProps,
  BreadcrumbLinkProps
} from '@instructure/ui-breadcrumb/v11_5'
export {
  BaseButton,
  Button,
  CloseButton,
  CondensedButton,
  IconButton,
  ToggleButton
} from '@instructure/ui-buttons/v11_5'
export type {
  BaseButtonOwnProps,
  ButtonProps,
  BaseButtonProps,
  ToggleButtonProps,
  CloseButtonProps,
  CondensedButtonProps,
  IconButtonProps
} from '@instructure/ui-buttons/v11_5'
export { Byline } from '@instructure/ui-byline/v11_5'
export type { BylineProps } from '@instructure/ui-byline/v11_5'
export { Calendar, CalendarDay } from '@instructure/ui-calendar/v11_5'
export type {
  CalendarDayProps,
  CalendarProps
} from '@instructure/ui-calendar/v11_5'
export {
  Checkbox,
  CheckboxGroup,
  CheckboxFacade,
  ToggleFacade
} from '@instructure/ui-checkbox/v11_5'
export type {
  CheckboxFacadeProps,
  ToggleFacadeProps,
  CheckboxGroupProps,
  CheckboxProps
} from '@instructure/ui-checkbox/v11_5'
export {
  ColorPicker,
  ColorMixer,
  ColorPreset,
  ColorContrast,
  ColorIndicator
} from '@instructure/ui-color-picker/v11_5'
export type {
  ColorContrastProps,
  ColorIndicatorProps,
  ColorMixerProps,
  ColorPickerProps,
  ColorPresetProps
} from '@instructure/ui-color-picker/v11_5'
export { DateInput, DateInput2 } from '@instructure/ui-date-input/v11_5'
export type {
  DateInputProps,
  DateInput2Props
} from '@instructure/ui-date-input/v11_5'
export { DateTimeInput } from '@instructure/ui-date-time-input/v11_5'
export { Dialog } from '@instructure/ui-dialog'
export type { DialogProps } from '@instructure/ui-dialog'
export {
  DrawerLayout,
  DrawerContent,
  DrawerTray
} from '@instructure/ui-drawer-layout/v11_5'
export type {
  DrawerLayoutProps,
  DrawerLayoutContentProps,
  DrawerLayoutTrayProps
} from '@instructure/ui-drawer-layout/v11_5'
export {
  Drilldown,
  DrilldownGroup,
  DrilldownOption,
  DrilldownPage,
  DrilldownSeparator
} from '@instructure/ui-drilldown/v11_5'
export type {
  DrilldownGroupChild,
  DrilldownGroupProps,
  DrilldownOptionChild,
  DrilldownOptionProps,
  DrilldownPageChild,
  DrilldownPageChildren,
  DrilldownPageProps,
  DrilldownProps,
  DrilldownSeparatorChild,
  DrilldownSeparatorProps
} from '@instructure/ui-drilldown/v11_5'
export { Editable, InPlaceEdit } from '@instructure/ui-editable/v11_5'
export type {
  EditableProps,
  InPlaceEditProps
} from '@instructure/ui-editable/v11_5'
export { Expandable } from '@instructure/ui-expandable'
export type {
  ExpandableProps,
  RenderExpandable,
  ExpandableToggleProps
} from '@instructure/ui-expandable'
export { FileDrop } from '@instructure/ui-file-drop/v11_5'
export type { FileDropProps } from '@instructure/ui-file-drop/v11_5'
export { Flex, FlexItem } from '@instructure/ui-flex/v11_5'
export type { FlexProps, FlexItemProps } from '@instructure/ui-flex/v11_5'
export { Focusable } from '@instructure/ui-focusable'
export type { FocusableProps } from '@instructure/ui-focusable'
export {
  FormField,
  FormFieldLabel,
  FormFieldMessage,
  FormFieldMessages,
  FormFieldLayout,
  FormFieldGroup
} from '@instructure/ui-form-field/v11_5'
export type {
  FormFieldGroupProps,
  FormFieldMessageProps,
  FormFieldLabelProps,
  FormFieldMessagesProps,
  FormFieldLayoutProps,
  FormFieldOwnProps,
  FormFieldProps,
  FormMessage,
  FormMessageType
} from '@instructure/ui-form-field/v11_5'
export { Grid, GridRow, GridCol } from '@instructure/ui-grid/v11_5'
export type {
  GridProps,
  GridRowProps,
  GridColProps,
  GridBreakpoints
} from '@instructure/ui-grid/v11_5'
export { Heading } from '@instructure/ui-heading/v11_5'
export type { HeadingProps } from '@instructure/ui-heading/v11_5'
export {
  ApplyLocale,
  TextDirectionContext,
  ApplyLocaleContext,
  textDirectionContextConsumer,
  DateTime,
  getTextDirection,
  Locale,
  DIRECTION
} from '@instructure/ui-i18n'
export type {
  Moment,
  TextDirectionContextConsumerProps,
  ApplyLocaleProps
} from '@instructure/ui-i18n'
export * from '@instructure/ui-icons'
export { Img } from '@instructure/ui-img/v11_5'
export type { ImgProps } from '@instructure/ui-img/v11_5'
export {
  NutritionFacts,
  DataPermissionLevels,
  AiInformation
} from '@instructure/ui-instructure/v11_5'
export type {
  NutritionFactsProps,
  DataPermissionLevelsProps,
  AiInformationProps
} from '@instructure/ui-instructure/v11_5'
export { Link } from '@instructure/ui-link/v11_5'
export type { LinkProps } from '@instructure/ui-link/v11_5'
export {
  List,
  ListItem,
  InlineList,
  InlineListItem
} from '@instructure/ui-list/v11_5'
export type {
  ListProps,
  ListItemProps,
  InlineListProps,
  InlineListItemProps
} from '@instructure/ui-list/v11_5'
export {
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemSeparator
} from '@instructure/ui-menu/v11_5'
export type {
  MenuProps,
  MenuItemProps,
  MenuGroupProps,
  MenuSeparatorProps
} from '@instructure/ui-menu/v11_5'
export { MetricGroup, Metric } from '@instructure/ui-metric/v11_5'
export type {
  MetricGroupProps,
  MetricProps
} from '@instructure/ui-metric/v11_5'
export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@instructure/ui-modal/v11_5'
export type {
  ModalProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps
} from '@instructure/ui-modal/v11_5'
export { Transition, BaseTransition } from '@instructure/ui-motion'
export type {
  TransitionProps,
  TransitionType,
  BaseTransitionStatesType
} from '@instructure/ui-motion'
export { AppNav, AppNavItem } from '@instructure/ui-navigation/v11_5'
export type {
  AppNavProps,
  AppNavItemProps
} from '@instructure/ui-navigation/v11_5'
export { NumberInput } from '@instructure/ui-number-input/v11_5'
export type { NumberInputProps } from '@instructure/ui-number-input/v11_5'
export {
  Options,
  OptionSeparator,
  OptionItem,
  optionsThemeGenerator,
  optionsItemThemeGenerator,
  optionsSeparatorThemeGenerator
} from '@instructure/ui-options'
export type {
  OptionsItemProps,
  OptionsItemRenderProps,
  OptionsProps,
  OptionsSeparatorProps
} from '@instructure/ui-options'
export { Mask, Overlay } from '@instructure/ui-overlays/v11_5'
export type { MaskProps, OverlayProps } from '@instructure/ui-overlays/v11_5'
export { Pages, PagesPage } from '@instructure/ui-pages/v11_5'
export type { PagesPageProps, PagesProps } from '@instructure/ui-pages/v11_5'
export { Pagination, PaginationButton } from '@instructure/ui-pagination/v11_5'
export type {
  PaginationNavigationProps,
  PaginationPageProps,
  PaginationProps
} from '@instructure/ui-pagination/v11_5'
export { Pill } from '@instructure/ui-pill/v11_5'
export type { PillProps } from '@instructure/ui-pill/v11_5'
export { Popover } from '@instructure/ui-popover/v11_5'
export type {
  PopoverProps,
  PopoverOwnProps
} from '@instructure/ui-popover/v11_5'
export { Portal } from '@instructure/ui-portal'
export type { PortalProps, PortalNode } from '@instructure/ui-portal'
export {
  Position,
  calculateElementPosition,
  executeMirrorFunction,
  mirrorHorizontalPlacement,
  mirrorPlacement,
  parsePlacement
} from '@instructure/ui-position'
export type {
  PositionConstraint,
  PositionObject,
  PositionProps,
  PlacementPropValues,
  PositionMountNode
} from '@instructure/ui-position'
export { ProgressBar, ProgressCircle } from '@instructure/ui-progress/v11_5'
export type {
  ProgressBarProps,
  ProgressCircleProps
} from '@instructure/ui-progress/v11_5'
export { RadioInput, RadioInputGroup } from '@instructure/ui-radio-input/v11_5'
export type {
  RadioInputProps,
  RadioInputGroupProps
} from '@instructure/ui-radio-input/v11_5'
export { RangeInput } from '@instructure/ui-range-input/v11_5'
export type { RangeInputProps } from '@instructure/ui-range-input/v11_5'
export { Rating, RatingIcon } from '@instructure/ui-rating/v11_5'
export type { RatingIconProps, RatingProps } from '@instructure/ui-rating/v11_5'
export {
  Responsive,
  ResponsivePropTypes,
  addElementQueryMatchListener,
  addMediaQueryMatchListener,
  parseQuery,
  jsonToMediaQuery
} from '@instructure/ui-responsive/v11_5'
export type {
  ResponsiveProps,
  ResponsivePropsObject,
  BreakpointQueries,
  QueriesMatching,
  Query,
  ResponsiveByBreakpointProps,
  ValidQueryKey
} from '@instructure/ui-responsive/v11_5'
export { Select, SelectGroup, SelectOption } from '@instructure/ui-select/v11_5'
export type {
  SelectOwnProps,
  SelectGroupProps,
  SelectOptionProps,
  SelectProps
} from '@instructure/ui-select/v11_5'
export { Selectable } from '@instructure/ui-selectable'
export type {
  SelectableRender,
  SelectableProps
} from '@instructure/ui-selectable'
export { SideNavBar, SideNavBarItem } from '@instructure/ui-side-nav-bar/v11_5'
export type {
  SideNavBarProps,
  SideNavBarItemProps
} from '@instructure/ui-side-nav-bar/v11_5'
export {
  SimpleSelect,
  SimpleSelectOption,
  SimpleSelectGroup
} from '@instructure/ui-simple-select/v11_5'
export type {
  SimpleSelectProps,
  SimpleSelectGroupProps,
  SimpleSelectOptionProps
} from '@instructure/ui-simple-select/v11_5'
export { SourceCodeEditor } from '@instructure/ui-source-code-editor/v11_5'
export type { SourceCodeEditorProps } from '@instructure/ui-source-code-editor/v11_5'
export { Spinner } from '@instructure/ui-spinner/v11_5'
export type { SpinnerProps } from '@instructure/ui-spinner/v11_5'
export { InlineSVG, SVGIcon } from '@instructure/ui-svg-images'
export type { InlineSVGProps, SVGIconProps } from '@instructure/ui-svg-images'
export {
  Table,
  TableContext,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableColHeader,
  TableRowHeader
} from '@instructure/ui-table/v11_5'
export type {
  TableBodyProps,
  TableCellProps,
  TableProps,
  TableColHeaderProps,
  TableHeadProps,
  TableRowHeaderProps,
  TableRowProps
} from '@instructure/ui-table/v11_5'
export { Tabs, TabsPanel, TabsTab } from '@instructure/ui-tabs/v11_5'
export type {
  TabsTabProps,
  TabsPanelProps,
  TabsProps
} from '@instructure/ui-tabs/v11_5'
export { Tag } from '@instructure/ui-tag/v11_5'
export type { TagProps } from '@instructure/ui-tag/v11_5'
export { Text } from '@instructure/ui-text/v11_5'
export type { TextProps } from '@instructure/ui-text/v11_5'
export { TextArea } from '@instructure/ui-text-area/v11_5'
export type { TextAreaProps } from '@instructure/ui-text-area/v11_5'
export { TextInput } from '@instructure/ui-text-input/v11_5'
export type { TextInputProps } from '@instructure/ui-text-input/v11_5'
export {
  canvas,
  canvasHighContrast,
  primitives,
  additionalPrimitives,
  dataVisualization
} from '@instructure/ui-themes'
export type {
  ThemeMap,
  BaseTheme,
  Theme,
  ThemeKeys,
  ThemeSpecificStyle,
  CanvasTheme,
  CanvasBrandVariables,
  CanvasHighContrastTheme,
  Primitives,
  AdditionalPrimitives,
  DataVisualization,
  UI
} from '@instructure/ui-themes'
export { TimeSelect } from '@instructure/ui-time-select/v11_5'
export type { TimeSelectProps } from '@instructure/ui-time-select/v11_5'
export {
  ToggleDetails,
  ToggleGroup
} from '@instructure/ui-toggle-details/v11_5'
export type {
  ToggleDetailsProps,
  ToggleGroupProps
} from '@instructure/ui-toggle-details/v11_5'
export { Tooltip } from '@instructure/ui-tooltip/v11_5'
export type {
  TooltipProps,
  TooltipRenderChildrenArgs
} from '@instructure/ui-tooltip/v11_5'
export {
  TopNavBar,
  TopNavBarActionItems,
  TopNavBarBrand,
  TopNavBarBreadcrumb,
  TopNavBarItem,
  TopNavBarLayout,
  TopNavBarMenuItems,
  TopNavBarUser
} from '@instructure/ui-top-nav-bar/v11_5'
export type {
  TopNavBarProps,
  TopNavBarOwnProps,
  TopNavBarActionItemsProps,
  TopNavBarActionItemsOwnProps,
  TopNavBarBrandProps,
  TopNavBarBrandOwnProps,
  TopNavBarItemProps,
  TopNavBarItemOwnProps,
  TopNavBarItemTooltipType,
  TopNavBarLayoutProps,
  CommonTopNavBarLayoutProps,
  TopNavBarDesktopLayoutProps,
  TopNavBarDesktopLayoutOwnProps,
  DesktopLayoutOwnProps,
  TopNavBarSmallViewportLayoutProps,
  TopNavBarSmallViewportLayoutOwnProps,
  SmallViewportLayoutOwnProps,
  TopNavBarMenuItemsProps,
  TopNavBarMenuItemsOwnProps,
  TopNavBarUserProps,
  TopNavBarUserOwnProps
} from '@instructure/ui-top-nav-bar/v11_5'
export { Tray } from '@instructure/ui-tray/v11_5'
export type { TrayProps } from '@instructure/ui-tray/v11_5'
export {
  TreeBrowser,
  TreeNode,
  TreeButton,
  TreeCollection
} from '@instructure/ui-tree-browser/v11_5'
export type {
  TreeBrowserButtonProps,
  TreeBrowserProps,
  TreeBrowserCollectionProps,
  TreeBrowserNodeProps
} from '@instructure/ui-tree-browser/v11_5'
export { TruncateList } from '@instructure/ui-truncate-list'
export type { TruncateListProps } from '@instructure/ui-truncate-list'
export { TruncateText } from '@instructure/ui-truncate-text/v11_5'
export type { TruncateTextProps } from '@instructure/ui-truncate-text/v11_5'
export { View, ContextView } from '@instructure/ui-view/v11_5'
export type {
  ViewProps,
  ContextViewProps,
  ViewOwnProps
} from '@instructure/ui-view/v11_5'
