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

import { nanoid } from 'nanoid'

import { generatePropCombinations } from './generatePropCombinations'

type Config = {
  sectionProp?: string
  maxExamplesPerPage?: number | ((...args: any[]) => number)
  maxExamples: number
  propValues?: Record<string, unknown>
  excludeProps?: string[]
  getComponentProps?: (...args: any[]) => Record<string, unknown>
  getExampleProps?: (...args: any[]) => Record<string, unknown>
  getParameters?: (...args: any[]) => Record<string, unknown>
  filter?: (...args: any[]) => boolean
}
/**
 * @typedef {Object} Page
 * @property {number} index
 * @property {ComponentExample[]} examples
 */
/**
 *
 * @typedef {Object} ExampleSection
 * @property {string} sectionName
 * @property {string} propName
 * @property {string} propValue
 * @property {Page[]} pages
 *
 *
 */

/** Generates Component prop examples based on an example generator definition.
 * @param {React.ComponentType} Component
 * @param {Object} config - the definition
 * @returns {ExampleSection[]}
 * @module generateComponentExamples
 * @private
 *
 */
export function generateComponentExamples(
  Component: React.ComponentType,
  config: Config
) {
  const { sectionProp, excludeProps, filter, maxExamples } = config

  const PROPS_CACHE: string[] = []
  const sections: any[] = []
  let exampleCount = 0
  let propValues = {}

  const getParameters = ({
    examples,
    index
  }: {
    examples: any[]
    index: number
  }) => {
    let parameters = {}
    if (typeof config.getParameters === 'function') {
      parameters = {
        ...config.getParameters(examples, index)
      }
    }
    return parameters
  }

  /**
   * Merges the auto-generated props with ones in the examples files,
   * a prop returned by getComponentProps() takes priority
   */
  const getComponentProps = (props: Record<string, any>) => {
    let componentProps = props
    if (typeof config.getComponentProps === 'function') {
      componentProps = {
        ...componentProps,
        ...config.getComponentProps(props)
      }
    }
    return componentProps
  }

  const getExampleProps = (props: Record<string, any>) => {
    let exampleProps = {}

    if (typeof config.getExampleProps === 'function') {
      exampleProps = {
        ...config.getExampleProps(props)
      }
    }

    return exampleProps
  }

  const addPage = (section: Record<string, any>) => {
    const page = {
      examples: [],
      index: section.pages.length
    }
    section.pages.push(page)
    return page
  }

  const addExample = (sectionName = 'Examples', example: unknown) => {
    let section = sections.find(
      (section) => section.sectionName === sectionName
    )
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
    } else if (
      maxExamplesPerPage &&
      page.examples.length % maxExamplesPerPage === 0 &&
      page.examples.length > 0
    ) {
      page = addPage(section)
    }

    page.examples.push(example)
  }

  const maybeAddExample = (props: Record<string, any>) => {
    const componentProps = getComponentProps(props)
    const ignore = typeof filter === 'function' ? filter(componentProps) : false
    if (ignore) {
      return
    }
    const propsString = Object.entries(componentProps).sort().toString() //JSON.stringify(componentProps)
    if (!PROPS_CACHE.includes(propsString)) {
      const key = nanoid()
      const exampleProps = getExampleProps(props)
      exampleCount++
      if (exampleCount < maxExamples) {
        PROPS_CACHE.push(propsString)
        addExample(componentProps[sectionProp!], {
          Component,
          componentProps,
          exampleProps,
          key
        })
      }
    }
  }

  if (isEmpty(config.propValues)) {
    maybeAddExample({})
  } else {
    if (Array.isArray(excludeProps)) {
      Object.keys(config.propValues!).forEach((propName) => {
        if (!excludeProps.includes(propName)) {
          //@ts-expect-error TODO: fix
          propValues[propName] = config.propValues[propName]
        }
      })
    } else {
      propValues = config.propValues!
    }

    // eslint-disable-next-line no-console
    console.info(
      `Generating examples for ${Component.displayName} (${Object.keys(propValues).length
      } props):`,
      propValues
    )

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
    console.error(
      `Too many examples for ${Component.displayName}! Add a filter to the config.`
    )
  }

  // eslint-disable-next-line no-console
  console.info(
    `Generated ${exampleCount} examples for ${Component.displayName}`
  )

  sections.forEach(({ pages }) => {
    pages.forEach((page: any) => {
      // eslint-disable-next-line no-param-reassign
      page.parameters = getParameters(page)
    })
  })

  return sections
}

function isEmpty(obj: unknown) {
  if (typeof obj !== 'object') return true
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) return false
  }
  return true
}

export default generateComponentExamples
