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

import * as DefaultComponents from './components'

// === v11_6 overrides ===
// Only the components that differ from the default (v11_5) exports.
// These packages export a v2 (functional) component in v11_6.
import { Avatar as Avatar_v11_6 } from '@instructure/ui-avatar/v11_6'
import { Badge as Badge_v11_6 } from '@instructure/ui-badge/v11_6'
import { Billboard as Billboard_v11_6 } from '@instructure/ui-billboard/v11_6'
import { Breadcrumb as Breadcrumb_v11_6 } from '@instructure/ui-breadcrumb/v11_6'
import { Calendar as Calendar_v11_6 } from '@instructure/ui-calendar/v11_6'
import {
  DateInput as DateInput_v11_6,
  DateInput2 as DateInput2_v11_6
} from '@instructure/ui-date-input/v11_6'
import { FileDrop as FileDrop_v11_6 } from '@instructure/ui-file-drop/v11_6'
import { Flex as Flex_v11_6 } from '@instructure/ui-flex/v11_6'
import {
  FormField as FormField_v11_6,
  FormFieldLabel as FormFieldLabel_v11_6,
  FormFieldMessage as FormFieldMessage_v11_6,
  FormFieldMessages as FormFieldMessages_v11_6,
  FormFieldLayout as FormFieldLayout_v11_6,
  FormFieldGroup as FormFieldGroup_v11_6
} from '@instructure/ui-form-field/v11_6'
import { Grid as Grid_v11_6 } from '@instructure/ui-grid/v11_6'
import { Heading as Heading_v11_6 } from '@instructure/ui-heading/v11_6'
import { Link as Link_v11_6 } from '@instructure/ui-link/v11_6'
import {
  List as List_v11_6,
  InlineList as InlineList_v11_6
} from '@instructure/ui-list/v11_6'
import {
  MetricGroup as MetricGroup_v11_6,
  Metric as Metric_v11_6
} from '@instructure/ui-metric/v11_6'
import { Pill as Pill_v11_6 } from '@instructure/ui-pill/v11_6'
import { Popover as Popover_v11_6 } from '@instructure/ui-popover/v11_6'
import {
  ProgressBar as ProgressBar_v11_6,
  ProgressCircle as ProgressCircle_v11_6
} from '@instructure/ui-progress/v11_6'
import { RangeInput as RangeInput_v11_6 } from '@instructure/ui-range-input/v11_6'
import { SourceCodeEditor as SourceCodeEditor_v11_6 } from '@instructure/ui-source-code-editor/v11_6'
import { Spinner as Spinner_v11_6 } from '@instructure/ui-spinner/v11_6'
import {
  Table as Table_v11_6,
  TableContext as TableContext_v11_6
} from '@instructure/ui-table/v11_6'
import { Tabs as Tabs_v11_6 } from '@instructure/ui-tabs/v11_6'
import { Tag as Tag_v11_6 } from '@instructure/ui-tag/v11_6'
import { Text as Text_v11_6 } from '@instructure/ui-text/v11_6'
import { TextArea as TextArea_v11_6 } from '@instructure/ui-text-area/v11_6'
import { TextInput as TextInput_v11_6 } from '@instructure/ui-text-input/v11_6'
import { Tooltip as Tooltip_v11_6 } from '@instructure/ui-tooltip/v11_6'
import { TopNavBar as TopNavBar_v11_6 } from '@instructure/ui-top-nav-bar/v11_6'
import { Tray as Tray_v11_6 } from '@instructure/ui-tray/v11_6'
import { TreeBrowser as TreeBrowser_v11_6 } from '@instructure/ui-tree-browser/v11_6'
import {
  View as View_v11_6,
  ContextView as ContextView_v11_6
} from '@instructure/ui-view/v11_6'

const v11_6_overrides: Record<string, any> = {
  Avatar: Avatar_v11_6,
  Badge: Badge_v11_6,
  Billboard: Billboard_v11_6,
  Breadcrumb: Breadcrumb_v11_6,
  Calendar: Calendar_v11_6,
  DateInput: DateInput_v11_6,
  DateInput2: DateInput2_v11_6,
  FileDrop: FileDrop_v11_6,
  Flex: Flex_v11_6,
  FormField: FormField_v11_6,
  FormFieldLabel: FormFieldLabel_v11_6,
  FormFieldMessage: FormFieldMessage_v11_6,
  FormFieldMessages: FormFieldMessages_v11_6,
  FormFieldLayout: FormFieldLayout_v11_6,
  FormFieldGroup: FormFieldGroup_v11_6,
  Grid: Grid_v11_6,
  Heading: Heading_v11_6,
  Link: Link_v11_6,
  List: List_v11_6,
  InlineList: InlineList_v11_6,
  MetricGroup: MetricGroup_v11_6,
  Metric: Metric_v11_6,
  Pill: Pill_v11_6,
  Popover: Popover_v11_6,
  ProgressBar: ProgressBar_v11_6,
  ProgressCircle: ProgressCircle_v11_6,
  RangeInput: RangeInput_v11_6,
  SourceCodeEditor: SourceCodeEditor_v11_6,
  Spinner: Spinner_v11_6,
  Table: Table_v11_6,
  TableContext: TableContext_v11_6,
  Tabs: Tabs_v11_6,
  Tag: Tag_v11_6,
  Text: Text_v11_6,
  TextArea: TextArea_v11_6,
  TextInput: TextInput_v11_6,
  Tooltip: Tooltip_v11_6,
  TopNavBar: TopNavBar_v11_6,
  Tray: Tray_v11_6,
  TreeBrowser: TreeBrowser_v11_6,
  View: View_v11_6,
  ContextView: ContextView_v11_6
}

// Registry: version → its overrides (self-contained, no stacking)
const overridesByVersion: Record<string, Record<string, any>> = {
  v11_6: v11_6_overrides
  // Future: v11_7: v11_7_overrides
}

// Memoized results — versions and component maps are immutable at runtime
const versionCache = new Map<string, Record<string, any>>()

/**
 * Returns the full component map for a given library version.
 * Starts with default components and applies version-specific overrides.
 * If no version is given or the version has no overrides, returns defaults.
 */
export function getComponentsForVersion(
  version?: string
): Record<string, any> {
  const base = DefaultComponents as Record<string, any>
  if (!version) return base

  const cached = versionCache.get(version)
  if (cached) return cached

  const overrides = overridesByVersion[version]
  if (!overrides) return base

  const merged = { ...base, ...overrides }
  versionCache.set(version, merged)
  return merged
}
