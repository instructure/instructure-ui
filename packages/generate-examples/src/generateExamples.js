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
import objectHash from 'object-hash'

import View from '@instructure/ui-layout/lib/View'

import generatePropCombinations from './generatePropCombinations'

/**
 * ---
 * category: utilities
 * ---
 * Given an array of `modules` and an object of `options`, returns an array of generated examples
 *
 * #### Example
 * ```js
 * const examples = generateExamples(modules, options)
 * ```
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | modules | `Array` | `undefined` | array of modules. See `module` section for more details |
 * | options | `Object` | `undefined` | the generator options object. See `options` section for more details |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `Array` | array of examples. See `examples` section for more details |
 *
 * ## module
 * A `module` is an object with the following properties:
 *
 * | Property     | Type     | Notes    |
 * |----------|-------------|----------|
 * | displayName | string | the name of the component |
 * | component | ReactComponent | the react component |
 * | config | Object | the example configuration object. See `config` section for more details |
 * | props | Object | an object mapping prop names to arrays of possible prop values. See `props` section for more details |
 *
 * ## config
 * The module `config` is an object that sets the configuration for the example generation. It has the
 * following properties:
 *
 * ### sections
 * A string value used to divide the resulting examples into sections. It should correspond to an enumerated prop in the `Component`
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `string` | `undefined` |
 *
 *
 * ### defaultSectionName
 * When no section name is provided, this property specifies a value to use instead
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `string` | 'Examples' |
 *
 * ### maxExamplesPerPage
 * Specifies the max number of examples that can exist in a single page
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
 * ### permutations
 * An array of values designating which props will be used to generate the component permutations.
 * The array entries can consist of an object or string. When an object is supplied, it has a key
 * which corresponds to one of the component props and a value which is an array of possible values.
 *
 * To avoid having to enumerate all possible values for every permutation entry in the config, a
 * `props` object can be supplied to the module. When a `props` object has been provided, a
 * simple string entry can be used in the config which corresponds to a value in the `props`
 * object. See the `props` section below for more details.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `Array` of `string` or `object` entries | `undefined` |
 *
 * #### Example
 * ```js
 * permutations: [
 *   // specifying each value for a prop
 *   { children: [null, <button>hello</button>, <a href="#">world</a>] },
 *   // specifying a string when a `props` object has been provided for this module
 *   'variant'
 * ]
 * ```
 *
 * ### renderProps
 * A function returning an object. The returned object consists of one or more of the following:
 * * componentProps - An object that will be combined with the current prop combination and passed to the `renderExample` method
 * * exampleProps - An object that will be combined with any example props from the options and passed to the `renderExample` method
 * * filter - A boolean flag. When true, an example is not created for the current combination of props
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `function` | `undefined` |
 *
 * #### Example
 * ```js
 * renderProps: (props) => {
 *   // component props specified here are combined with the current props passed to this render
 *   // function. The combination of those props is passed to the `renderExample` method
 *   componentProps: {
 *     display: 'block',
 *     size: props.variant === 'circle' ? 'large' : 'small'
 *   },
 *   // example props specified here are combined with any example props specified in the config
 *   // and are passed to the `renderExample` method
 *   exampleProps: {
 *     background: 'default'
 *   },
 *   filter: props.variant === 'circle' && !props.children
 * }
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
 * | `Object` | an object consisting of one or more of the following: `componentProps`, `exampleProps`, or `filter` |
 *
 * ### renderExample
 * A function which receives the component and example props and returns an example.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `function` | `(Component, componentProps, exampleProps, key) => (<View key={key} display="block" margin="small"><Component {...componentProps} /></View>`) |
 *
 * #### Example
 * ```js
 * renderExample: (Component, componentProps, exampleProps, key) => {
 *   return <View key={key} {...exampleProps}><Component {...componentProps} /></View>
 * }
 * ```
 *
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | Component | `ReactComponent` | `undefined` | the component to render |
 * | componentProps | `Object` | `undefined` | props corresponding to the component. Includes props specified in the config renderProps concatenated with the current prop combination for this example |
 * | exampleProps | `Object` | `undefined` | props corresponding to the example. Includes props specified in the config renderProps concatenated with any example props specified in the generator options |
 * | key | `string` | `undefined` | a unique key generated for each example |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `ReactComponent` | the example component to render |
 *
 * ### renderLayout
 * A function which receives an array of examples and returns a layout.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `function` | `(examples, sectionName) => <View display="block">{examples}</View>` |
 *
 * #### Example
 * ```js
 * renderLayout: (examples, sectionName) => {
 *   // change layout options based on the section
 *   const background = sectionName === 'circle' ? 'inverse' : 'default'
 *   return <View display="block" background={background}>{examples}</View>
 * }
 * ```
 *
 * #### Parameters
 * | Param     | Type     | Default    | Description    |
 * |----------|-------------|----------|----------|
 * | examples | `Array` | `undefined` | array of examples resulting from the `renderExample` function |
 * | sectionName | `string` | `undefined` | string representing the name of the section |
 *
 * #### Returns
 * | Type     | Description |
 * |----------|-------------|
 * | `ReactComponent` | the layout component to render |
 *
 * ### Example config
 * ```js
 * {
 *   sections: 'variant',
 *   defaultSectionName: 'Component Examples'
 *   maxExamplesPerPage: 50,
 *   permutations: [
 *     'variant',
 *     'size',
 *     { children: [null, <button>hello</button>, <a href="#">world</a>] }
 *   ],
 *   renderProps: (props) => {
 *     return {
 *       componentProps: {
 *         display: 'block',
 *         label: props.variant === 'circle' ? 'circle label' : 'square label'
 *       },
 *       exampleProps: {
 *         background: props.children ? 'inverse' : 'default'
 *       },
 *       filter: props.variant === 'circle' && !props.children
 *     }
 *   },
 *   renderExample: (Component, componentProps, exampleProps, key) => {
 *     return <View key={key} {...exampleProps}><Component {...componentProps} /></View>
 *   },
 *   renderLayout: (examples, sectionName) => {
 *     // change layout options based on the section
 *     const background = sectionName === 'circle' ? 'inverse' : 'default'
 *     return <View display="block" background={background}>{examples}</View>
 *   }
 * }
 * ```
 *
 * ## props
 * An object mapping prop names to possible prop values.
 *
 * Inside of the config, the permutations array is used to generate the prop combinations. The
 * `props` object can be used to supply values so that they do not all have to be enumerated
 * in the config.
 *
 * #### Example
 * ```js
 * const props = {
 *   variant: ['circle', 'square'],
 *   display: ['auto', 'block', 'inline-block', 'flex']
 * }
 *
 * class Foo extends React.Component {
 *   static displayName = 'Foo'
 *
 *   static propTypes = {
 *     variant: PropTypes.oneOf(props.variant),
 *     display: PropTypes.oneOf(props.display),
 *     children: PropTypes.node
 *   }
 *   ...
 * }
 *
 * const config = {
 *   sections: 'variant',
 *   permutations: {
 *     'variant',
 *     'display',
 *     { children: [null, 'foo', 'bar']}
 *   }
 *   ...
 * }
 *
 * const examples = generateExamples([{
 *   displayName: Foo.displayName,
 *   component: Foo
 *   config,
 *   props
 * }])
 * ```
 * In the above example, we do not have to specify every possible value for `variant` and
 * `display` in the config. Instead, we can just provide a string corresponding to the name
 * of the prop and the values will be provided by the `props` object.
 *
 * ## options
 * An object specifying options for the example generator. It shares the following properties
 * with the examples config (see the `config` section for documentation)
 * * `defaultSectionName`
 * * `maxExamplesPerPage`
 * * `renderExample`
 * * `renderLayout`
 *
 * When these properties are supplied in the options, they are applied to every example. If
 * the same property is specified in both the config and the options, preference is given to
 * the config.
 *
 * ### exampleProps
 * In addition to the previously listed properties, options also accepts an `exampleProps` object.
 * Example props specified here will be passed to each `renderExample` method. Note that example props
 * specified in the individual config files will override example props sepecified in the options.
 *
 * | Type     | Default     |
 * |----------|-------------|
 * | `Object` | `{}` |
 *
 * ## examples
 * The example generator returns an array of objects. These objects contain sections of examples.
 *
 *
 * | Property     | Type     | Notes    |
 * |----------|-------------|----------|
 * | name | `string` | the name of the example |
 * | sections | `Array` | an array of `section` objects |
 *
 * ### section
 * A section is an object with the following properties:
 *
 * | Property     | Type     | Notes    |
 * |----------|-------------|----------|
 * | name | `string` | the name of the example |
 * | components | `Array` | an array of components before being converted to examples via the `renderExamples` method |
 * | examples | `Array` | an array of examples. The output of the `renderExamples` method |
 * | pages | `Array` | an array of layout pages. See the `pages` section for more details |
 *
 * ### pages
 * Each section has an array of pages. If `maxExamplesPerPage` is null, all pages are rendered within a
 * single layout and `pages` has only one entry. For visual regression testing, however, we encountered
 * situations where too many examples in a single layout broke our testing tools. By setting `maxExamplesPerPage`,
 * once a page reaches a count of examples equal to the maximum limit a new entry in the pages array is
 * created. Each entry in the `pages` array is the result of the `renderLayout` function.
 */
