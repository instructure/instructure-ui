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
import { render, unmountComponentAtNode } from 'react-dom'
import path from 'path'

import '@instructure/ui-themes/lib/canvas'

/* global happo */

const TESTS = []

// Automatically import all component .examples.js files in packages
const requireExamples = require.context('../packages', true,  /src\/\S+\.examples\.js$/)

// assemble the tests from the examples
requireExamples.keys()
  .forEach((pathToExamples) => {
    const componentName = path.basename(pathToExamples, '.js').replace('.examples', '')
    const componentExamples = requireExamples(pathToExamples)

    Object.keys(componentExamples)
      .forEach((exampleName) => {
        TESTS.push({
          component: componentName,
          name: exampleName,
          Example: componentExamples[exampleName]
        })
      })
  })

// define the tests
TESTS.forEach((test) => {
  const { Example, component, name } = test
  happo.define(
   `<${component}/>: ${name}`,
   () => {
     const div = document.createElement('div')
     document.body.appendChild(div)
     render(<Example />, div)
   },
   { viewports: ['large', 'medium', 'small'] }
 )
})

happo.cleanOutElement = function (element) {
 unmountComponentAtNode(element)
}

happo.getRootNodes = function () {
 return document.querySelectorAll('[data-reactroot]')
}
