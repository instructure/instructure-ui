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

/**
 * ---
 * category: utilities
 * title: generateComponentExamples
 * id: generateComponentExamples
 * ---
 * Given a configuration object, returns an array of generated examples.
 *
 * #### Example
 * ```js
 * const result = generateComponentExamples(config)
 * ```
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | config | `Object` | `undefined` | the generator config object. See `config` section for more details |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `Array` | array of examples broken into sections and pages if configured to do so. See `examples` section for more details |
 *
 * ## config
 * The `config` is an object that sets the configuration for the example generation. It has the
 * following properties:
 *
 *
 * ### sectionProp
 * A string value used to divide the resulting examples into sections. It should correspond to an enumerated prop in the `Component`
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `string` | `undefined` |
 *
 *
 * ### maxExamplesPerPage
 * Specifies the max number of examples that can exist in a single page within a section
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `number` or `function` | `null` |
 *
 * #### Example
 * ```js
 * // providing a number
 * maxExamplesPerPage: 50
 *
 * // providing a function
 * maxExamplesPerPage: (sectionName) => sectionName === 'inverse' ? 20 : 50
 * ```
 *
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | sectionName | `string` | `undefined` | the name of the current example section |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `number` | a number specifying the maximum examples per page |
 *
 * ### propValues
 *
 * An object with keys that correspond to the component props. Each key has a corresponding
 * value array. This array contains possible values for that prop.
 *
 * To avoid having to manually write out every possible value for all props in each example
 * config, we have tools available to facilitate parsing boolean and enumerated prop values.
 * See the README for [@instructure/ui-component-examples](#ui-component-examples) for documentation and example usage.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `object` of keys corresponding to arrays of possible values  | `undefined` |
 *
 * #### Example
 * ```js
 * propValues: {
 *   variant: ['circular', 'rectangular'],
 *   placement: ['top', 'bottom', 'start', 'end'],
 *   children: [null, <button>hello</button>, <a href="#">world</a>]
 * }
 * ```
 *
 * ### getComponentProps
 *
 * A function called with the prop combination for the current example. It returns an object
 * of props that will be passed into the `renderExample` function as `componentProps`.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `function` | `undefined` |
 *
 * #### Example
 * ```js
 * getComponentProps: (props) => ({
 *   // Change the size prop passed to the component based on the value of
 *   // `variant` in the current prop combination
 *   size: props.variant === 'circular' ? 'large' : 'small'
 * })
 * ```
 *
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | props | `Object` | `undefined` | the prop combination for the current example |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `Object` | a props object that will be passed to the `renderExample` function as `componentProps` |
 *
 *
 * ### getExampleProps
 *
 * A function called with the prop combination for the current example. It returns an object
 * of props that will be passed into the `renderExample` function as `exampleProps`.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `function` | `undefined` |
 *
 * #### Example
 * ```js
 * getExampleProps: (props) => ({
 *   // Change the height prop passed to the example based on the value of
 *   // `placement` in the current prop combination
 *   height: props.placement === 'top' ? '50rem' : '10rem'
 * })
 * ```
 *
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | props | `Object` | `undefined` | the prop combination for the current example |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `Object` | a props object that will be passed to the `renderExample` function as `exampleProps` |
 *
 *
 * ### renderExample
 * A optional function which receives the component and example props and returns an example.
 *
 * #### Example
 * ```js
 * renderExample: ({ Component, componentProps, exampleProps, key }) => {
 *   return <View key={key} {...exampleProps}><Component {...componentProps} /></View>
 * }
 * ```
 *
 * #### Parameters
 * The parameters consist of an object with the following properties
 *
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | Component | `ReactComponent` | `undefined` | the component to render |
 * | componentProps | `Object` | `undefined` | props corresponding to the component. The result of the `getComponentProps` method |
 * | exampleProps | `Object` | `undefined` | props corresponding to the example. The result of the `getExampleProps` method |
 * | key | `string` | `undefined` | a unique key generated for each example |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `ReactComponent` | the rendered example |
 *
 * ### renderPage
 * An optional function which receives an array of examples and a function to render them.
 *
 * #### Example
 * ```js
 * renderPage: ({ examples, renderExample }) => {
 *   return <View margin="small">{ examples.map(renderExample) }</View>
 * }
 * ```
 *
 * #### Parameters
 * The parameters consist of an object with the following properties
 *
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | examples | `Array` | `undefined` | array of example objects with properties identical to those outlined in the `renderExample` params |
 * | renderExample | `function` | Identical to the default in the `renderExample` section | The render method for each component example |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `ReactComponent` | the rendered page of examples |
 *
 *
 * ### Example config
 * ```js
 * {
 *   sectionProp: 'variant',
 *   maxExamplesPerPage: 50,
 *   propValues: {
 *     variant: ['circular', 'rectangular'],
 *     placement: ['top', 'bottom', 'start', 'end'],
 *     children: [null, <button>hello</button>, <a href="#">world</a>]
 *   },
 *   getComponentProps: (props) => ({
 *     size: props.variant === 'circular' ? 'large' : 'small'
 *   }),
 *   getExampleProps: (props) => ({
 *     height: props.placement === 'top' ? '50rem' : '10rem'
 *   }),
 *   renderExample: ({ Component, componentProps, exampleProps, key }) => {
 *     return <View key={key} {...exampleProps}><Component {...componentProps} /></View>
 *   },
 *   renderPage: ({ examples, key, renderExample }) => {
 *     return <View key={key}>{examples.map(renderExample)}</View>
 *   }
 * }
 * ```
 */
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
