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

import UAParser from 'ua-parser-js'

/**
 * ---
 * category: utilities
 * ---
 * A utility module using the [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) browser
 * detection library.
 *
 * @module getBrowser
 */

const getBrowser = (): UAParser.IBrowser => {
  const parser = new UAParser()
  const { browser } = parser.getResult()
  return browser
}

const isSafari = () => {
  return getBrowser().name === 'Safari'
}

const isEdge = () => {
  return getBrowser().name === 'Edge'
}

const isIE = () => {
  return getBrowser().name === 'IE'
}

const isChromium = () => {
  const chromiumBasedBrowsers = ['Chrome', 'Chromium', 'Opera', 'Edge']
  return chromiumBasedBrowsers.some((browser) => {
    getBrowser().name?.includes(browser)
  })
}

const isFirefox = () => {
  return getBrowser().name === 'Firefox'
}

export { getBrowser, isSafari, isEdge, isIE, isFirefox, isChromium }