export default function generateExamples (modules, options = {}) {
  const examples = []

  modules.forEach((module) => {
    try {
      const generator = new ExampleGenerator(module, options)
      examples.push(generator.generateExamples())
    } catch (e) {
      console.error(`[generateExamples] ${e}`)
      return
    }
  })

  return examples
}

class ExampleGenerator {
  constructor (module, options = {}) {
    // parse module
    this.module = module
    this.displayName = this.getModuleProp('displayName')
    this.component = this.getModuleProp('component')
    this.config = this.module.config || {}
    this.props = this.module.props

    // parse options
    this.options = {
      defaultSectionName: (
        this.config.defaultSectionName ||
        options.defaultSectionName ||
        'Examples'
      ),
      maxExamplesPerPage: (
        this.config.maxExamplesPerPage ||
        options.maxExamplesPerPage ||
        null
      ),
      exampleProps: {
        ...(options.exampleProps || {})
      },
      renderExample: (
        this.config.renderExample ||
        options.renderExample ||
        /* eslint-disable react/display-name */
        function (Component, componentProps, exampleProps, key) {
          return (
            <View
              key={key}
              display="block"
              margin="small"
            >
              <Component {...componentProps} />
            </View>
          )
        }
        /* eslint-enable react/display-name */
      ),
      renderLayout: (
        this.config.renderLayout ||
        options.renderLayout ||
        /* eslint-disable react/display-name */
        function (examples, sectionName) {
          return <View display="block">{examples}</View>
        }
        /* eslint-enable react/display-name */
      )
    }
  }

