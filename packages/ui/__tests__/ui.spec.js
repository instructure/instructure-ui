/* eslint-disable */
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

import ReactServer from 'react-dom/server'
import { expect, jest, test, beforeAll } from '@jest/globals'

import {
  AccessibleContent,
  PresentationContent,
  ScreenReaderContent
} from '@instructure/ui-a11y-content'
import { Alert } from '@instructure/ui-alerts'
import { Avatar } from '@instructure/ui-avatar'
import { Badge } from '@instructure/ui-badge'
import { Billboard } from '@instructure/ui-billboard'
import { Breadcrumb } from '@instructure/ui-breadcrumb'
import {
  BaseButton,
  Button,
  CloseButton,
  CondensedButton,
  IconButton,
  ToggleButton
} from '@instructure/ui-buttons'
import { Byline } from '@instructure/ui-byline'
import {
  Checkbox,
  CheckboxGroup,
  CheckboxFacade,
  ToggleFacade
} from '@instructure/ui-checkbox'
import { DateInput } from '@instructure/ui-date-input'
import { DateTimeInput } from '@instructure/ui-date-time-input'
import { Dialog } from '@instructure/ui-dialog'
import { DrawerLayout, DrawerContent } from '@instructure/ui-drawer-layout'
import { Editable, InPlaceEdit } from '@instructure/ui-editable'
import { Expandable } from '@instructure/ui-expandable'
import { FileDrop } from '@instructure/ui-file-drop'
import { Flex, FlexItem } from '@instructure/ui-flex'
import { Focusable } from '@instructure/ui-focusable'
import {
  FormField,
  FormFieldLabel,
  FormFieldMessage,
  FormFieldMessages,
  FormFieldLayout,
  FormFieldGroup
} from '@instructure/ui-form-field'
import { Grid, GridRow, GridCol } from '@instructure/ui-grid'
import { Heading } from '@instructure/ui-heading'

import { Img } from '@instructure/ui-img'
import { Link } from '@instructure/ui-link'
import { List, ListItem, InlineList } from '@instructure/ui-list'
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemSeparator
} from '@instructure/ui-menu'
import { MetricGroup, Metric } from '@instructure/ui-metric'
import { Modal } from '@instructure/ui-modal'
import { Transition } from '@instructure/ui-motion'
import { Navigation, AppNav } from '@instructure/ui-navigation'
import { NumberInput } from '@instructure/ui-number-input'
import { Options } from '@instructure/ui-options'
import { Mask, Overlay } from '@instructure/ui-overlays'
import { Pages } from '@instructure/ui-pages'
import { Pagination } from '@instructure/ui-pagination'
import { Pill } from '@instructure/ui-pill'
import { Popover } from '@instructure/ui-popover'
import { Portal } from '@instructure/ui-portal'
import { Position } from '@instructure/ui-position'
import { ProgressBar, ProgressCircle } from '@instructure/ui-progress'
import { RadioInput, RadioInputGroup } from '@instructure/ui-radio-input'
import { RangeInput } from '@instructure/ui-range-input'
import { Rating } from '@instructure/ui-rating'
import { Responsive } from '@instructure/ui-responsive'
import { Select } from '@instructure/ui-select'
import { Selectable } from '@instructure/ui-selectable'
import { SimpleSelect } from '@instructure/ui-simple-select'
import { Spinner } from '@instructure/ui-spinner'
import { InlineSVG, SVGIcon } from '@instructure/ui-svg-images'
import { Table } from '@instructure/ui-table'
import { Tabs } from '@instructure/ui-tabs'
import { Tag } from '@instructure/ui-tag'
import { Text } from '@instructure/ui-text'
import { TextArea } from '@instructure/ui-text-area'
import { TextInput } from '@instructure/ui-text-input'
import { TimeSelect } from '@instructure/ui-time-select'
import { ToggleDetails, ToggleGroup } from '@instructure/ui-toggle-details'
import { Tooltip } from '@instructure/ui-tooltip'
import { Tray } from '@instructure/ui-tray'
import { TreeBrowser } from '@instructure/ui-tree-browser'
import { TruncateText } from '@instructure/ui-truncate-text'
import { View, ContextView } from '@instructure/ui-view'

const EveryComponent = {
  AccessibleContent,
  PresentationContent,
  ScreenReaderContent,
  Alert,
  Avatar,
  Badge,
  Billboard,
  Breadcrumb,
  BaseButton,
  Button,
  CloseButton,
  CondensedButton,
  IconButton,
  ToggleButton,
  Byline,
  Checkbox,
  CheckboxGroup,
  CheckboxFacade,
  ToggleFacade,
  DateInput,
  DateTimeInput,
  Dialog,
  DrawerLayout,
  DrawerContent,
  Editable,
  InPlaceEdit,
  Expandable,
  FileDrop,
  Flex,
  FlexItem,
  Focusable,
  FormField,
  FormFieldLabel,
  FormFieldMessage,
  FormFieldMessages,
  FormFieldLayout,
  FormFieldGroup,
  Grid,
  GridRow,
  GridCol,
  Heading,
  Img,
  Link,
  List,
  ListItem,
  InlineList,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemSeparator,
  MetricGroup,
  Metric,
  Modal,
  Transition,
  Navigation,
  AppNav,
  NumberInput,
  Options,
  Mask,
  Overlay,
  Pages,
  Pagination,
  Pill,
  Popover,
  Portal,
  Position,
  ProgressBar,
  ProgressCircle,
  RadioInput,
  RadioInputGroup,
  RangeInput,
  Rating,
  Responsive,
  Select,
  Selectable,
  SimpleSelect,
  Spinner,
  InlineSVG,
  SVGIcon,
  Table,
  Tabs,
  Tag,
  Text,
  TextArea,
  TextInput,
  TimeSelect,
  ToggleDetails,
  ToggleGroup,
  Tooltip,
  Tray,
  TreeBrowser,
  TruncateText,
  View,
  ContextView
}
// some components need props in order to render
const extraProps = {
  TreeBrowser: {
    collections: {
      1: {
        id: 1,
        name: 'Assignments',
        collections: [],
        items: [1],
        descriptor: 'Class Assignments'
      }
    },
    items: {
      1: { id: 1, name: 'Addition Worksheet' }
    },
    defaultExpanded: [1],
    rootId: 1
  },
  InPlaceEdit: {
    renderEditButton: jest.fn()
  },
  Navigation: {
    label: 'Main navigation',
    toggleLabel: {
      expandedLabel: 'Minimize Navigation',
      minimizedLabel: 'Expand Navigation'
    }
  },
  Transition: {
    children: undefined
  }
}

describe('Testing every imported component for SSR', () => {
  beforeAll(() => {
    // since we don't provide every needed prop propTypes will complain when
    // we render the components, so in order to not spam the console
    // we suppress these warnings/errors
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  Object.entries(EveryComponent).forEach(([componentName, Component]) => {
    test(`${componentName}`, async () => {
      let props = { label: 'test', children: [] }
      if (componentName in extraProps) {
        props = Object.assign(props, extraProps[componentName])
      }
      const ref = React.createRef()

      const subject = ReactServer.renderToString(
        <Component {...props} ref={ref}></Component>
      )

      expect(subject).not.toBeUndefined()
    })
  })
})
