---
category: packages
---

## emotion

The [Emotion design library's](https://emotion.sh/) implementation in Instructure UI.

### Elements

`EmotionThemeProvider` is a React component, which wraps Emotion's own `ThemeProvider`.

#### Usage

It can be used in two ways.
Once on the top level, providing the theme for the whole application.
It accepts a `theme` prop, which should be an Instructure UI theme.

```jsx
import App from './App'
import { EmotionThemeProvider } from '@instructure/emotion'
import { canvas, canvasHighContrast } from '@instructure/ui-themes'

const RenderApp = () => {
  return (
    <EmotionThemeProvider theme={canvasHighContrast}>
      <App />
    </EmotionThemeProvider>
  )
}
```

Secondly it can be used in any place in the component tree in order to override the above defined themes. In this case, you should provide the same structure as the original theme, but you may include only the parts, you intend to override.
You can override things in three major way.
You can override the theme variables for every theme

```jsx
import SomeOtherComponent from './SomeOtherComponent'
import { EmotionThemeProvider } from '@instructure/emotion'
import { canvas, canvasHighContrast } from '@instructure/ui-themes'

const SomeComponentUnderApp = () => {
  const themeOverride = {
    colors: {
      textAlert: 'pink'
    }
  }

  return (
    <EmotionThemeProvider theme={themeOverride}>
      <SomeOtherComponent />
    </EmotionThemeProvider>
  )
}
```

You also can override a specific theme only. The example below will override textInfo color to pink but only for canvas theme.

```jsx
import SomeOtherComponent from './SomeOtherComponent'
import { EmotionThemeProvider } from '@instructure/emotion'
import { canvas, canvasHighContrast } from '@instructure/ui-themes'

const SomeComponentUnderApp = () => {
  const themeOverride = {
    themes: {
      canvas: {
        colors: {
          textAlert: 'pink'
        }
      }
    }
  }

  return (
    <EmotionThemeProvider theme={themeOverride}>
      <SomeOtherComponent />
    </EmotionThemeProvider>
  )
}
```

Lastly, you can override specific component style variables (found in styles.js for every component)

```jsx
import SomeOtherComponent from  './SomeOtherComponent'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const SomeComponentUnderApp = () => {
const themeOverride = {
components:{
	Avatar:{
		color:"yellow"
	}
}

return (
<EmotionThemeProvider theme={themeOverride}>
	<SomeOtherComponent/>
</EmotionThemeProvider>
)}
```

You can combine class specific overrides with component specific ones

```jsx
import SomeOtherComponent from  './SomeOtherComponent'
import { EmotionThemeProvider } from  "@instructure/emotion"
import { canvas, canvasHighContrast } from  "@instructure/ui-themes"

const SomeComponentUnderApp = () => {
const themeOverride = {
themes:{
canvas:{
	components:{
		Avatar:{
			color:"yellow"
			}
		}
		colors:{
			textAlert:"pink"
		}
	}
}
}

return (
<EmotionThemeProvider theme={themeOverride}>
<SomeOtherComponent/>
</EmotionThemeProvider>
)}
```

## Temporary component migration guide

### Goal

Migrate components from themeable-based to emotion-based styling

### Migration steps

#### 1. Refactor the `theme.js`.

It will receive the theme and themeOverride objects, contains the variables mapped for the component, and the theme-specific styles.

```js
/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @return {Object} The final theme object with the overrides and component variables
 */
export default function generateComponentTheme(theme, themeOverride = {}) {
  // the props of theme you want to use
  const { colors, borders, typography, key: themeName } = theme

  // if any styling should depend on the theme itself,
  // this object should specify it
  const themeSpecificStyle = {
    'canvas-high-contrast': {
      primaryColor: 'red'
    },
    canvas: {
      primaryColor: 'blue'
    }
  }

  // maps the theme variables to component specific style variables
  const componentVariables = {
    color: colors?.textBrand,
    background: colors?.backgroundLightest,
    borderWidthSmall: borders?.widthSmall,
    borderWidthMedium: borders?.widthMedium,
    borderColor: colors?.borderMedium,
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightBold
  }

  // return with the final theme object of the component
  // with the added overrides
  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName],
    ...themeOverride
  }
}
```

#### 2. Create `styles.js` file

You need to create a `styles.js` file next to the `theme.js`. (Don't forget the copyright block!)\
Write and export a `function` named `generateStyle`.\
Import the `generateComponentTheme` from `theme.js` and use it in `generateStyle`, passing the theme and themeOverride parameters.\
You need to use the content of the `styles.css` and convert it to css-in-js. Use the passed component props and state where needed.\
[Emotion's Object Styles documentation](https://emotion.sh/docs/object-styles)

```js
import generateComponentTheme from './theme'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {
  // get the theme variables object for the component
  const componentTheme = generateComponentTheme(theme, themeOverride)

  // optional mappings can be provided based on - for example - props
  const colorStyles = {
    primary: {
      color: componentTheme.primaryColor,
      fontSize: '20px'
    },
    info: {
      color: componentTheme.infoColor
    }
  }

  // return with the css you'd like to apply to the component
  return {
    root: {
      display: 'block',
      background: componentTheme.background,
      boxSizing: 'border-box',
      ...colorStyles[color]
    },
    anotherClass: {
      color: 'green',
      background: componentTheme.infoColor
    }
  }
}
export default generateStyle
```

#### 3. Refactor the component to functional component.

Import the style generator (`generateStyle`) and generate the style object with `useStyle`.\
Any style logic that may take place inside it, you should move to `styles.js`.

```js
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React, { useState } from 'react'
import { useStyle, EmotionThemeProvider } from '@instructure/emotion'
import generateStyle from './styles'

const MyComponent = (props) => {

    const styles = useStyle(Avatar.name, generateStyle, themeOverride, props, { ...anyStateYouNeed })}

    // ...
    // very
    // important
    // component
    // stuff
    // ...

    return (
        <div css={styles.root}>
            // Magnificent content
            <div css={styles.anotherClass}>
                // Content that needs additional class to style
            </div>
        </div>
    )
}
```

#### 4. Delete css file

Once you implemented the css in `styles.js`, delete the `styles.css` file.

#### 5. Theme tests

For components with theme tests, you can use the `generateComponentTheme` to get the theme variables.\
Import the themes needed for your tests.

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
