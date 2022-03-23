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
import React, { ComponentType, ReactNode } from 'react'

export type StoryConfig<Props> = {
  /**
   * Used to divide the resulting examples into sections. It should correspond
   * to an enumerated prop in the Component
   */
  sectionProp?: keyof Props
  /**
   * Specifies the max number of examples that can exist in a single page
   * within a section
   */
  maxExamplesPerPage?: number | ((sectionName: string) => number)
  /**
   * Specifies the total max number of examples. Default: 500
   */
  maxExamples?: number
  /**
   * An object with keys that correspond to the component props. Each key has a
   * corresponding value array. This array contains possible values for that prop.
   */
  propValues?: Partial<Record<keyof Props | string, any[]>>
  /**
   * Prop keys to exclude from propValues. Useful when generating propValues with code.
   */
  excludeProps?: (keyof Props)[]
  /**
   * The values returned by this function are passed to the component.
   * A function called with the prop combination for the current example. It
   * returns an object of props that will be passed into the `renderExample`
   * function as componentProps.
   */
  getComponentProps?: (props: Props & Record<string, any>) => Partial<Props>
  /**
   * The values returned by this function are passed to a `View` that wraps the
   * example.
   * A function called with the prop combination for the current example. It
   * returns an object of props that will be passed into the `renderExample`
   * function as exampleProps.
   */
  getExampleProps?: (props: Props & Record<string, any>) => Record<string, any>
  /**
   * A function called with the examples and index for the current page of
   * examples. It returns an object of parameters/metadata for that page of
   * examples (e.g. to be passed in to a visual regression tool like chromatic).
   */
  getParameters?: (params: ExamplesPage<Props>) => {
    [key: string]: any
    delay?: number
    disable?: boolean
  }
  filter?: (props: Props) => boolean
}

type ExampleSection<Props> = {
  sectionName: string
  propName: keyof Props
  propValue: string
  pages: ExamplesPage<Props>[]
}

export type ExamplesPage<Props> = {
  examples: Example<Props>[]
  index: number
  renderExample?: (exampleProps: Example<Props>) => ReactNode
  parameters?: Record<string, unknown>
}

export type Example<Props> = {
  Component: ComponentType
  componentProps: Partial<Props>
  exampleProps: Record<string, any> // actually Partial<ViewProps>
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
  Component: ComponentType<any>,
  config: StoryConfig<Props>
) {
  const { sectionProp, excludeProps, filter } = config

  const PROPS_CACHE: string[] = []
  const sections: ExampleSection<Props>[] = []
  const maxExamples = config.maxExamples ? config.maxExamples : 500
  let exampleCount = 0
  let propValues: Partial<Record<keyof Props | string, any[]>> = {}

  const getParameters = (page: ExamplesPage<Props>) => {
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
    // TODO this code is so complicated because getComponentProps(props) can return
    // different values based on its props parameter.
    // If it would always return the same thing then we could reduce the
    // number of combinations generated by generatePropCombinations() by
    // getComponentProps() reducing some to 1 value, it would also remove the
    // need of PROPS_CACHE and duplicate checks.
    // InstUI is not using the 'props' param of getComponentProps(), but others are
    if (typeof config.getComponentProps === 'function') {
      componentProps = {
        ...componentProps,
        ...config.getComponentProps(props)
      }
    }
    return componentProps
  }

  const getExampleProps = (props: Props) => {
    let exampleProps: Record<string, unknown> = {}
    if (typeof config.getExampleProps === 'function') {
      exampleProps = {
        ...config.getExampleProps(props)
      }
    }
    return exampleProps
  }

  const addPage = (section: ExampleSection<Props>) => {
    const page: ExamplesPage<Props> = {
      examples: [],
      index: section.pages.length
    }
    section.pages.push(page)
    return page
  }

  const addExample = (sectionName: string, example: Example<Props>) => {
    let section = sections.find(
      (section) => section.sectionName === sectionName
    )
    if (!section) {
      section = {
        sectionName: sectionName,
        propName: sectionProp!,
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

  // Serializes the given recursively, faster than JSON.stringify()
  const fastSerialize = (props: Props) => {
    const strArr: string[] = []
    objToString(props, strArr)
    return strArr.join('')
  }

  const objToString = (currObject: any, currString: string[]) => {
    if (!currObject) {
      return
    }
    if (React.isValidElement(currObject)) {
      currString.push(JSON.stringify(currObject))
    } else if (typeof currObject === 'object') {
      for (const [key, value] of Object.entries(currObject)) {
        currString.push(key)
        objToString(value, currString)
      }
    } else {
      currString.push(currObject)
    }
  }

  const maybeAddExample = (props: Props): void => {
    const componentProps = mergeComponentPropsFromConfig(props)
    const ignore = typeof filter === 'function' ? filter(componentProps) : false
    if (ignore) {
      return
    }
    const propsString = fastSerialize(componentProps)
    if (!PROPS_CACHE.includes(propsString)) {
      const key = nanoid()
      const exampleProps = getExampleProps(props)
      exampleCount++
      if (exampleCount < maxExamples) {
        PROPS_CACHE.push(propsString)
        let sectionName = 'Examples'
        if (sectionProp && componentProps[sectionProp]) {
          sectionName = componentProps[sectionProp] as unknown as string
        }
        addExample(sectionName, {
          Component,
          componentProps,
          exampleProps,
          key
        })
      }
    }
  }

  if (isEmpty(config.propValues)) {
    maybeAddExample({} as Props)
  } else {
    if (Array.isArray(excludeProps)) {
      ;(Object.keys(config.propValues) as (keyof Props)[]).forEach(
        (propName) => {
          if (!excludeProps.includes(propName)) {
            propValues[propName] = config.propValues![propName]
          }
        }
      )
    } else {
      propValues = config.propValues
    }
    // eslint-disable-next-line no-console
    console.info(
      `Generating examples for ${Component.displayName} (${
        Object.keys(propValues).length
      } props):`,
      propValues
    )
    // TODO reconcile the differences between these files
    // generatePropCombinations should call getComponentProps and not do anything?
    const combos = generatePropCombinations(propValues as any).filter(Boolean)
    let index = 0
    while (index < combos.length && exampleCount < maxExamples) {
      const combo = combos[index]
      if (combo) {
        maybeAddExample(combo as Props)
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
    pages.forEach((page) => {
      // eslint-disable-next-line no-param-reassign
      page.parameters = getParameters(page)
    })
  })
  return sections
}

function isEmpty(
  obj: unknown
): obj is null | undefined | Record<string, never> {
  if (typeof obj !== 'object') return true
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) return false
  }
  return true
}

export default generateComponentExamples
