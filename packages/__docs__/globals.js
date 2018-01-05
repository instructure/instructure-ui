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

import moment from 'moment'
import 'moment/min/locales'
import lorem from 'lorem-ipsum'

import * as UIContainer from '@instructure/ui-container'
import * as UICore from '@instructure/ui-core'
import * as UIForms from '@instructure/ui-forms'
import * as UISVGImages from '@instructure/ui-svg-images'
import * as UIPortal from '@instructure/ui-portal'

import IconUser from '@instructure/ui-icons/lib/Line/IconUser'
import IconPlus from '@instructure/ui-icons/lib/Solid/IconPlus'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'

import '@instructure/ui-icons/lib/font/Solid/InstructureIcons-Solid.css'
import '@instructure/ui-icons/lib/font/Line/InstructureIcons-Line.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
import iconExample from '!svg-inline-loader!./heart_lg.svg'
import avatarImage from './placeholder-avatar.png'
import placeholderImage from './placeholder-image'

const globals = Object.assign(
  {
    PlaceholderIcon: IconUser,
    IconPlus: IconPlus,
    IconX: IconX,
    moment,
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
  },
  UIContainer,
  UICore,
  UIForms,
  UISVGImages,
  UIPortal
)

Object.keys(globals).forEach((key) => {
  global[key] = globals[key]
})

module.exports = globals
