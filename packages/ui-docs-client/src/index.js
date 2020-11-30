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

import { App } from './App'
import { Figure } from './Figure'
import { Guidelines } from './Guidelines'
import { ToggleBlockquote } from './ToggleBlockquote'
import { canvas, instructure } from '@instructure/ui-themes'
import { ThemeRegistry } from '@instructure/ui-themeable'
import { EmotionThemeProvider } from '@instructure/emotion'

function renderDocsClient(data, element) {
  //Legacy way of registering themes, we need to do this so the currently not migrated components
  //which are still using the old themeing solution will render correctly
  ThemeRegistry.registerTheme({ key: 'canvas', variables: { ...canvas } })
  ThemeRegistry.registerTheme({
    key: 'instructure',
    variables: { ...instructure }
  })

  ReactDOM.render(
    <EmotionThemeProvider theme={canvas}>
      <App {...data} />,
    </EmotionThemeProvider>,
    element
  )
}

export { renderDocsClient, Figure, Guidelines, ToggleBlockquote }

export default renderDocsClient
