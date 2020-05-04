---
category: packages
---

## ui-component-examples

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A utility for automatically generating component examples.

### Installation

```sh
yarn add @instructure/ui-component-examples
```

### Usage

#### Using the webpack loader

For convenience, this package contains a webpack loader which can be used
to load example configuration files. In the loader, each configuration file is
passed to the `generateComponentExamples` function to generate examples.

In your webpack.config.js:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/\.examples\.js/],
        use: [
          'component-examples-loader',
          'babel-loader'
        ]
      }
    ]
  }
}
```

> Note: As of version 7, the component examples loader does not include default functions for `renderPage` and `renderExample`. These should be provided in the client of the consumer.

#### Calling the `generateComponentExamples` function directly

The `generateComponentExamples` function can be called directly as follows:

```js
import { generateComponentExamples } from '@instructure/ui-component-examples'

const result = generateComponentExamples(config)
```

Given a configuration object, `generateComponentExamples` returns an array of generated examples:

##### Parameters
| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| config | `Object` | `undefined` | the generator config object. See `config` section below for more details |

##### Returns
| Type     | Description |
|----------|-------------|
| `Array` | array of examples broken into sections and pages if configured to do so. See `examples` section for more details |

##### Example config
```js
export default {
 sectionProp: 'variant',
 maxExamplesPerPage: 50,
 maxExamples: 200,
 propValues: {
   variant: ['circular', 'rectangular'],
   placement: ['top', 'bottom', 'start', 'end'],
   children: [null, <button>hello</button>, <a href="#">world</a>]
 },
 getComponentProps: (props) => ({
   size: props.variant === 'circular' ? 'large' : 'small'
 }),
 getExampleProps: (props) => ({
   height: props.placement === 'top' ? '50rem' : '10rem'
 }),
 renderExample: ({ Component, componentProps, exampleProps, key }) => {
   return <View key={key} {...exampleProps}><Component {...componentProps} /></View>
 },
 renderPage: ({ examples, key, renderExample }) => {
   return <View key={key}>{examples.map(renderExample)}</View>
 },
 getParameters: ({ examples, index}) {
   return { delay: 200, viewports: [320, 1200] }
 }
}
```

The `config` is an object that sets the configuration for the example generation. It has the
following properties:

#### sectionProp
A string value used to divide the resulting examples into sections. It should correspond to an enumerated prop in the `Component`

| Type     | Default     |
|----------|-------------|
| `string` | `undefined` |


#### maxExamplesPerPage
Specifies the max number of examples that can exist in a single page within a section

| Type     | Default     |
|----------|-------------|
| `number` or `function` | `null` |


```js
// providing a number
maxExamplesPerPage: 50

// providing a function
maxExamplesPerPage: (sectionName) => sectionName === 'inverse' ? 20 : 50
```

##### Parameters
| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| sectionName | `string` | `undefined` | the name of the current example section |

##### Returns
| Type     | Description |
|----------|-------------|
| `number` | a number specifying the maximum examples per page |


#### maxExamples
Specifies the total max number of examples

| Type     | Default     |
|----------|-------------|
| `number` | `500` |

#### propValues

An object with keys that correspond to the component props. Each key has a corresponding
value array. This array contains possible values for that prop.

To avoid having to manually write out every possible value for all props in each example
config, we have tools available to facilitate parsing boolean and enumerated prop values.
See the README for [@instructure/ui-component-examples](#ui-component-examples) for documentation and example usage.

| Type     | Default     |
|----------|-------------|
| `object` of keys corresponding to arrays of possible values  | `undefined` |


```js
propValues: {
 variant: ['circular', 'rectangular'],
 placement: ['top', 'bottom', 'start', 'end'],
 children: [null, <button>hello</button>, <a href="#">world</a>]
}
```

#### getComponentProps

A function called with the prop combination for the current example. It returns an object
of props that will be passed into the `renderExample` function as `componentProps`.

| Type     | Default     |
|----------|-------------|
| `function` | `undefined` |


```js
getComponentProps: (props) => ({
 // Change the size prop passed to the component based on the value of
 // `variant` in the current prop combination
 size: props.variant === 'circular' ? 'large' : 'small'
})
```

##### Parameters
| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| props | `Object` | `undefined` | the prop combination for the current example |

##### Returns
| Type     | Description |
|----------|-------------|
| `Object` | a props object that will be passed to the `renderExample` function as `componentProps` |


#### getExampleProps

A function called with the prop combination for the current example. It returns an object
of props that will be passed into the `renderExample` function as `exampleProps`.

| Type     | Default     |
|----------|-------------|
| `function` | `undefined` |


```js
getExampleProps: (props) => ({
 // Change the height prop passed to the example based on the value of
 // `placement` in the current prop combination
 height: props.placement === 'top' ? '50rem' : '10rem'
})
```

##### Parameters
| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| props | `Object` | `undefined` | the prop combination for the current example |

##### Returns
| Type     | Description |
|----------|-------------|
| `Object` | a props object that will be passed to the `renderExample` function as `exampleProps` |


#### renderExample
A optional function which receives the component and example props and returns an example.

```js
renderExample: ({ Component, componentProps, exampleProps, key }) => {
 return <View key={key} {...exampleProps}><Component {...componentProps} /></View>
}
```

##### Parameters
The parameters consist of an object with the following properties

| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| Component | `ReactComponent` | `undefined` | the component to render |
| componentProps | `Object` | `undefined` | props corresponding to the component. The result of the `getComponentProps` method |
| exampleProps | `Object` | `undefined` | props corresponding to the example. The result of the `getExampleProps` method |
| key | `string` | `undefined` | a unique key generated for each example |

##### Returns
| Type     | Description |
|----------|-------------|
| `ReactComponent` | the rendered example |

#### renderPage
An optional function which receives an array of examples and a function to render them.

```js
renderPage: ({ examples, renderExample }) => {
 return <View margin="small">{ examples.map(renderExample) }</View>
}
```

##### Parameters
The parameters consist of an object with the following properties

| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| examples | `Array` | `undefined` | array of example objects with properties identical to those outlined in the `renderExample` params |
| renderExample | `function` | Identical to the default in the `renderExample` section | The render method for each component example |

##### Returns
| Type     | Description |
|----------|-------------|
| `ReactComponent` | the rendered page of examples |


#### getParameters

A function called with the examples and index for the current page of examples. It returns an object
of parameters/meta data for that page of examples (e.g. to be passed in to a visual regression tool like chromatic).

| Type     | Default     |
|----------|-------------|
| `function` | `undefined` |


```js
getParameters: ({ examples, index }) => ({
  // add a delay for the first page of examples only:
  index === 1 ? { delay: 200 } : {}
})
```

##### Parameters
| Param     | Type     | Default    | Description    |
|----------|-------------|----------|----------|
| props | `Object` | `undefined` | the examples and index of the current page |

##### Returns
| Type     | Description |
|----------|-------------|
| `Object` | a parameters object with delay and viewport sizes configuration for the page |



[npm]: https://img.shields.io/npm/v/@instructure/ui-ui-component-examples.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-ui-component-examples

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md