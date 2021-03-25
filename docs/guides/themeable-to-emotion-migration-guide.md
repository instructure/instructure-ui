---
title: Themeable to Emotion Migration Guide for Version 8.0
category: Guides
order: 2
---

## Themeable to Emotion Migration Guide for Version 8.0

The main feature of the Version 8.0 release is the switch of the theming engine. We replaced the in-house `ui-themeable` theming solution with the popular [emotion.js](https://emotion.sh/) library.

We feel that it is very important that InstUI is easy to use and learn, so we try to use popular, well maintained and well documented open source solutions whenever possible.

This is why we decided to replace our custom-made theming library (ui-themeable) with a broadly adopted one. The two main candidates were [emotion](https://emotion.sh) and [styled components](https://styled-components.com), we decided to use `emotion`. If you are interested in our detailed reasoning you can read it [here](https://gist.github.com/serikjensen/4ba00b653efac1dbf80543c529adabbc).

In the v8.0. release we removed `ui-themeable` and its supporting packages from InstUI (see more in [Upgrade Guide for Version 8.0](#v8-upgrade-guide)). We also migrated all our components to use `emotion`, because it was not compatible with the former `ui-themeable`. This is why you'll have to make some changes in your app to adopt the new theming solution:

- replace `ApplyTheme` with `EmotionThemeProvider` and import themes directly instead of registering them
- if you have your own themeable components, refactor them to use `emotion`

##### Table of Contents

- [The emotion package](#themeable-to-emotion-migration-guide/#the-emotion-package)
- [Theme handling](#themeable-to-emotion-migration-guide/#theme-handling)
  - [ApplyTheme to EmotionThemeProvider](#themeable-to-emotion-migration-guide/#theme-handling-applytheme-to-emotionthemeprovider)
  - [Using the built-in themes](#themeable-to-emotion-migration-guide/#theme-handling-using-the-built-in-themes)
  - [Using component overrides](#themeable-to-emotion-migration-guide/#theme-handling-using-component-overrides)
  - [Theme-based overrides](#themeable-to-emotion-migration-guide/#theme-handling-theme-based-overrides)
  - [Mixed and nested overrides](#themeable-to-emotion-migration-guide/#theme-handling-mixed-and-nested-overrides)
  - [Local theme variable overrides of components](#themeable-to-emotion-migration-guide/#theme-handling-local-theme-variable-overrides-of-components)
  - [theme.use() is deprecated](<#themeable-to-emotion-migration-guide/#theme-handling-theme.use()-is-deprecated>)
- [Migrating your @themeable components](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components)
  - [1. Refactor theme.js](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-1.-refactor-theme.js)
  - [2. Create the styles.js file](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-2.-create-the-styles.js-file)
  - [3. Make changes in the component](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-3.-make-changes-in-the-component)
  - [Accessing theme variables in index.js](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-accessing-theme-variables-in-index.js)
  - [Global styles](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-global-styles)
  - [Keyframes](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-keyframes)
  - [An example component using emotion theming](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-an-example-component-using-emotion-theming)
  - [Theme tests](#themeable-to-emotion-migration-guide/#migrating-your-@themeable-components-theme-tests)

## The emotion package

The `@instructure/emotion` package contains our wrapper and helpers for the emotion theming library. You can find the full documentation [here](#emotion).

Just like [**ui-themeable**](https://legacy.instructure.design/#ui-themeable), **emotion** is used by:

- adding a decorator to our themeable components,
- mapping the global theme variables to component variables (in the `theme.js` file),
- applying styles using the component variables (instead of `styles.css` file, now we use a `styles.js` file),
- and applying themes by wrapping the component in a theme provider component.

```javascript
---
embed: true
---
<ToggleBlockquote
  summary="Migrating from ui-themeable"
>
  <ToggleBlockquote.Paragraph>
    The usage is very similar, but migrating will require some refactoring, converting <code>css</code> to <code>js</code> and moving styling logic from the components to the <code>styles.js</code> file.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    This guide will explain every step in detail, showing many examples, but <strong>feel free to contact the InstUI team</strong> if you need further help.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

## Theme handling

We made changes in how we apply themes too. You no longer need to register themes and use `ApplyTheme.generateTheme`. Instead, you can directly import them from `@instructure/ui-themes` (or your own themes) and pass them to the theme provider.

#### ApplyTheme to EmotionThemeProvider

The new theme provider is called `EmotionThemeProvider`, which is our own wrapper component for Emotion's [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype).

**You can find detailed information about how it works and how to add theme overrides on the [EmotionThemeProvider](#EmotionThemeProvider) page.**

#### Using the built-in themes

```js
// before
ReactDOM.render(
  <ApplyTheme theme={ApplyTheme.generateTheme('instructure')}>
    <App />
  </ApplyTheme>,
  element
)

// after
import { instructure } from '@instructure/ui-themes'

ReactDOM.render(
  <EmotionThemeProvider theme={instructure}>
    <App />
  </EmotionThemeProvider>,
  element
)
```

#### Using component overrides

If you are using global theme overrides for some components, change the structure of the overrides object: wrap them in a "componentOverrides" object, and the keys are simply the names of the components:

```jsx
// before
<ApplyTheme theme={{
   [Button.theme]: {
     smallHeight: '23px'
   },
   [TextInput.theme]: {
     smallHeight: '27px'
   }
 }
}>
  ...
</ApplyTheme>


// after
<EmotionThemeProvider theme={{
  componentOverrides: {
    Button: {
      smallHeight: '23px'
    },
    TextInput: {
      smallHeight: '27px'
    }
  }
}}>
  ...
</EmotionThemeProvider>

```

#### Theme-based overrides

If you need to, and your app is using multiply themes, you can specify overrides for just one specific theme.

```jsx
<EmotionThemeProvider
  theme={{
    themeOverrides: {
      canvas: {
        colors: { backgroundLightest: '#f5f5f5' }
      },
      'canvas-high-contrast': {
        colors: { backgroundLightest: '#ffffff' }
      }
    }
  }}
>
  ...
</EmotionThemeProvider>
```

#### Mixed and nested overrides

The `componentOverrides` can also be nested inside `themeOverrides`. This method is helpful if you want to override e.g. the `Alert` component "**only** in canvas theme".

```jsx
<EmotionThemeProvider
  theme={{
    themeOverrides: {
      canvas: {
        componentOverrides: {
          Alert: {
            warningIconBackground: 'deeppink',
            warningBorderColor: 'deeppink'
          }
        }
      }
    }
  }}
>
  <Alert variant="warning">
    My border and icon background should be "deeppink" in "canvas" theme.
  </Alert>
</EmotionThemeProvider>
```

#### Local theme variable overrides of components

If you need to tweak just one component locally, you can do so with a component [property](#withStyle/#applying-themes).

**The `theme` prop was renamed to `themeOverride`.**

```jsx
// before
<ExampleComponent theme={{ hoverColor: '#eee' }} />

// after
<ExampleComponent themeOverride={{ hoverColor: '#eee' }} />
```

#### theme.use() is deprecated

Applying themes with the former `.use()` method of themes (added by ui-themeable) is now deprecated. Wrap your app in `EmotionThemeProvider` instead.

```js
// before
import { canvas, canvasHighContrast } from '@instructure/ui-themes'
if (localStorage.getItem('mode') === 'highContrast') {
  canvasHighContrast.use()
} else {
  canvas.use()
}

// after
import { canvas, canvasHighContrast } from '@instructure/ui-themes'

ReactDOM.render(
  <EmotionThemeProvider
    theme={
      localStorage.getItem('mode') === 'highContrast'
        ? canvasHighContrast
        : canvas
    }
  >
    <App />
  </EmotionThemeProvider>,
  element
)
```

Instead of passing the theme overrides to the `.use()` method, just merge the theme with the global overrides when passing it to the theme provider.

```js
// before
import { theme } from '@instructure/canvas-theme'
theme.use({ overrides: { transitions: { duration: '0ms' } } })

// after
import { theme } from '@instructure/canvas-theme'
const themeOverrides = { transitions: { duration: '0ms' } }

ReactDOM.render(
  <EmotionThemeProvider theme={{ ...theme, ...themeOverrides }}>
    <App />
  </EmotionThemeProvider>,
  element
)
```

## Migrating your @themeable components

All InstUI components were migrated to use Emotion in v8.0, because it is not compatible with our former `ui-themeable`. In case you have any components of your own using the `@themeable` decorator, you'll have to migrate them too to use the new theming solution.

We tried our best to give detailed guides and examples for the migration steps, but if you need further information, **feel free to contact the InstUI team** on slack or via [GitHub tickets](https://github.com/instructure/instructure-ui).

#### 1. Refactor theme.js

The `theme.js` needs a small modification. You can see the format convention in our **After** example below.

Rename the generator to `generateComponentTheme`. It still receives the theme object, and returns the variables mapped for the component, and the theme-specific styles.

Move the variable map into a `componentVariables` object, and use optional chaining in the theme variables (e.g. colors?.textBrand).

Move the theme specific generators inside the main generator to a `themeSpecificStyle` object with theme keys as props.

Merge the default variable object and `themeSpecificStyle[theme.key]` in the return block with spread operator, with the latter at the end, so it can override the defaults.

**Before:**

```js
// ui-themeable

export default function generator({ colors, borders, typography }) {
  return {
    color: colors.textBrand,
    background: colors.backgroundLightest,
    borderWidthSmall: borders.widthSmall,
    borderWidthMedium: borders.widthMedium,
    borderColor: colors.borderMedium,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightBold
  }
}

generator.canvas = function () {
  return {
    primaryColor: 'blue'
  }
}

generator['canvas-high-contrast'] = function () {
  return {
    primaryColor: 'red'
  }
}
```

**After:**

```js
// emotion

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme) => {
  // the props of the theme you want to use
  const { colors, borders, typography, key: themeName } = theme

  // if you need different styling in specific themes,
  // add them here with the key of the theme
  const themeSpecificStyle = {
    'canvas-high-contrast': {
      primaryColor: 'red'
    },
    canvas: {
      primaryColor: 'blue'
    }
  }

  // map the theme variables to component specific style variables,
  // and use optional chaining (?.)
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
  // with the added theme specific overrides
  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}
export default generateComponentTheme
```

#### 2. Create the styles.js file

The two main advantages of the new approach are that

- we can directly use the component theme variables in the styling _(instead of generating tons of CSS custom properties)_,
- and we can pass the component props to the generator, so we can handle all prop-based styling here _(instead of adding multiple conditional classes in the `index.js`)_.

Migrating the styling from the `styles.css` to the `styles.js` will need some manual work (or a bit more for complex components). You'll have to convert the css to js, but luckily there are many online [css-to-js transformers](https://transform.tools/css-to-js) that can help.

Create a `styles.js` file next to the `theme.js`. Write and export a function named `generateStyle`. It receives the `componentTheme` generated by `theme.js`, the component props and a `state` object as arguments. These additional `state` variables can be passed from the component in the `makeStyles` method (see later).

Use the content of the `styles.css` and convert it to css-in-js. Use the passed component variables, props and state where needed. (More info in the [emotion](#emotion) docs.) Use [Emotion's Object Styles documentation](https://emotion.sh/docs/object-styles) or other InstUI components as a reference.

```js
/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const { color } = props

  // optional mappings can be provided based on props
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
    componentName: {
      label: 'componentName',
      display: 'block',
      background: componentTheme.background,
      boxSizing: 'border-box',
      ...colorStyles[color]
    },
    child: {
      label: 'componentName__child',
      color: 'green',
      background: componentTheme.infoColor
    }
  }
}
export default generateStyle
```

#### 3. Make changes in the component

In the `index.js` of the component, replace the imports, the decorator, and refactor the style handling.

##### 1. jsx

Add the `/** @jsx jsx */` annotation on top.

```js
/** @jsx jsx */
import { Children, Component } from 'react'
```

##### 2. imports

- Replace `@instructure/ui-themeable` import with `{ withStyle, jsx }` from `@instructure/emotion`.
- Replace the `theme` import with component theme generator (`generateComponentTheme`) from `theme.js`.
- Replace the `styles.css` import with the style generator (`generateStyle`) import from `styles.js`.
- Don't forget to update the dependencies in `package.json`.

```js
// before
import { themeable } from '@instructure/ui-themeable'
import theme from './theme'
import styles from './styles.css'

// after
import { withStyle, jsx } from '@instructure/emotion'
import generateComponentTheme from './theme'
import generateStyle from './styles'
```

**Note:** these utils were moved from `ui-themeable` to the `emotion` package: ThemeablePropValues, ThemeablePropTypes, makeThemeVars, getShorthandPropValue, mirrorShorthandCorners, mirrorShorthandEdges. Update the import where needed. We provided a codemod for these import transformations:

```bash
npx @instructure/instui-cli codemod --scope-modifications imports -v 8
```

##### 3. decorator

Replace `@themeable` decorator with `@withStyle(generateStyle, generateComponentTheme)`, passing the style and theme generators. (If needed, you can pass `null` instead of both, e.g. when there is a stylesheet, but you don't use any theme variables.)

```js
// before
@themeable(theme, styles)
class ExampleComponent extends Component { ... }

// after
@withStyle(generateStyle, generateComponentTheme)
class ExampleComponent extends Component { ... }
```

##### 4. props and lifecycle methods

The props `makeStyles` and `styles` are added by the decorator, so you might run into eslint errors when using them in the component. We recommend adding them to propTypes, and suppressing the eslint errors there.

In the `componentDidMount` and `componentDidUpdate` methods, call the `makeStyles` method (available on this.props) to generate the styles object, passing the state (or any other object needed).

```js
static propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  ...
}

componentDidMount() {
  this.props.makeStyles({ focused: this.state.focused })
}

componentDidUpdate() {
  this.props.makeStyles({ focused: this.state.focused })
}
```

##### 5. render and applying styles

In the `render` method, use emotion's `css={this.props.styles.componentName}` syntax to add styles. Refactor your code to move all style-related logic to the `styles.js`.

**Before:**

```jsx
// before in index.js
render() {
  const classes = {
    [styles.root]: true,
    [styles[size]]: true,
    [styles.disabled]: disabled
  }

  return (
    <div className={classnames(classes)}>...</div>
  )
}
```

```css
/* before in styles.css */
.root {
  display: block;
  font-family: var(--fontFamily);
}
.small {
  font-size: 1em;
}
.medium {
  font-size: 1.5em;
}
.large {
  font-size: 2em;
}
.disabled {
  pointer-events: none;
}
```

**After:**

```jsx
// after in index.js
render() {
  return (
    <div css={styles.componentName}>...</div>
  )
}
```

```js
// after in styles.js
const sizeVariants = {
  small: { fontSize: '1em' },
  medium: { fontSize: '1.5em' },
  large: { fontSize: '2em' }
}

return {
  componentName: {
    label: 'componentName',
    display: 'block',
    fontFamily: componentTheme.fontFamily,
    ...sizeVariants[props.size],
    ...(props.disabled && { pointerEvent: 'none' })
  }
}
```

#### Accessing theme variables in index.js

If you access theme variables in the `index.js`, you need to pass them through `styles.js`, they are not accessible on the component (on `this.theme`) anymore.

Before:

```jsx
render() {
  return (
    <div maxWidth={this.theme.maxWidth}>
      ...
    </div>
  )
}
```

After:

```js
// after in styles.js
return {
  componentName: {
    label: 'componentName'
    // ...
  },
  maxWidth: componentTheme.maxWidth
}
```

```jsx
// after in index.js
render() {
  return (
    <div maxWidth={this.props.styles.maxWidth}>
      ...
    </div>
  )
}
```

#### Global styles

Global styles need to be transformed to the "emotion way" too.

**Before:**

```css
// styles.css

:global {
  .CodeMirror {
    height: auto;
    background: var(--background);
    // ...
  }
}
```

**After:**

Write your global styles in the `styles.js` file on a "globalStyles" key. You don't have to add labels to global styles.

```js
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
// index.js

import { withStyle, jsx, Global } from '@instructure/emotion'

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

#### Keyframes

Animations are handled with Emotion's [keyframes](https://emotion.sh/docs/keyframes) helper.

**Before:**

```css
// styles.css

@keyframes pulse {
  to {
    transform: scale(1);
    opacity: 0.9;
  }
}

.componentClass {
  // ...
  animation-name: pulse;
}
```

**After:**

Import `keyframes` from `@instructure/emotion` in the `styles.js` file.

Define the animation on the top of the page as a `const` and use it in your style object where needed. **Make sure that it is defined outside of the `generateStyle` method, otherwise it is causing problems with style recalculation.**

```js
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

#### An example component using emotion theming

```jsx
/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { passthroughProps } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ExampleComponent extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.node,
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    elementRef: (el) => {}
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const { children, elementRef, styles, ...props } = this.props
    return (
      <div
        {...passthroughProps(props)}
        ref={elementRef}
        css={styles.exampleComponent}
      >
        <div css={styles.componentName__children}>{children}</div>
      </div>
    )
  }
}

export { ExampleComponent }
export default ExampleComponent
```

#### Theme tests

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
