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

import alertDark from './alert/dark'
import alertLight from './alert/light'
import alertCanvas from './alert/canvas'
import alertCanvasHighContrast from './alert/canvasHighContrast'
import type Alert from './alert/type'

import pillDark from './pill/dark'
import pillLight from './pill/light'
import pillCanvas from './pill/canvas'
import pillCanvasHighContrast from './pill/canvasHighContrast'
import type Pill from './pill/type'

export type { Alert, Pill }

export default {
  dark: {
    Alert: alertDark,
    Pill: pillDark
  },
  light: {
    Alert: alertLight,
    Pill: pillLight
  },
  canvas: {
    Alert: alertCanvas,
    Pill: pillCanvas
  },
  canvasHighContrast: {
    Alert: alertCanvasHighContrast,
    Pill: pillCanvasHighContrast
  }
}
