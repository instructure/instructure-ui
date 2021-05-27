---
describes: EmotionThemeProvider
---

The `<EmotionThemeProvider/>` component provides a way to set the theme for our app or override the default theme properties for all themeable child components using the [withStyle](#withStyle) decorator.

Note that `<EmotionThemeProvider/>` components can be nested and that
theme properties will fall back to the parent theme, or the default `canvas` theme when they are not set.

`<EmotionThemeProvider/>` is a wrapper for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype) of Emotion library that we use under the hood for theming and applying css styles to our components.

### Applying theme to the application:

To apply a theme to whole app, you need to import `<EmotionThemeProvider/>` and the theme you want to use from `@instructure/ui-themes` (or use your own compatible theme), and wrap your app in the theme provider.

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { instructure } from '@instructure/ui-themes'
import { EmotionThemeProvider } from '@instructure/emotion'

import { App } from './App'

ReactDOM.render(
  <EmotionThemeProvider theme={instructure}>
    <App />
  </EmotionThemeProvider>,
  document.getElementById('app')
)
```

### Nesting theme providers

```js
<EmotionThemeProvider theme={canvas}>
  <Heading>I should have "canvas" font family.</Heading>

  <EmotionThemeProvider theme={instructure}>
    <Heading>I should have "instructure" font family.</Heading>
  </EmotionThemeProvider>
</EmotionThemeProvider>
```

### Global overrides

`<EmotionThemeProvider/>`accepts override objects too. Here you can override any theme variable inside that provider.

```js
---
example: true
---
<div>
  <Heading level="h3" margin="small small medium">I should have default font family.</Heading>

  <EmotionThemeProvider
    theme={{
      typography: { fontFamily: 'monospace' }
    }}
  >
    <Heading level="h3" margin="small small">I should have monospace font family.</Heading>
  </EmotionThemeProvider>
</div>
```

### Theme overrides

In case you are using multiple themes in your app, you can target a specific theme to override with the `themeOverrides` key, and under the name (key) of the theme.

```js
---
  example: true
---
<div>
  <Alert variant="info" margin="small">
    I am a default style Alert.
  </Alert>

  <EmotionThemeProvider
    theme={{
      themeOverrides: {
        canvas: {
          colors: { backgroundLightest: 'orange' }
        },
        'canvas-high-contrast': {
          colors: { backgroundLightest: 'red' }
        },
        instructure: {
          colors: { backgroundLightest: 'green' }
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      My background should be:
      <List margin="xx-small">
        <List.Item><strong>orange</strong> in 'canvas',</List.Item>
        <List.Item><strong>red</strong> in 'canvas-high-contrast',</List.Item>
        <List.Item>and <strong>green</strong> in 'instructure' theme.</List.Item>
      </List>
    </Alert>
  </EmotionThemeProvider>
</div>
```

### Global component theme overrides

You can globally override the themeVariables of specific components too with the `componentOverrides` key.

**Important:** these variables are the components own theme variables set in the `theme.js` of the component.

The `componentOverrides` can also be nested inside `themeOverrides`.

**Note:** these overrides are handled in the `getComponentThemeOverride` style util method, not in
`EmotionThemeProvider`.

```js
---
  example: true
---
  <div>
    <Alert variant="info" margin="small">
      I am a default style Alert.
    </Alert>

    <EmotionThemeProvider
      theme={{
        componentOverrides: {
          Alert: {
            infoIconBackground: "darkblue",
            infoBorderColor: "darkblue"
          },
          'List.Item': {
            color: "red"
          }
        },
        themeOverrides: {
          canvas: {
            colors: {
              backgroundLightest: "lightgray"
            },
            componentOverrides: {
              Alert: {
                warningIconBackground: "deeppink",
                warningBorderColor: "deeppink"
              }
            },
          }
        }
      }}
    >
      <Alert variant="success" margin="small">
        My background should be light gray in 'canvas' theme.
      </Alert>

      <Alert variant="warning" margin="small">
        My background should be light gray and the icon background should be pink in 'canvas' theme.
      </Alert>

      <Alert variant="info" margin="small">
        My background should be light gray in 'canvas' theme, and the icon background should be dark blue in any theme.
      </Alert>
      <List margin="large 0">
        <List.Item>These List.Items have red color.</List.Item>
        <List.Item>These List.Items have red color.</List.Item>
        <List.Item>These List.Items have red color.</List.Item>
      </List>
    </EmotionThemeProvider>
  </div>
```
