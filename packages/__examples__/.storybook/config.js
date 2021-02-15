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

// eslint-disable-next-line import/no-unresolved
import '@instructure/ui-polyfill-loader!'

import { create } from '@storybook/theming'
import {
  getStorybook,
  storiesOf,
  configure,
  addParameters
} from '@storybook/react'

import { theme } from '@instructure/canvas-theme'

import { renderExample } from './renderExample'
import { renderPage } from './renderPage'

// eslint-disable-next-line no-console
console.log('Generating component examples...')

addParameters({
  options: {
    theme: create({
      base: 'light',
      name: 'instructure-ui',
      brandUrl: 'https://instructure.design',
      brandImage:
        'https://instructure.design/icons-bea652a7d0546b99c7cba9d3b4a538ee/favicon-32x32.png'
    }),
    showPanel: false,
    isFullscreen: false
  }
})

configure(() => {
  const examplesContext = require.context(
    '../../',
    true,
    /^.*\/src\/.*\.examples\.js$/,
    'lazy'
  )
  let numStories = 0

  // eslint-disable-next-line no-console
  console.log(
    `Creating stories for ${examplesContext.keys().length} components...`
  )

  examplesContext.keys().map((requirePath) => {
    examplesContext(requirePath).then(({ componentName, sections }) => {
      if (sections && sections.length > 0) {
        const stories = storiesOf(componentName, module)

        sections.forEach(({ pages, sectionName }) => {
          pages.forEach((page, i) => {
            page.renderExample = renderExample
            numStories++
            stories.add(
              `${sectionName}${pages.length > 1 ? ` (page ${i + 1})` : ''}`,
              renderPage.bind(null, page),
              {
                chromatic: { ...page.parameters },
                viewports: [1200],
                delay: 500
              }
            )
          })
        })
      }
    })
  })

  console.log(`Created ${numStories} stories!`)
}, module)

export { getStorybook }
