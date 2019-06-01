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
import uid from '@instructure/uid'
import generatePropCombinations from './generatePropCombinations'

export default function generateComponentExamples (Component, config = {
    sectionProp: null,
    propValues: {},
    maxExamplesPerPage: null,
    excludeProps: [],
    getExampleProps: (props, index) => { return {} },
    getComponentProps: (props, index) => { return {} },
    getParameters: (examples, pageIndex) => { return {} },
    filter: (props, index) => false
  }) {
  const {
    sectionProp,
    excludeProps,
    filter
  } = config

  const PROPS_CACHE = []
  const sections = []
  const maxExamples = config.maxExamples || 500
  let exampleCount = 0
  let propValues = {}

  const getParameters = ({ examples, index }) => {
    let parameters = {}
    if (typeof config.getParameters === 'function') {
      parameters = {
        ...config.getParameters(examples, index)
      }
    }
    return parameters
  }

  const getComponentProps = (props) => {
    let componentProps = props

    if (typeof config.getComponentProps === 'function') {
      componentProps = {
        ...componentProps,
        ...config.getComponentProps(props)
      }
    }

    return componentProps
  }

  const getExampleProps = (props) => {
    let exampleProps = {}

    if (typeof config.getExampleProps === 'function') {
      exampleProps = {
        ...config.getExampleProps(props)
      }
    }

    return  exampleProps
  }

  const addPage = (section) => {
    const page = {
      examples : [],
      index: section.pages.length
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
  }

  const maybeAddExample = (props) => {
    const componentProps = getComponentProps(props)
    const exampleProps = getExampleProps(props)
    const key = uid()
    const propsString = JSON.stringify(componentProps)
    const ignore = (typeof filter === 'function') ? filter(componentProps) : false

    if (!ignore && !PROPS_CACHE.includes(propsString)) {
      exampleCount++

      if (exampleCount < maxExamples) {
        PROPS_CACHE.push(propsString)

        addExample(componentProps[sectionProp], {
          Component,
          componentProps,
          exampleProps,
          key
        })
      }
    }
  }

  if (isEmpty(config.propValues)) {
    maybeAddExample(config.propValues)
  } else {
    if (Array.isArray(excludeProps)) {
      Object.keys(config.propValues).forEach((propName) => {
        if (!excludeProps.includes(propName)) {
          propValues[propName] = config.propValues[propName]
        }
      })
    } else {
      propValues = config.propValues
    }

    // eslint-disable-next-line no-console
    console.info(`Generating examples for ${Component.displayName} (${Object.keys(propValues).length} props)...`)

    const combos = generatePropCombinations(propValues).filter(Boolean)
    let index = 0
    while (index < combos.length && exampleCount < maxExamples) {
      const combo = combos[index]
      if (combo) {
        maybeAddExample(combo)
        index++
      }
    }
  }

  if (exampleCount >= maxExamples) {
    console.error(`Too many examples for ${Component.displayName}! Add a filter to the config.`)
  }

  // eslint-disable-next-line no-console
  console.info(`Generated ${exampleCount} examples for ${Component.displayName}`)

  sections.forEach(({ pages }) => {
    pages.forEach((page, index) => {
      // eslint-disable-next-line no-param-reassign
      page.parameters = getParameters(page)
    })
  })

  return sections
}

function isEmpty (obj) {
  if (typeof obj !== 'object') return true
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }
  return true
}
