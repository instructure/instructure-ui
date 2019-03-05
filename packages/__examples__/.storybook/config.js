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
import 'storybook-chromatic'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { getStorybook, storiesOf } from '@storybook/react'

addDecorator(
  withOptions({
    name: 'instructure-ui',
    showAddonPanel: false
  })
)

import '@instructure/ui-themes/lib/canvas'
// eslint-disable-next-line import/no-unresolved
import '@instructure/ui-polyfill-loader!'

// eslint-disable-next-line no-console
console.log('Generating component examples...')

const examplesContext = require.context('../../', true, /^.*\/src\/.*\.examples\.js$/)
const examples = examplesContext.keys().map(requirePath => examplesContext(requirePath))

configure(() => {
  // eslint-disable-next-line no-console
  console.log(`Creating stories for ${examples.length} components...`)

  examples.forEach(({ componentName, sections, renderPage, renderExample }) => {
    const stories = storiesOf(componentName, module)
    sections.forEach(({ pages, sectionName }) => {
      pages.forEach((page, i) => {
        page.renderExample = renderExample
        stories.add(
          `${sectionName}${pages.length > 1 ? ` (page ${i+1})` : ''}`,
          renderPage.bind(null, page)
        )
      })
    })
  })
}, module)

export { getStorybook }
