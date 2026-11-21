# InstUISettingsProvider

@module InstUISettingsProvider
The `<InstUISettingsProvider/>` component provides a way to add global configuration to our app. It can be used to apply and handle themes (for all themeable child components that use the [withStyle](#withStyle) decorator), setting the global text direction, etc.

Note that `<InstUISettingsProvider/>` components can be nested!

Table of Contents:

- [Theme management](/#InstUISettingsProvider/#theme-management)
  - [Applying theme to the application](/#InstUISettingsProvider/#theme-management-applying-theme-to-the-application)
  - [Nesting theme providers](/#InstUISettingsProvider/#theme-management-nesting-theme-providers)
  - [Theme overrides](/#InstUISettingsProvider/#theme-management-theme-overrides)
- [Text direction management](/#InstUISettingsProvider/#text-direction-management)
- [Server Side Rendering support](/#InstUISettingsProvider/#server-side-rendering-support)
- [Properties](/#InstUISettingsProvider/#InstUISettingsProviderProperties)

### Theme management

`<InstUISettingsProvider/>` is a wrapper for the [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype) of Emotion library that we use under the hood for theming and applying css styles to our components.

#### Applying theme to the application

The `theme` prop applies the given theme. It handles either a full theme, or an overrides object. Theme properties will fall back to the parent theme, or the default `canvas` theme when they are not set.

To apply a theme to whole app, you need to import `<InstUISettingsProvider/>` and the theme you want to use from `@instructure/ui-themes` (or use your own compatible theme), and wrap your app in the theme provider.

```js
---
  type: code
---
import React from 'react'
import ReactDOM from 'react-dom'

import { InstUISettingsProvider } from '@instructure/emotion'

import { App } from './App'

ReactDOM.render(
  <InstUISettingsProvider>
    <App />
  </InstUISettingsProvider>,
  document.getElementById('app')
)
```

#### Nesting theme providers

```js
---
  type: code
---
<InstUISettingsProvider theme={canvas}>
  <Heading>I should have "canvas" font family.</Heading>

  <InstUISettingsProvider>
    <Heading>I should have "instructure" font family.</Heading>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

#### Theme overrides

There are multiple ways to override themes in InstUI. You can read about how these work on the dedicated docs page: [Using theme overrides](/#using-theme-overrides).

### Text direction management

The `dir` prop sets the text direction for its descendants. It wraps its children in a [TextDirectionContext.Provider](/#TextDirectionContext), so that the text direction context can be consumed by child components that have implemented [textDirectionContextConsumer](#textDirectionContextConsumer).

If no `dir` prop is supplied, it will fall back to its parent context if it
exists. Otherwise, it queries for and uses the documentElement `dir` attribute and defaults to `ltr` if it is not found.

```js
---
type: example
---

<InstUISettingsProvider dir="ltr">
  <div>LTR text</div>
  <Badge count={105} countUntil={100} margin="small medium 0 0">
    <Button>LTR Badge</Button>
  </Badge>

  <InstUISettingsProvider dir="rtl">
    <View as="div">
      <div>Nested RTL text</div>
      <Badge count={105} countUntil={100} margin="small medium 0 0">
        <Button>Nested RTL Badge</Button>
      </Badge>
    </View>
  </InstUISettingsProvider>

  <div>LTR text</div>
  <div>LTR text</div>
</InstUISettingsProvider>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| InstUISettingsProvider | children | `React.ReactNode` | No | - |  |
| InstUISettingsProvider | theme | `\| BaseThemeOrOverride \| ((theme: BaseTheme) => BaseThemeOrOverride)` | No | `{}` | A full theme or an override object |
| InstUISettingsProvider | instanceCounterMap | `DeterministicIdProviderValue` | No | - | @deprecated the `instanceCounterMap` prop is deprecated. You don't need to supply the `instanceCounterMap` to the component. It handles it internally. A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which keeps track of specific InstUI components. (generally this is used for deterministic id generation for [SSR](/#server-side-rendering)) |
| InstUISettingsProvider | as | `` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/emotion
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { InstUISettingsProvider } from '@instructure/emotion'
```

