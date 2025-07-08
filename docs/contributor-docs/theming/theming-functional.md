---
title: Functional themed components
category: Contributor Guides/theming
order: 2
---

## Making InstUI-like components with theming

InstUI uses [Emotion](https://emotion.sh/docs/introduction) under the hood to theme and style its components.
If you want to read about the design behind the system and how to build `class-based` components with InstUI, please read [this](#theming-class-based).

This page will show you how to build `functional` react components with InstUI.

### Anatomy of a functional InstUI component

To make similar and similarly maintainable components to InstUI, you should follow a basic structure. This is not strictly necessary but recommended and this guide will assume you do use it.

A fully equipped InstUI component has three files: `index.tsx`, `style.ts`, `theme.ts` and uses the `useStyles` hook.

Let's take a look at the simplest example possible:

```js
---
type: code
---
// index.tsx

// /** @jsx jsx */
import { jsx, useStyle } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
const InstUIComponent = (props: PropsType)=> {
  const styles = useStyle({
    generateStyle,
    generateComponentTheme,
    componentId: "InstUIComponent_id",
    //any unique id
    params: {
      color: props.color,
      variant: props.variant,
      themeOverride: props.themeOverride
      }
    }
  )
  return (
    <div css={ styles?.root }>content</div>
  )
}

export default InstUIComponent
```

```js
---
type: code
---
// style.ts

const generateStyle = (
  componentTheme: componentThemeType,
  params:ParamType): AvatarStyle => {
  const { color, variant } = params // assuming you passed the `color` and `variant` to the useStyle hook
  const variantStyles = {
    circle: {
      width: '2.5em',
      position: 'relative',
      borderRadius: '100%',
      overflow: 'hidden' },
      rectangle: { width: '3em' } }
  const colorVariants = {
    default: componentTheme.defaultColor,
    green: componentTheme.niceGreenColor,
    nonThemedColor: "pink"
  }
  return {
    instUIComponent: { //for the root element's
    style label: 'instUIComponent',
    color: colorVariants[color],
    backgroundColor: componentTheme.bgColor,
    ...variantStyles[variant]
    },
    aChildElement: {
      label: 'instUIComponent_aChildElement', // this label is needed. Please prefix it with the root label
      fontWeight: "400" //you can hardcode values. Don't need to get them from the theme necessarily .
    }
  }
}
export default generateStyle
```

```js
---
type: code
---
// theme.ts

import type { Theme } from '@instructure/ui-themes'
const generateComponentTheme = (theme: Theme) => {
  const { colors } = theme // the theme you are using. See instUI's theme docs as well
  const componentVariables ={
    defaultColor: colors?.contrasts?.white1010,
    niceGreenColor: colors.contrasts.green4570,
    bgColor: "purple" //this is hardcoded, but added to the theme, so it can be overridden
  }
  return { ...componentVariables }
}
export default generateComponentTheme
```

Let's take a look at the key parts of the examples:

The `useStyle` hook calculates the styles for the component. It needs an object with:

- `generateStyle` function, this function contains all the `css` information (`style.ts` file in the example).
- `generateComponentTheme` is an optional param. This provides variables that act as the theme of the components. These can be derived from the global theme object or hardcoded. All can be overridden.
- `componentId` depends on `generateComponentTheme`. It's mandatory if `generateComponentTheme` is provided. It must be a unique string to identify the component by and used for [component level overrides](https://instructure.design/#using-theme-overrides/#Overriding%20theme%20for%20a%20specific%20component%20in%20a%20subtree).
- `params` is an optional object with any data you need to pass to `generateStyle`. To enable themeOverrides on the component, you must pass the `themeOverride` prop to `params`.

`useStyle` returns an object with the css classes. Pass it to the DOM through emotion's `css` prop (see example).

#### The `generateComponentTheme`

The `generateComponentTheme` defines, calculates and exposes variables that are considered `component theme variables`. These variables will be used in the `generateStyle` method to "theme" the component's style. These variables are overwritable by the [various override methods](https://instructure.design/#using-theme-overrides).
`generateComponentTheme` gets the `theme` as parameter. Return an object (`componentVariables`) with keys that will act as the `component theme variables`. This method will be injected to `generateStyle`.

#### The `generateStyle`

You define the css in the `generateStyle` method. It has access to the themes, defined in the `generateComponentTheme` (in the example: `componentTheme`) and the `params` which are passed to the `useStyle` hook.
Note: if you set the `label` to a unique value for every css class, it makes testing and debugging much easier because emotion appends to the end of the hashed class name it generates.
