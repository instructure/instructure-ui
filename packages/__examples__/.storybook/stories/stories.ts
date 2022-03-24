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

import { storiesOf } from '@storybook/react'
import { renderExample } from './renderExample'
import { renderPage } from './renderPage'
import {
  generateComponentExamples,
  StoryConfig
} from '@instructure/ui-test-utils'
import { ComponentType } from 'react'
// must be imported with Webpack because this file cannot contain async calls
// @ts-ignore TODO figure out why this is an error
import propJSONData from '../../prop-data.json'
import TooltipPositioning from './TooltipPositioning'

const examplesContext = require.context(
  '../../../', // bug: This causes start:watch to recompile endlessly in SB 6.2+
  true,
  /^.*\/src\/.*\.examples\.tsx?$/,
  'sync'
)

const componentsContext = require.context(
  '../../../',
  true,
  /ui-.*\/src\/.*\/index\.tsx$/,
  'sync'
)

let numStories = 0
console.time('storybook-build-examples')
// eslint-disable-next-line no-console
console.log(
  `Creating stories for ${Object.keys(propJSONData).length} components..`
)
;(Object.entries(propJSONData) as any).map(
  ([componentName, { exampleFilePath, generatedPropValues }]: [
    string,
    { exampleFilePath: string; generatedPropValues: Record<string, any> }
  ]) => {
    const requirePath = `./${exampleFilePath}`
    const exampleDir = requirePath.split('/').slice(0, -2).join('/')
    try {
      const Component: ComponentType = componentsContext(
        exampleDir + '/index.tsx'
      ).default
      const ExamplesModule: StoryConfig<any> =
        examplesContext(requirePath).default // xy.example.jsx

      // merge in generated prop values:
      ExamplesModule.propValues = Object.assign(
        generatedPropValues,
        ExamplesModule.propValues || {}
      )
      ExamplesModule.maxExamples = ExamplesModule.maxExamples
        ? ExamplesModule.maxExamples
        : 500

      const sections = generateComponentExamples(Component, ExamplesModule)
      if (sections && sections.length > 0) {
        const stories = storiesOf(componentName, module)
        sections.forEach(({ pages, sectionName }) => {
          pages.forEach((page, i) => {
            // eslint-disable-next-line no-param-reassign
            page.renderExample = renderExample
            numStories++
            stories.add(
              `${sectionName}${pages.length > 1 ? ` (page ${i + 1})` : ''}`,
              renderPage.bind(null, page),
              {
                chromatic: {
                  viewports: [1200],
                  pauseAnimationAtEnd: true,
                  delay: 700,
                  ...page.parameters
                }
              }
            )
          })
        })
      }
    } catch (e: any) {
      console.error(
        `Error during story generation for ${exampleFilePath}: ${e}\n${e?.stack}`
      )
    }
  }
)

// Stories not tied to one component
storiesOf('Tooltip positioning', module).add('Tooltip positions', () =>
  TooltipPositioning()
)
numStories++
// eslint-disable-next-line no-console
console.log(`Created ${numStories} stories!`)
console.timeEnd('storybook-build-examples')
