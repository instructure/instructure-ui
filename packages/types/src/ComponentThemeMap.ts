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

import { ThemeVariables } from './ComponentThemeVariables'

type ComponentThemeVariables = {
  Avatar: ThemeVariables['Avatar']
  Alert: ThemeVariables['Alert']
  Badge: ThemeVariables['Badge']
  Billboard: ThemeVariables['Billboard']
  Breadcrumb: ThemeVariables['Breadcrumb']
  BaseButton: ThemeVariables['BaseButton']
  Button: ThemeVariables['BaseButton']
  CloseButton: ThemeVariables['CloseButton']
  CondensedButton: ThemeVariables['BaseButton']
  IconButton: ThemeVariables['BaseButton']
  Byline: ThemeVariables['Byline']
  'Calendar.Day': ThemeVariables['CalendarDay']
  Calendar: ThemeVariables['Calendar']
  CheckboxFacade: ThemeVariables['CheckboxFacade']
  ToggleFacade: ThemeVariables['ToggleFacade']
  CodeEditor: ThemeVariables['CodeEditor']
  'DrawerLayout.Content': ThemeVariables['DrawerLayoutContent']
  'DrawerLayout.Tray': ThemeVariables['DrawerLayoutTray']
  FileDrop: ThemeVariables['FileDrop']
  Flex: ThemeVariables['Flex']
  FormFieldGroup: ThemeVariables['FormFieldGroup']
  FormFieldLabel: ThemeVariables['FormFieldLabel']
  FormFieldMessage: ThemeVariables['FormFieldMessage']
  FormFieldMessages: ThemeVariables['FormFieldMessages']
  Grid: ThemeVariables['Grid']
  GridCol: ThemeVariables['Grid']
  GridRow: ThemeVariables['Grid']
  Heading: ThemeVariables['Heading']
  Link: ThemeVariables['Link']
  'InlineList.Item': ThemeVariables['InlineListItem']
  'List.Item': ThemeVariables['ListItem']
  List: ThemeVariables['List']
  'Menu.Item': ThemeVariables['MenuItem']
  'Menu.Group': ThemeVariables['MenuGroup']
  'Menu.Separator': ThemeVariables['MenuSeparator']
  Metric: ThemeVariables['Metric']
  MetricGroup: ThemeVariables['MetricGroup']
  'Modal.Body': ThemeVariables['ModalBody']
  'Modal.Footer': ThemeVariables['ModalFooter']
  'Modal.Header': ThemeVariables['ModalHeader']
  Modal: ThemeVariables['Modal']
  Transition: ThemeVariables['Transition']
  'AppNav.Item': ThemeVariables['AppNavItem']
  AppNav: ThemeVariables['AppNav']
  'Navigation.Item': ThemeVariables['NavigationItem']
  Navigation: ThemeVariables['Navigation']
  NumberInput: ThemeVariables['NumberInput']
  'Options.Item': ThemeVariables['OptionsItem']
  'Options.Separator': ThemeVariables['OptionsSeparator']
  Options: ThemeVariables['Options']
  Mask: ThemeVariables['Mask']
  Pages: ThemeVariables['Pages']
  Pill: ThemeVariables['Pill']
  Position: ThemeVariables['Position']
  ProgressBar: ThemeVariables['ProgressBar']
  ProgressCircle: ThemeVariables['ProgressCircle']
  RangeInput: ThemeVariables['RangeInput']
  RadioInput: ThemeVariables['RadioInput']
  'Rating.Icon': ThemeVariables['RatingIcon']
  Select: ThemeVariables['Select']
  Spinner: ThemeVariables['Spinner']
  InlineSVG: ThemeVariables['InlineSVG']
  'Table.Body': ThemeVariables['TableBody']
  'Table.Cell': ThemeVariables['TableCell']
  'Table.ColHeader': ThemeVariables['TableColHeader']
  'Table.Head': ThemeVariables['TableHead']
  'Table.Row': ThemeVariables['TableRow']
  'Table.RowHeader': ThemeVariables['TableRowHeader']
  Table: ThemeVariables['Table']
  'Tabs.Panel': ThemeVariables['TabsPanel']
  'Tabs.Tab': ThemeVariables['TabsTab']
  Tabs: ThemeVariables['Tabs']
  Tag: ThemeVariables['Tag']
  Text: ThemeVariables['Text']
  TextArea: ThemeVariables['TextArea']
  ToggleDetails: ThemeVariables['ToggleDetails']
  Tooltip: ThemeVariables['Tooltip']
  Tray: ThemeVariables['Tray']
  'TreeBrowser.Button': ThemeVariables['TreeBrowserButton']
  'TreeBrowser.Collection': ThemeVariables['TreeBrowserCollection']
  TreeBrowser: ThemeVariables['TreeBrowser']
  TruncateText: ThemeVariables['TruncateText']
  ContextView: ThemeVariables['ContextView']
  View: ThemeVariables['View']
}
type ComponentTheme<Type> = {
  [Key in keyof Type]: Type[Key]
}
type ComponentThemeMap = ComponentTheme<ComponentThemeVariables>

export type { ComponentThemeMap }
