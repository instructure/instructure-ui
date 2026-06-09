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

/*
 * React wrappers for the Lit Web Components, via @lit/react `createComponent`.
 * Each wrapper maps the element's bubbling CustomEvents to React-style `on*`
 * props and forwards complex props (e.g. `items`, `pages`) as element
 * properties. Importing this entry also registers the custom elements (the
 * element classes run `customElements.define` on import). React is a peer.
 */

import * as React from 'react'
import { createComponent } from '@lit/react'

import { Alert, Drilldown, Menu, Popover, ThemeProvider } from '../index'

export const InstuiThemeProvider = createComponent({
  react: React,
  tagName: 'instui-theme-provider',
  elementClass: ThemeProvider,
  events: { onThemeChange: 'instui-theme-change' }
})

export const InstuiAlert = createComponent({
  react: React,
  tagName: 'instui-alert',
  elementClass: Alert,
  events: { onDismiss: 'instui-alert-dismiss' }
})

export const InstuiPopover = createComponent({
  react: React,
  tagName: 'instui-popover',
  elementClass: Popover,
  events: {
    onShow: 'instui-popover-show',
    onHide: 'instui-popover-hide'
  }
})

export const InstuiMenu = createComponent({
  react: React,
  tagName: 'instui-menu',
  elementClass: Menu,
  events: { onSelect: 'instui-menu-select' }
})

export const InstuiDrilldown = createComponent({
  react: React,
  tagName: 'instui-drilldown',
  elementClass: Drilldown,
  events: {
    onSelect: 'instui-drilldown-select',
    onPageChange: 'instui-drilldown-page-change'
  }
})

// Re-export the plain-data config/detail types so React consumers can type the
// `items`/`pages` props and event details.
export type {
  MenuConfigItem,
  MenuConfigGroup,
  MenuConfigSeparator,
  MenuConfigNode,
  MenuSelectDetail,
  DrilldownConfigOption,
  DrilldownConfigGroup,
  DrilldownConfigPage,
  DrilldownSelectDetail,
  DrilldownPageChangeDetail,
  PopoverHideDetail,
  ThemeName,
  InstUIWebTheme
} from '../index'
