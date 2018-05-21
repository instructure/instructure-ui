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

// eslint-plugin-import doesn't like 'import * as Components' here
const Components = require('./components')

import '@instructure/ui-icons/lib/font/Solid/InstructureIcons-Solid.css'
import '@instructure/ui-icons/lib/font/Line/InstructureIcons-Line.css'

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import iconExample from '!svg-inline-loader!./heart_lg.svg'
import avatarImage from './placeholder-avatar.jpg'
import placeholderImage from './placeholder-image'
import placeholderLogo from './placeholder-logo'

const globals = {
  ...Components,
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
  placeholderLogo,
  React,
  ReactDOM
}

Object.keys(globals).forEach((key) => {
  global[key] = globals[key]
})

export default globals
