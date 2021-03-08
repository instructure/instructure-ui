---
category: packages
---

## emotion

The [Emotion design library's](https://emotion.sh/) implementation in Instructure UI.

With this framework, each UI component can be used in isolation and support multiple themes, including dynamic themes provided at runtime, while still working within a system of components that use a shared global theme.

### Motivation

1. Two-tiered theme variable system: system-wide variables + component level variables. With this variable system, components can be themed, tested, and rendered in isolation from the rest of the system, and we can mitigate issues that may arise with system-wide theme updates.

2. Runtime theme application and definition: to apply user/account level themes without using the CSS cascade.

3. Prevent CSS Cascade bugs: All components should specify variants via props or component level theme variables only (no className or style overrides) with a clear API and should not rely on any external styles.

4. Theme variables should be accessible in JS.

5. All component styles should be scoped to the component.

6. Pre-render/server-side render support (inline critical CSS).

7. Use a popular, well maintained and broadly adopted JS design and theming library that supports runtime theme switching ([Emotion](https://emotion.sh/)).

### Installation

```sh
yarn add @instructure/emotion
```

### Usage

Make a component themeable with the [withStyle](#withStyle) decorator. It adds a `makeStyles` function and the generated `styles` object to the decorated Component's props.

Import the style generator (`generateStyle`) from `styles.js` and the component theme generator (`generateComponentTheme`) from `theme.js`, and pass them to the decorator.

Call the `makeStyles` method (available on `this.props`) in the `componentDidMount` and `componentDidUpdate` lifecycle methods to generate the styles object and to keep it properly recalculated on every change.

In the `render` method, use emotion's `css={this.props.styles.componentName}` syntax to add styles.

```jsx
// Button/index.js

/** @jsx jsx */
import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

@withStyle(generateStyle, generateComponentTheme)
class Button extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  render() {
    const { propVal1, styles, ...props } = this.props

    return (
      <button css={styles.button}>
        <svg css={styles.icon}>...</svg>
        ...
      </button>
    )
  }
}

export { Button }
export default Button
```

Themeable components inject their themed styles into the document when they are mounted.

A themeable component’s theme can be configured by wrapping it in an [EmotionThemeProvider](#EmotionThemeProvider) component, and/or set explicitly via its `themeOverride` prop (see [withStyle](#withStyle/#applying-themes) documentation).

#### EmotionThemeProvider

`EmotionThemeProvider` is a React component, which wraps Emotion's own `ThemeProvider`.

It accepts a `theme` prop, which should be an Instructure UI theme.

It can be used in two ways. On the top level, you can provide the theme for the whole application or nested anywhere inside it. You can also provide an object with theme or component theme overrides.

**For detailed usage info and examples, see the [EmotionThemeProvider](#EmotionThemeProvider) documentation page.**

```jsx
import Button from './Button'
import { EmotionThemeProvider } from '@instructure/emotion'
import { canvasHighContrast } from '@instructure/ui-themes'

const RenderApp = () => {
  return (
    <EmotionThemeProvider theme={canvasHighContrast}>
      <Button />
    </EmotionThemeProvider>
  )
}
```

### Defining variables

The themeable component uses the JS variables defined in the `theme.js` file.

For example, to add a variable for the hover state of a Button component, the theme.js file might contain the following:

```js
// Button/theme.js
const generateComponentTheme = (theme) => {
  const { colors } = theme

  const componentVariables = {
    background: colors?.backgroundMedium,
    color: colors?.textDarkest,

    hoverColor: colors?.textLightest,
    hoverBackground: colors?.backgroundDarkest
  }

  return componentVariables
}
export default generateComponentTheme
```

The arguments to the generator function are the [global theme variables](#canvas). In the above example, we've defined the default theme for the Button component.

The purpose of the generator function is to take the global variables and apply them as values to the functional component level variables.
When coming up with names for the component level variables, try to make them describe how they are used in the component (vs describing the variable value).

### Supporting multiple themes

If we want to make the Button transform the global theme variables differently with another theme, (e.g. [canvas-high-contrast](#canvas-high-contrast)) we can make specific styling for that theme:

```js
// Button/theme.js
const generateComponentTheme = (theme) => {
  const { colors, key: themeName } = theme

  const themeSpecificStyle = {
    'canvas-high-contrast': {
      background: colors.backgroundLightest
    }
  }

  const componentVariables = {
    background: colors?.backgroundMedium,
    color: colors?.textDarkest,

    hoverColor: colors?.textLightest,
    hoverBackground: colors?.backgroundDarkest
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}
export default generateComponentTheme
```

This will override the default Button theme and use the global theme variable `colors.textLightest` for the value of its `background` theme variable instead of `colors.tiara`.

The rest of the variables will pick up from the default Button theme generator (applying the global theme variables from the `canvas-high-contrast` theme).

### Using theme variables in styles.js

In the `styles.js` file, the `generateStyle` method receives the theme variable object (`componentTheme`) generated by `theme.js`.

Add your styling for each element in the component, and give them [labels](#https://emotion.sh/docs/labels#gatsby-focus-wrapper) for easy readability and targetability. _Naming convention_: similar to [BEM naming convention](#http://getbem.com/naming/), use the name of the component in camelCase for the root element ('button'), and the double underscore suffix for children ('button\_\_icon').

Use [Emotion's Object Styles documentation](https://emotion.sh/docs/object-styles) as a guide to add styles.

Note: Don't worry about scoping your CSS variables (the [emotion](#emotion) library will take care of that for you):

```js
// Button/styles.js
const generateStyle = (componentTheme, props, state) => {
  return {
    button: {
      label: 'button',
      background: componentTheme.background,
      color: componentTheme.color,

      '&:hover': {
        background: componentTheme.hoverBackground,
        color: componentTheme.hoverColor
      }
    },
    icon: {
      label: 'button__icon',
      display: 'inline-block',
      fill: 'currentColor'
    }
  }
}
export default generateStyle
```

The `generateStyle` method also automatically receives all the props of the component, so you can add styling based on them:

```js
// Button/styles.js
const generateStyle = (componentTheme, props, state) => {
  const { display, isDisabled } = props

  const displayVariants = {
    inline: {
      display: 'inline-block'
    },
    block: {
      display: 'block',
      margin: 0
    },
    none: {
      display: 'none'
    }
  }

  return {
    button: {
      label: 'button',
      // ...
      ...(isDisabled && { opacity: 0.5 }),
      ...displayVariants[display]
    }
    // ...
  }
}
export default generateStyle
```

You can also pass additional variables from the component via the `makeStyles` prop. These can be values from the state or from getters, etc.

Note: don't forget to pass them both in `componentDidMount` and `componentDidUpdate` methods!

```js
// Button/index.js
class Button extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      focused: false
    }
  }

  componentDidMount() {
    this.props.makeStyles({
      focused: this.state.focused,
      someValue: this.someValue
    })
  }

  componentDidUpdate() {
    this.props.makeStyles({
      focused: this.state.focused,
      someValue: this.someValue
    })
  }

  get someValue() {
    return 'some value here'
  }

  render() {
    // ...
  }
}

// Button/styles.js
const generateStyle = (componentTheme, props, state) => {
  const { focused, someValue } = state

  return {
    button: {
      label: 'button',
      // ...
      ...(someValue === 'not that value' && { display: 'none' }),
      ...(focused && {
        borderWidth: '2px',
        ...(someValue === 'not that value' && { display: 'block' })
      })
    }
    // ...
  }
}
export default generateStyle
```

### Using theme variables in JavaScript

Since the variables are defined in JS you can easily pass them through `styles.js` to access in your component JS.

```js
// Button/styles.js
const generateStyle = (componentTheme, props, state) => {
  return {
    button: {
      label: 'button'
      // ...
    },
    maxWidth: componentTheme.maxWidth
  }
}

// Button/index.js
render() {
  const { propVal1, styles, ...props } = this.props

  return (
    <div maxWidth={styles.maxWidth}>
      ...
    </div>
  )
}
```

#### Writing theme tests

For components with theme tests, you can use `generateComponentTheme` from `theme.js` to get the theme variables.

Import the themes needed for your test, and pass them to the generator.

```js
import { canvas, canvasHighContrast } from '@instructure/ui-themes'
import generateComponentTheme from '../theme'

describe('YourComponent.theme', () => {
  describe('with canvas theme', () => {
    const variables = generateComponentTheme(canvas)

    describe('default', () => {
      it('should ensure background color and text color meet 3:1 contrast', () => {
        expect(contrast(variables.background, variables.color)).to.be.above(3)
      })
    })
  })
  describe('with the "canvas-high-contrast" theme', () => {
    const variables = generateComponentTheme(canvasHighContrast)

    describe('default', () => {
      it('should ensure background color and text color meet 4.5:1 contrast', () => {
        expect(contrast(variables.background, variables.color)).to.be.above(4.5)
      })
    })
  })
})
```

[![npm][npm]][npm-url]

[![build-status][build-status]][build-status-url]

[![MIT License][license-badge]][license]

[![Code of Conduct][coc-badge]][coc]

A UI component library made by Instructure Inc.

### Installation

```sh

yarn add @instructure/emotion

```

[npm]: https://img.shields.io/npm/v/@instructure/emotion.svg
[npm-url]: https://npmjs.com/package/@instructure/emotion
[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui 'Travis CI'
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
