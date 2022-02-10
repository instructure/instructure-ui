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
import ReactServer from 'react-dom/server'
import * as EveryComponent from '..'

const excludedComponents = [
  'canvas',
  'canvasHighContrast',
  'instructure',
  'withStyle',
  'TextDirectionContext',
  // Calendar is not easy to set up, because it requires external deps (like: moment)
  'Calendar',
  // CodeEditor does not work with SSR
  'CodeEditor'
]

// some components need props in order to render
const extraProps = {
  TreeBrowser: {
    collections: {
      1: {
        id: 1,
        name: 'Assignments',
        collections: [],
        items: [1],
        descriptor: 'Class Assignments'
      }
    },
    items: {
      1: { id: 1, name: 'Addition Worksheet' }
    },
    defaultExpanded: [1],
    rootId: 1
  },
  InPlaceEdit: {
    renderEditButton: jest.fn()
  },
  Navigation: {
    label: 'Main navigation',
    toggleLabel: {
      expandedLabel: 'Minimize Navigation',
      minimizedLabel: 'Expand Navigation'
    }
  },
  Transition: {
    children: undefined
  }
}

describe('Testing every exported component for SSR', () => {
  beforeAll(() => {
    // since we don't provide every needed prop propTypes will complain when
    // we render the components, so in order to not to spam the console
    // we supress these warnings/errors
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })
  Object.entries(EveryComponent).forEach(([componentName, Component]) => {
    if (
      !excludedComponents.includes(componentName) &&
      !componentName.includes('Icon')
    ) {
      test(`${componentName}`, async () => {
        let props = { label: 'test', children: [] }
        if (componentName in extraProps) {
          props = Object.assign(props, extraProps[componentName])
        }
        const ref = React.createRef()

        const subject = ReactServer.renderToString(
          <Component {...props} ref={ref}></Component>
        )

        expect(subject).not.toBeUndefined()
      })
    }
  })
})
