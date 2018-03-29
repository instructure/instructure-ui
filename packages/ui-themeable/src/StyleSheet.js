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

import { StyleSheet as GlamorStyleSheet } from 'glamor/lib/sheet'
import canUseDOM from '@instructure/ui-utils/lib/dom/canUseDOM'

import { toRules } from './utils/transformCss'

const debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development'

const STYLES = {}
let THEMEABLE_STYLESHEET

/**
* ---
* category: utilities/themes
* ---
* A utility for the [themeable](#themeable) component HOC that wraps a
* [Glamor StyleSheet](https://github.com/threepointone/glamor/blob/master/src/sheet.js)
* @module StyleSheet
*/
export default {
  /**
  * Inject the `cssText` into the document
  * @param {String} id - a unique id for the set of styles
  * @param {String} cssText - some CSS to inject into the document
  */
  mount (id, cssText) {
    if (!STYLES[id]) {
      STYLES[id] = {
        cssText,
        rules: insert(toRules(cssText))
      }
    }
  }
}

function insert (rules) {
  const sheet = inject()

  const inserted = []
  rules.forEach((rule) => {
    if (rule) {
      inserted.push(sheet.insert(rule))
    }
  })
}

function inject () {
  let sheet = canUseDOM ? window.THEMEABLE_STYLESHEET : THEMEABLE_STYLESHEET

  if (!sheet) {
    sheet = THEMEABLE_STYLESHEET = createSheet()

    if (canUseDOM) {
      window.THEMEABLE_STYLESHEET = sheet
    }
  }

  return sheet
}

function createSheet () {
  const sheet = new GlamorStyleSheet({ speedy: !debug, maxLength: 40 })
  sheet.inject()
  return sheet
}
