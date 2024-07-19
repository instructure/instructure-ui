---
title: Using theme overrides
category: Guides
order: 4
---

## Using theme overrides

This document gives an overview on how you can customize Instructure UI components by tweaking their theme variables.
While this gives you a level of flexibility on the look and feel of the components you should be aware of 2 things:

- The default theme variables are tested to have high enough contrast ratios for WCAG 2.1 conformance. If you are making changes, please make sure that your app stays WCAG conformant.
- The look of components is only customisable to a certain degree. This is intentional, because Instructure UI is a design system geared towards the Canvas "look and feel", not a generic UI component library.

```js
---
type: embed
---
<ToggleBlockquote
  summary="Note"
>
  <ToggleBlockquote.Paragraph>
    The "colorful" examples below are extreme and for demonstrational purposes only! Please style the components in a way that they fit into our style guidelines and have sufficient color contrast ratio!
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

### How theming works in InstUI

The theming system in InstUI has three levels:

**The global theme**

Global themes are useful when you have multiple React Application trees and you want to set up themes and overrides on a more global level than application level theming.
This basically means you don't necessarily have to wrap each application tree with an [InstUISettingsProvider](/#InstUISettingsProvider) to use themes.
InstUI leverages the [ThemeRegistry](/#ThemeRegistry) package to achieve global theming.

```jsx
---
type: code
---
// app/init sets the global theme
import { canvas } from '@instructure/ui-themes'

canvas.use()
```

**The application level theme**

On the broader level, there is the main theme object that contains the color, spacing, typography etc. variables available in the theme (e.g.: [canvas theme](/#canvas)). The application level theme can be set via the [InstUISettingsProvider](/#InstUISettingsProvider) component.

```jsx
---
type: code
---
// app/component root sets the app theme
<InstUISettingsProvider theme={canvas}>
  <ExampleComponent />
</InstUISettingsProvider>
```

**The component's own theme**

Every themeable component has its own "theme map". This map defines the components own theme variables (used by this component only), and maps them to values in the global theme object. These local variables are then passed to the component and used in the styles object.

See the [emotion](/#emotion), [built-in themes](/#ui-themes) and [InstUISettingsProvider](/#InstUISettingsProvider) docs pages for more info and examples.

Either you set up the themes globally, or you use the `InstUISettingsProvider` to set up themes, the component's `theme.js` will map it to theme variables:

```jsx
---
type: code
---
// component's `theme.js` maps the
const generateComponentTheme = (theme) => {
  const { colors } = theme // global theme, e.g.: canvas theme

  return {
    background: colors?.UI?.surfaceDark,
    color: colors?.UI?.textSuccess
    //...
  }
}

// component's `style.js` uses the theme variables
const generateStyle = (componentTheme) => {
  return {
    button: {
      label: 'button',
      background: componentTheme.background,
      color: componentTheme.color
      //...
    }
  }
}
```

### Global theme overrides

In order to globally register and override themes, simply import the theme you wish to use and call `.use({ overrides })` on it:

```js
---
type: code
---
import ReactDOM from "react-dom"
import { canvas } from "@instructure/ui-themes"

canvas.use({
  overrides: {
    colors: {
      primitives: {
        green45: "red"
      }
    }
  }
})

ReactDOM.render(
  <div>
    ...your application code goes here...
  </div>
)
```

**Note**: globally overriding themes like this means that every InstUI component will use that theme, unless they are wrapped inside an `<InstUISettingsProvider/>`.

You can see more examples [here](/#using-theme-overrides/#using-theme-overrides-examples).

### Application level theme overrides

`<InstUISettingsProvider/>` accepts full theme objects and override objects too.

#### Full themes

By nesting the `InstUISettingsProvider` you can apply different themes to some sections of you app.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <div>
    <Alert variant="info" margin="small">
      I am a "canvas" style Alert.
    </Alert>

    <InstUISettingsProvider theme={canvasHighContrast}>
      <Alert variant="info" margin="small">
        I am a "canvasHighContrast" style Alert.
      </Alert>
    </InstUISettingsProvider>
  </div>
</InstUISettingsProvider>
```

#### Partial theme overrides

When providing a partial theme object, you can override any theme variable inside that provider.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <div>
    <Heading level="h3" margin="small small medium">
      I should have default font family.
    </Heading>

    <InstUISettingsProvider
      theme={{
        typography: { fontFamily: 'monospace' }
      }}
    >
      <Heading level="h3" margin="small small">
        I should have monospace font family.
      </Heading>
    </InstUISettingsProvider>
  </div>
</InstUISettingsProvider>
```
