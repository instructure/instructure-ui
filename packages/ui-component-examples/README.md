---
category: packages
---

## ui-component-examples

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
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
        use: ['component-examples-loader', 'babel-loader']
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

| Param  | Type     | Default     | Description                                                              |
| ------ | -------- | ----------- | ------------------------------------------------------------------------ |
| config | `Object` | `undefined` | the generator config object. See `config` section below for more details |

##### Returns

| Type    | Description                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------- |
| `Array` | array of examples broken into sections and pages if configured to do so. See `examples` section for more details |

##### Example config

```js
export default {
  sectionProp: 'variant',
  maxExamplesPerPage: 50,
  maxExamples: 200,
  excludeProps: [],
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
  getParameters: ({ examples, index }) => {
    return { delay: 200, viewports: [320, 1200] }
  }
}
```

**The `config` is an object that sets the configuration for the example generation. It has the following properties:**

### sectionProp

A string value used to divide the resulting examples into sections. It should correspond to an enumerated prop in the `Component`

| Type     | Default     |
| -------- | ----------- |
| `string` | `undefined` |

### maxExamplesPerPage

Specifies the max number of examples that can exist in a single page within a section

| Type                   | Default |
| ---------------------- | ------- |
| `number` or `function` | `null`  |

example:

```js
// providing a number
maxExamplesPerPage: 50

// providing a function
maxExamplesPerPage: (sectionName) => (sectionName === 'inverse' ? 20 : 50)
```

##### Parameters

| Param       | Type     | Default     | Description                             |
| ----------- | -------- | ----------- | --------------------------------------- |
| sectionName | `string` | `undefined` | the name of the current example section |

##### Returns

| Type     | Description                                       |
| -------- | ------------------------------------------------- |
| `number` | a number specifying the maximum examples per page |

### maxExamples

Specifies the total max number of examples

| Type     | Default |
| -------- | ------- |
| `number` | `500`   |

### propValues

An object with keys that correspond to the component props. Each key has a corresponding
value array. This array contains possible values for that prop.

| Type                                                        | Default     |
| ----------------------------------------------------------- | ----------- |
| `object` of keys corresponding to arrays of possible values | `undefined` |

example:

```js
propValues: {
 variant: ['circular', 'rectangular'],
 placement: ['top', 'bottom', 'start', 'end'],
 children: [null, <button>hello</button>, <a href="#">world</a>]
}
```

### excludeProps

Prop keys to exclude from `propValues`. Useful when generating `propValues` with code.

| Type               | Default |
| ------------------ | ------- |
| `array of Strings` | `[]`    |

example:

```js
excludeProps: ['readOnly', 'disabled']
```

### getComponentProps

A function called with the prop combination for the current example. It returns an object
of props that will be passed into the `renderExample` function as `componentProps`.

| Type       | Default     |
| ---------- | ----------- |
| `function` | `undefined` |

example:

```js
getComponentProps: (props) => ({
  // Change the size prop passed to the component based on the value of
  // `variant` in the current prop combination
  size: props.variant === 'circular' ? 'large' : 'small'
})
```

##### Parameters

| Param | Type     | Default     | Description                                  |
| ----- | -------- | ----------- | -------------------------------------------- |
| props | `Object` | `undefined` | the prop combination for the current example |

##### Returns

| Type     | Description                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| `Object` | a props object that will be passed to the `renderExample` function as `componentProps` |

### getExampleProps

A function called with the prop combination for the current example. It returns an object
of props that will be passed into the `renderExample` function as `exampleProps`.

| Type       | Default     |
| ---------- | ----------- |
| `function` | `undefined` |

example:

```js
getExampleProps: (props) => ({
  // Change the height prop passed to the example based on the value of
  // `placement` in the current prop combination
  height: props.placement === 'top' ? '50rem' : '10rem'
})
```

##### Parameters

| Param | Type     | Default     | Description                                  |
| ----- | -------- | ----------- | -------------------------------------------- |
| props | `Object` | `undefined` | the prop combination for the current example |

##### Returns

| Type     | Description                                                                          |
| -------- | ------------------------------------------------------------------------------------ |
| `Object` | a props object that will be passed to the `renderExample` function as `exampleProps` |

### getParameters

A function called with the examples and index for the current page of examples. It returns an object
of parameters/meta data for that page of examples (e.g. to be passed in to a visual regression tool like chromatic).

| Type       | Default     |
| ---------- | ----------- |
| `function` | `undefined` |

example:

```js
getParameters: ({ examples, index }) => ({
  // add a delay for the first page of examples only:
  return index === 1 ? { delay: 200 } : {}
})
```

##### Parameters

| Param | Type     | Default     | Description                                |
| ----- | -------- | ----------- | ------------------------------------------ |
| props | `Object` | `undefined` | the examples and index of the current page |

##### Returns

| Type     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `Object` | a parameters object with delay and viewport sizes configuration for the page |

### filter

A function to filter `propValues`, returns `boolean`. If it returns `true` the combination
is not generated.

| Type       | Default     |
| ---------- | ----------- |
| `function` | `undefined` |

example:

```js
filter: (props) => {
  return (
    props.type !== 'button' ||
    (props.textAlign === 'center' && props.display !== 'block')
  )
}
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-component-examples.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-component-examples
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