  getModuleProp (prop) {
    if (this.module[prop]) {
      return this.module[prop]
    } else {
      throw new Error([
        `Could not initialize the examples generator for ${this.displayName || 'component'}.`,
        `Expected value for '${prop}' but found ${this.module[prop]}.`
      ].join(' '))
    }
  }

  getMaxExamplesPerPage (section) {
    const { maxExamplesPerPage } = this.options
    if (maxExamplesPerPage) {
      return typeof maxExamplesPerPage === 'function' ? maxExamplesPerPage(section) : maxExamplesPerPage
    }
  }

  getRenderProps (props) {
    let componentProps = props
    let exampleProps = this.options.exampleProps
    let filter = false

    if (this.config.renderProps && typeof this.config.renderProps === 'function') {
      const renderProps = this.config.renderProps(props) || {}

      componentProps = {
        ...componentProps,
        ...renderProps.componentProps
      }

      exampleProps = {
        ...exampleProps,
        ...renderProps.exampleProps
      }

      filter = renderProps.filter
    }

    return {
      componentProps,
      exampleProps,
      filter
    }
  }

  collectPropValues () {
    const propValues = {}

    if (this.config.permutations) {
      this.config.permutations.forEach((permutation) => {
        // if permutation is an object, the object already contains the combinations
        if (typeof permutation === 'object') {
          Object.keys(permutation).forEach((entry) => {
            propValues[entry] = permutation[entry]
          })
          return
        }

        if (this.props) {
          const propValue = this.props[permutation]

          if (!propValue) {
            console.error(`[ExampleGenerator] ${this.displayName} does not have the following prop: '${permutation}'.`)
            return
          }

          propValues[permutation] = propValue
        }
      })
    }

    return propValues
  }

  createSection (sectionName, propValues) {
    const components = []
    const examples = []

    const pages = []
    let page = []
    const appendPage = () => {
      pages.push(this.options.renderLayout(page, sectionName))
      page = []
    }
    const maxExamplesPerPage = this.getMaxExamplesPerPage(sectionName)

    generatePropCombinations(propValues).forEach((propCombination) => {
      const { componentProps, exampleProps, filter } = this.getRenderProps(propCombination)

      if (filter) return

      const Component = this.component

      const key = objectHash(componentProps)
      const example = this.options.renderExample(Component, componentProps, exampleProps, key)

      components.push(<Component {...componentProps} />)
      examples.push(example)
      page.push(example)

      if (maxExamplesPerPage && page.length % maxExamplesPerPage === 0 && page.length > 0) {
        appendPage()
      }
    })

    if (page.length > 0) {
      appendPage()
    }

    return {
      name: sectionName,
      components,
      examples,
      pages
    }
  }

  generateExamples () {
    const propValues = this.collectPropValues()
    const sectionNames = propValues[this.config.sections]
    const sections = []

    if (sectionNames) {
      sectionNames.forEach((sectionName) => {
        sections.push(
          this.createSection(
            sectionName,
            {...propValues, [this.config.sections]: [sectionName]}
          )
        )
      })
    } else {
      sections.push(
        this.createSection(this.options.defaultSectionName, propValues)
      )
    }

    return {
      name: this.displayName,
      sections
    }
  }
}
