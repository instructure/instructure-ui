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

import objectHash from 'object-hash'
import generatePropCombinations from './generatePropCombinations'

export default function generateComponentExamples (Component, config = {
    sectionProp: null,
    propValues: {},
    maxExamplesPerPage: null,
    getExampleProps: (props) => { return {} },
    getComponentProps: (props) => { return {} },
    filter: (props) => false
  }) {
  const {
    sectionProp,
    propValues,
    filter
  } = config

  const sections = []
  let exampleCount = 0

  const getRenderProps = (props) => {
    let componentProps = props
    let exampleProps = {}

    if (typeof config.getComponentProps === 'function') {
      componentProps = {
        ...componentProps,
        ...config.getComponentProps(props)
      }
    }

    if (typeof config.getExampleProps === 'function') {
      exampleProps = {
        ...config.getExampleProps(props)
      }
    }

    return {
      componentProps,
      exampleProps
    }
  }

  const addPage = (section) => {
    const page = {
      examples : []
    }
    section.pages.push(page)
    return page
  }

  const addExample = (sectionName = 'Examples', example) => {
    let section = sections.find(section => section.sectionName === sectionName)
    if (!section) {
      section = {
        sectionName: sectionName,
        propName: sectionProp,
        propValue: sectionName,
        pages: []
      }
      sections.push(section)
    }

    let page = section.pages[section.pages.length - 1]

    let { maxExamplesPerPage } = config

    if (typeof maxExamplesPerPage === 'function') {
      maxExamplesPerPage = maxExamplesPerPage(sectionName)
    }

    if (!page) {
      page = addPage(section)
    } else if (maxExamplesPerPage && page.examples.length % maxExamplesPerPage === 0 && page.examples.length > 0) {
      page = addPage(section)
    }

    page.examples.push(example)
    exampleCount++
  }

  // eslint-disable-next-line no-console
  console.log(`Generating examples for ${Component.displayName}...`)

  generatePropCombinations(propValues, filter)
    .filter(Boolean)
    .forEach((props) => {
      if (typeof filter === 'function' && filter(props)) return

      const { componentProps, exampleProps } = getRenderProps(props)

      addExample(props[sectionProp], {
        Component,
        componentProps,
        exampleProps,
        key: objectHash(componentProps)
      })
    })

  if (exampleCount > 200) {
    console.error(`${exampleCount} is too many examples for ${Component.displayName}! Add a filter to the config!`)
  } else {
    // eslint-disable-next-line no-console
    console.log(`Generated ${exampleCount} examples for ${Component.displayName}!`)
  }

  return sections
}
