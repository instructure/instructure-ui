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

export {
  AccessibleContent,
  Dialog,
  PresentationContent,
  ScreenReaderContent
} from '@instructure/ui-a11y'
export { Alert } from '@instructure/ui-alerts'
export { Billboard } from '@instructure/ui-billboard'
export { Button, CloseButton } from '@instructure/ui-buttons'
export { Calendar } from '@instructure/ui-calendar'
export { CodeEditor } from '@instructure/ui-code-editor'
export { Editable, InPlaceEdit } from '@instructure/ui-editable'
export {
  Avatar,
  Badge,
  Heading,
  Img,
  Link,
  Pill,
  Progress,
  Rating,
  Spinner,
  Table,
  Tag,
  Text,
  TruncateText
} from '@instructure/ui-elements'
export { Focusable, FocusableView } from '@instructure/ui-focusable'
export {
  Checkbox,
  CheckboxGroup,
  DateInput,
  DateTimeInput,
  FileDrop,
  RadioInput,
  RadioInputGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
  TimeInput
 } from '@instructure/ui-forms'
export { NumberInput } from '@instructure/ui-number-input'
export { DateInput as DateInputControlled } from '@instructure/ui-date-input'
export { TextInput as TextInputControlled } from '@instructure/ui-text-input'
 export {
  FormField,
  FormFieldLabel,
  FormFieldMessage,
  FormFieldMessages,
  FormFieldLayout,
  FormFieldGroup,
} from '@instructure/ui-form-field'
export { Table as TableControlled } from '@instructure/ui-table'
export { ApplyLocale, ApplyTextDirection } from '@instructure/ui-i18n'
export {
  ContextView,
  Media,
  Responsive,
  View
} from '@instructure/ui-layout'
export { Transition } from '@instructure/ui-motion'
export {
  Mask,
  Overlay,
  Tooltip,
  Tray
} from '@instructure/ui-overlays'
export { Portal } from '@instructure/ui-portal'
export { Selectable } from '@instructure/ui-selectable'
export { ApplyTheme } from '@instructure/ui-themeable'
export { InlineSVG, SVGIcon } from '@instructure/ui-svg-images'
export { Tabs } from '@instructure/ui-tabs'
export { Expandable, ToggleDetails, ToggleGroup } from '@instructure/ui-toggle-details'
export { TreeBrowser } from '@instructure/ui-tree-browser'
export * from '@instructure/ui-icons'

export { Guidelines } from '@instructure/ui-docs-client'

// TODO: when we split these out into their own packages we should always export a single component
// e.g. (Flex.Item, Grid.Row, List.Item)
export { Flex, FlexItem } from '@instructure/ui-layout/lib/Flex'
export { DrawerLayout, DrawerContent, DrawerTray } from '@instructure/ui-layout/lib/DrawerLayout'
export { Grid, GridRow, GridCol } from '@instructure/ui-layout/lib/Grid'
export { Position, PositionTarget, PositionContent } from '@instructure/ui-layout/lib/Position'
export { Navigation, NavigationItem } from '@instructure/ui-navigation/lib/Navigation'
export { Menu, MenuItem, MenuItemGroup, MenuItemSeparator } from '@instructure/ui-menu/lib/Menu'
export { Pagination, PaginationButton } from '@instructure/ui-pagination/lib/Pagination'
export { TabList, TabPanel } from '@instructure/ui-tabs/lib/TabList'
export { Pages, Page } from '@instructure/ui-pages/lib/Pages'
export { Modal, ModalHeader, ModalBody, ModalFooter } from '@instructure/ui-overlays/lib/Modal'
export { Popover, PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/Popover'
export { List, ListItem } from '@instructure/ui-elements/lib/List'
export { MetricsList, MetricsListItem } from '@instructure/ui-elements/lib/MetricsList'
export { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb/lib/Breadcrumb'

export { Figure, FigureItem } from '@instructure/ui-docs-client/lib/Figure'
