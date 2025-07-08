---
title: Theming engine basics
category: Contributor Guides/theming
order: 1
---

## InstUI's theming engine

InstUI's theming engine allows each UI component can to be used in isolation and support multiple themes, including dynamic themes provided at runtime, while still working within a system of components that use a shared global theme. It uses the [Emotion design library's](https://emotion.sh/) under the hood to convert JavaScript objects to CSS.

### Motivation

1. Two-tiered theme variable system: system-wide variables + component level variables. With this variable system, components can be themed, tested, and rendered in isolation from the rest of the system, and we can mitigate issues that may arise with system-wide theme updates.

2. Runtime theme application and definition: to apply user/account level themes without using the CSS cascade.

3. Prevent CSS Cascade bugs: All components should specify variants via props or component level theme variables only (no className or style overrides) with a clear API and should not rely on any external styles.

4. Theme variables should be accessible in JS.

5. All component styles should be scoped to the component.

6. Pre-render/server-side render support (inline critical CSS).

7. Use a popular, well maintained and broadly adopted JS design and theming library that supports runtime theme switching ([Emotion](https://emotion.sh/)).

### InstUISettingsProvider

`InstUISettingsProvider` is a React component, which wraps Emotion's own `ThemeProvider`.

It accepts a `theme` prop, which should be an Instructure UI theme.

It can be used in two ways. On the top level, you can provide the theme for the whole application or nested anywhere inside it. You can also provide an object with theme or component theme overrides.

**For detailed usage info and examples, see the [InstUISettingsProvider](#InstUISettingsProvider) documentation page.**

```jsx
---
type: code
---
import Button from './Button'
import { InstUISettingsProvider } from '@instructure/emotion'
import { canvasHighContrast } from '@instructure/ui-themes'

const RenderApp = () => {
  return (
    <InstUISettingsProvider theme={canvasHighContrast}>
      <Button />
    </InstUISettingsProvider>
  )
}
```

### Theme overrides

A themeable component’s theme can be configured by wrapping it in an [InstUISettingsProvider](#InstUISettingsProvider) component, and/or set explicitly via its `themeOverride` prop.

#### themeOverride prop

The themeable components accept a `themeOverride` prop which lets you override it's component theme object. It accepts an override object or a function, which has the current `componentTheme` as its parameter.

**See more on the [withStyle](#withStyle/#applying-themes) and [Using theme overrides](/#using-theme-overrides) doc pages for more info.**

```js
---
type: example
---
<div>
  <Button color='primary' themeOverride={{ primaryBackground: "purple" }}>
    Button
  </Button>
  <Button
    color='primary'
    margin="0 0 0 small"
    themeOverride={(componentTheme) => ({
      primaryBackground: componentTheme.successBackground,
      primaryBorderColor: componentTheme.successBorderColor
    })}
  >
    Button
  </Button>
  <Button
    color='primary'
    margin="0 0 0 small"
    themeOverride={(_componentTheme, currentTheme) => ({
      primaryBackground: currentTheme.colors.primitives.orange57,
      primaryBorderColor: '#00AAA4',
      borderWidth: currentTheme.borders.widthLarge,
      borderStyle: 'dashed'
    })}
  >
    Button
  </Button>
</div>
```

### Global styles

Write your global styles in the `styles.js` file on a "globalStyles" key. You don't have to add labels to global styles.

```js
---
type: code
---
// styles.js

return {
  globalStyles: {
    '.CodeMirror': {
      height: 'auto',
      background: componentTheme.background
      // ...
    }
  }
}
```

In the `index.js`, import `Global` from `@instructure/emotion`, which is equivalent to the [Global](https://emotion.sh/docs/globals) component of Emotion.js.

In the render method, use the `<Global>` component and pass the the "globalStyles" as its `styles={}` property.

```jsx
---
type: code
---
// index.js

import { withStyle, Global } from '@instructure/emotion'

// ...

render() {
  const { styles } = this.props

  return (
    <div css={styles.codeEditor}>
      <Global styles={styles.globalStyles} />
      // ...
    </div>
  )
}
```

### Keyframes

Animations are handled with Emotion's [keyframes](https://emotion.sh/docs/keyframes) helper.

Import `keyframes` from `@instructure/emotion` in the `styles.js` file.

Define the animation on the top of the page as a `const` and use it in your style object where needed. **Make sure that it is defined outside of the `generateStyle` method, otherwise it is causing problems with style recalculation.**

```js
---
type: code
---
// styles.js

import { keyframes } from '@instructure/emotion'

const pulseAnimation = keyframes`
  to {
    transform: scale(1);
    opacity: 0.9;
  }`

const generateStyle = (componentTheme, props, state) => {
  // ...

  return {
    componentClass: {
      // ...
      animationName: pulseAnimation
    }
  }
}
```

### Writing theme tests

For components with theme tests, you can use `generateComponentTheme` from `theme.js` to get the theme variables.

Import the themes needed for your test, and pass them to the generator.

```js
---
type: code
---
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
