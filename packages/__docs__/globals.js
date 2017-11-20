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

import React from 'react'
import ReactDOM from 'react-dom'

import lorem from 'lorem-ipsum'
import moment from 'moment'
import 'moment/min/locales'

import * as UIA11y from '@instructure/ui-a11y/lib/components'
import * as UIAlerts from '@instructure/ui-alerts/lib/components'
import * as UIBillboard from '@instructure/ui-billboard/lib/components'
import * as UIBreadcrumb from '@instructure/ui-breadcrumb/lib/components'
import * as UIButtons from '@instructure/ui-buttons/lib/components'
import * as UIContainer from '@instructure/ui-container/lib/components'
import * as UICore from '@instructure/ui-core/lib/components'
import * as UIElements from '@instructure/ui-elements/lib/components'
import * as UIForms from '@instructure/ui-forms/lib/components'
import * as UII18n from '@instructure/ui-i18n/lib/components'
import * as UILayout from '@instructure/ui-layout/lib/components'
import * as MediaCapture from '@instructure/media-capture/lib/components'
import * as UIMenu from '@instructure/ui-menu/lib/components'
import * as UIMotion from '@instructure/ui-motion/lib/components'
import * as UIOverlays from '@instructure/ui-overlays/lib/components'
import * as UIPages from '@instructure/ui-pages/lib/components'
import * as UIPagination from '@instructure/ui-pagination/lib/components'
import * as UIPortal from '@instructure/ui-portal/lib/components'
import * as UISVGImages from '@instructure/ui-svg-images/lib/components'
import * as UITabs from '@instructure/ui-tabs/lib/components'
import * as UIThemeable from '@instructure/ui-themeable/lib/components'
import * as UIToggleDetails from '@instructure/ui-toggle-details/lib/components'
import * as UITreeBrowser from '@instructure/ui-tree-browser/lib/components'

import IconUser from '@instructure/ui-icons/lib/Line/IconUser'
import IconPlus from '@instructure/ui-icons/lib/Solid/IconPlus'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'
import IconArrowOpenLeft from '@instructure/ui-icons/lib/Solid/IconArrowOpenLeft'

import '@instructure/ui-icons/lib/font/Solid/InstructureIcons-Solid.css'
import '@instructure/ui-icons/lib/font/Line/InstructureIcons-Line.css'

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import iconExample from '!svg-inline-loader!./heart_lg.svg'
import avatarImage from './placeholder-avatar.png'
import placeholderImage from './placeholder-image'

const components = Object.assign(
  {},
  UICore,
  UIA11y,
  UIAlerts,
  UIBillboard,
  UIBreadcrumb,
  UIButtons,
  UIContainer,
  UIElements,
  UIForms,
  UII18n,
  UILayout,
  MediaCapture,
  UIMenu,
  UIMotion,
  UIOverlays,
  UIPages,
  UIPagination,
  UIPortal,
  UISVGImages,
  UITabs,
  UIThemeable,
  UIToggleDetails,
  UITreeBrowser
)

Object.keys(components).forEach((key) => {
  global[key] = components[key]
})

const globals = {
  PlaceholderIcon: IconUser,
  IconPlus,
  IconX,
  IconArrowOpenLeft,
  locales: moment.locales(),
  avatarImage,
  iconExample,
  lorem: {
    sentence () {
      return lorem({
        count: 1,
        units: 'sentences'
      })
    },
    paragraph () {
      return lorem({
        count: 1,
        units: 'paragraphs'
      })
    },
    paragraphs (count) {
      return lorem({
        count: count || Math.floor(Math.random() * 10),
        units: 'paragraphs'
      })
    }
  },
  placeholderImage,
  React,
  ReactDOM
}

Object.keys(globals).forEach((key) => {
  global[key] = globals[key]
})
