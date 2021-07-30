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
import { ComponentType, ReactNode } from 'react'

export type StoryConfig<Props> = {
  // actually lots of props are Partial<Props>
  sectionProp?: string
  maxExamplesPerPage?: number | ((sectionName: string) => number)
  maxExamples?: number
  propValues?: Record<string, any[]>
  excludeProps?: keyof Props[]
  getComponentProps?: (props: Props) => Record<string, any>
  getExampleProps?: (props: Props) => Record<string, any>
  getParameters?: (params: {
    examples: any
    index: number
  }) => { [key: string]: any; delay?: number; disable?: boolean }
  filter?: (props: Props) => boolean
}

type ExampleSection = {
  sectionName: string
  propName: string
  propValue: string
  pages: ExamplesPage[]
}

export type ExamplesPage = {
  examples: Example[]
  index: number
  renderExample?: (exampleProps: Example) => ReactNode
  parameters?: any
}

export type Example = {
  Component: ComponentType
  componentProps: Record<string, any>
  exampleProps: Record<string, any>
  key: string
}

/**
 * Generates examples for the given component based on the given configuration.
 * @param Component A React component
 * @param config A configuration object (stored in xy.examples.jsx files in InstUI)
 * @returns Array of examples broken into sections and pages if configured to do so.
 * @module generateComponentExamples
 * @private
 *
 */
export function generateComponentExamples<Props>(
  Component: ComponentType,
  config: StoryConfig<Props>
) {
  const { sectionProp, excludeProps, filter } = config

  const PROPS_CACHE: string[] = []
  const sections: ExampleSection[] = []
  const maxExamples = config.maxExamples!
  let exampleCount = 0
  let propValues: Record<string, any[]> = {}

  const getParameters = (page: ExamplesPage) => {
    const examples = page.examples
    const index = page.index
    let parameters = {}
    if (typeof config.getParameters === 'function') {
      parameters = {
        ...config.getParameters({ examples, index })
      }
    }
    return parameters
  }

  /**
   * Merges the auto-generated props with ones in the examples files specified
   * by the `getComponentProps()` method; props from the example files have
   * priority
   */
  const mergeComponentPropsFromConfig = (props: Props) => {
    let componentProps = props
    if (typeof config.getComponentProps === 'function') {
      componentProps = {
        ...componentProps,
        ...config.getComponentProps(props)
      }
    }
    return componentProps
  }

  const getExampleProps = (props: Props) => {
    let exampleProps = {}

    if (typeof config.getExampleProps === 'function') {
      exampleProps = {
        ...config.getExampleProps(props)
      }
    }

    return exampleProps
  }

  const addPage = (section: ExampleSection) => {
    const page = {
      examples: [],
      index: section.pages.length
    }
    section.pages.push(page)
    return page
  }

  const addExample = (sectionName = 'Examples', example: Example) => {
    let section = sections.find(
      (section) => section.sectionName === sectionName
    )
    if (!section) {
      section = {
        sectionName: sectionName,
        propName: sectionProp!, // TODO this should not be undefined
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

  const maybeAddExample = (props: Props) => {
    const componentProps = mergeComponentPropsFromConfig(props)
    const ignore = typeof filter === 'function' ? filter(componentProps) : false
    if (ignore) {
      return
    }
    // TODO this is wrong, it thinks that objects with object children are the same
    const propsString = Object.entries(componentProps).sort().toString()
    //const propsString = JSON.stringify(componentProps)
    if (!PROPS_CACHE.includes(propsString)) {
      const key = nanoid()
      const exampleProps = getExampleProps(props)
      exampleCount++
      if (exampleCount < maxExamples) {
        PROPS_CACHE.push(propsString)
        addExample((componentProps as any)[sectionProp!], {
          Component,
          componentProps,
          exampleProps,
          key
        })
      }
    }
  }

  if (isEmpty(config.propValues)) {
    maybeAddExample((config.propValues as unknown) as Props) // actually can be undefined
  } else {
    if (Array.isArray(excludeProps)) {
      Object.keys(config.propValues!).forEach((propName) => {
        if (!excludeProps.includes(propName)) {
          propValues[propName] = config.propValues![propName]
        }
      })
    } else {
      propValues = config.propValues!
    }

    // eslint-disable-next-line no-console
    console.info(
      `Generating examples for ${Component.displayName} (${
        Object.keys(propValues).length
      } props):`,
      propValues
    )

    const combos = generatePropCombinations(propValues).filter(Boolean)
    let index = 0
    while (index < combos.length && exampleCount < maxExamples) {
      const combo = combos[index]
      if (combo) {
        // TODO reconcile the differences between these files
        maybeAddExample(combo as any)
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
