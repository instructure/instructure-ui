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

import React, { Component } from 'react'

import V7 from '../V7'
import V8 from '../V8'

import { instructure, canvas } from '@instructure/ui-themes'
import { InstUISettingsProvider } from '@instructure/emotion'

/*
Component, using only V8 tooling and utils, but rendering components, that are
using @themeable from V7.
It should render V8 and @themeable-based components without issue and with styling, theming
It should be able to apply theme from V8, using the THEME.use() method (EXAMPLE 1)
It should be able to apply theme from V8 with InstUISettingsProvider (EXAMPLE2)
OTIONAL: theme overrides should work, though it isn't a priority for new quizzes
*/

class App extends Component {
  render() {
    // eslint-disable-next-line no-console
    console.log(InstUISettingsProvider)
    //EXAMPLE 1:
    //canvas.use()
    return (
      <div>
        {/* EXAMPLE 2 */}
        {/* <InstUISettingsProvider>
            <hr />
            <V7 />
            <hr />
            <V8 />
          </InstUISettingsProvider> */}
        <hr />
        <V7 />
        <hr />
        <V8 />
      </div>
    )
  }
}

export default App
export { App }
