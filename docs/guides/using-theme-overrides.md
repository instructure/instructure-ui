---
title: Using theme overrides
category: Guides
order: 4
---

## Using theme overrides

This document gives an overview on how you can customize Instructure UI components by tweaking their theme variables. While this gives you a level of flexibility on the look and feel of the components you should be aware of 2 things:

- The default theme variables are tested to have high enough contrast ratios for WCAG conformance. If you are making changes, please make sure that your app stays WCAG conformant.
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
    background: colors?.backgroundMedium,
    color: colors?.textDarkest
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
      brand: 'red'
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

#### Targeting variables in multiple themes

In case you are using multiple themes in your app, you can target a specific theme to override with the `themeOverrides` key, and under the name (key) of the theme.

```js
---
type: example
---
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = { theme: canvas }
  }

  themesMap = {
    canvas,
    canvasHighContrast,
    instructure
  }

  render() {
    return (
      <div>
        <View as="div" margin="0 0 medium">
          <RadioInputGroup
            onChange={(event, value) => {
              this.setState({ theme: this.themesMap[value] })
            }}
            name="themeSelect"
            defaultValue="canvas"
            description="Select theme"
            variant="toggle"
          >
            <RadioInput label="canvas" value="canvas" />
            <RadioInput label="canvasHighContrast" value="canvasHighContrast" />
            <RadioInput label="instructure" value="instructure" />
          </RadioInputGroup>
        </View>

        <InstUISettingsProvider theme={this.state.theme}>
          <div>
            <Alert variant="info" margin="small">
              I am a default style Alert.
            </Alert>

            <InstUISettingsProvider
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
            </InstUISettingsProvider>
          </div>
        </InstUISettingsProvider>
      </div>
    )
  }
}

render(<Example />)
```

#### Overriding component themes for a React Tree

You can override the theme variables of specific components too with the `componentOverrides` key.

**Important:** these variables are the components own theme variables set in the `theme.js` of the component.

The `componentOverrides` can also be nested inside `themeOverrides`.

**Note:** these overrides are handled in the `getComponentThemeOverride` style util method, not in `InstUISettingsProvider`.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <div>
    <Alert variant="info" margin="small">
      I am a default style Alert.
    </Alert>

    <InstUISettingsProvider
      theme={{
        themeOverrides: {
          canvas: {
            colors: { backgroundLightest: "lightgray" }
          }
        }
      }}
    >
      <Alert variant="success" margin="small">
        My background should be light gray in 'canvas' theme.
      </Alert>
    </InstUISettingsProvider>

    <InstUISettingsProvider
      theme={{
        themeOverrides: {
          canvas: {
            colors: { backgroundLightest: "lightpink" },
            componentOverrides: {
              Alert: {
                warningIconBackground: "deeppink",
                warningBorderColor: "deeppink"
              }
            }
          }
        }
      }}
    >
      <Alert variant="warning" margin="small">
        My background should be light pink and the icon background should be deep pink in 'canvas' theme.
      </Alert>
    </InstUISettingsProvider>

    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          Alert: {
            infoIconBackground: "darkblue",
            infoBorderColor: "darkblue"
          }
        },
        themeOverrides: {
          canvas: {
            colors: { backgroundLightest: "lightblue" }
          }
        }
      }}
    >
      <Alert variant="info" margin="small">
        My background should be light blue in 'canvas' theme, and the icon background should be dark blue in any theme.
      </Alert>
    </InstUISettingsProvider>
  </div>
</InstUISettingsProvider>
```

For child components both the displayName (`'InlineList.Item'`) and the componentId (`List.Item.componentId`) can be used as keys in `componentOverrides`.

```jsx
---
type: code
---
<InstUISettingsProvider
  theme={{
    componentOverrides: {
      'InlineList.Item': {
        color: 'blue'
      },
      [List.Item.componentId]: {
        color: 'red'
      }
    }
  }}
>
  {/* ... */}
</InstUISettingsProvider>
```

### Component themeOverride prop

Themeable components (that implement the [withStyle](#withStyle) decorator) accept a `themeOverride` prop. This prop let's you override the component's own theme. It accepts an object or a function.

The available theme variables are always displayed at the bottom of the component's page (e.g.: [Button component theme variables](/#Button/#ButtonTheme)).

#### Override object

```js
---
type: example
---
<div>
  <div>
    <Button
      color='primary'
    >
      Default Primary Button
    </Button>
  </div>

  <div>
    <Button
      color='primary'
      themeOverride={{ primaryBackground: "purple" }}
      margin="small 0 0"
    >
      Purple Primary Button
    </Button>
  </div>
</div>
```

#### Override function

The override function's first parameter is the component's own theme object, the second is the main theme object.

```js
---
type: example
---
<div>
  <div>
    <Button
      color='primary'
    >
      Default Primary Button
    </Button>
  </div>

  <div>
    <Button
      color='primary'
      margin="small 0 0"
      themeOverride={(componentTheme) => ({
        primaryBackground: componentTheme.successBackground,
        primaryBorderColor: componentTheme.successBorderColor
      })}
    >
      Default Primary Button with Success colors
    </Button>
  </div>
</div>
```

You can access and use any global theme variable via the second parameter (e.g. the [canvas theme](/#canvas)). When changing themes, these variables will update too.

```js
---
type: example
---
<div>
  <div>
    <Button
      color='primary'
    >
      Default Primary Button
    </Button>
  </div>

  <div>
    <Button
      color='primary'
      margin="small 0 0"
      themeOverride={(_componentTheme, currentTheme) => ({
        primaryBackground: currentTheme.colors.backgroundWarning,
        primaryBorderColor: currentTheme.colors.backgroundLightest,
        borderWidth: currentTheme.borders.widthLarge,
        borderStyle: 'dashed'
      })}
    >
      Custom Primary Button
    </Button>
  </div>

  <div>
    <InstUISettingsProvider theme={canvasHighContrast}>
      <Button
        color='primary'
        margin="small 0 0"
        themeOverride={(_componentTheme, currentTheme) => ({
          primaryBackground: currentTheme.colors.backgroundWarning,
          primaryBorderColor: currentTheme.colors.backgroundLightest,
          borderWidth: currentTheme.borders.widthLarge,
          borderStyle: 'dashed'
        })}
      >
        Custom Primary Button (high contrast)
      </Button>
    </InstUISettingsProvider>
  </div>
</div>
```

### Complex use cases

#### Use global theme for multiple React trees

If you have multiple `ReactDOM.render` calls and you would like to use the same theme with the same overrides for them, then you have 2 options:

**Option 1**: wrap each `ReactDOM.render` application with an `InstUISettingsProvider` with the correct theme:

```js
---
type: code
---
//ui/themeOverride.js
import { canvas } from "@instructure/ui-themes"

const themeWithOverrides = {
  ...canvas,
  colors: {
    brand: 'red'
  }
}

export { themeWithOverrides }
```

```jsx
---
type: code
---
//ui/app1/index.js
ReactDOM.render(
  <InstUISettingsProvider theme={themeWithOverrides}>
    <App1>
  </InstUISettingsProvider>
)
```

```jsx
---
type: code
---
//ui/app2/index.js
ReactDOM.render(
  <InstUISettingsProvider theme={themeWithOverrides}>
    <App2>
  </InstUISettingsProvider>
)
```

This approach quickly becomes too cumbersome if you have more than a couple of `ReactDOM.render` calls.

**Option 2**: use global themes:

```jsx
---
type: code
---
//ui/init.js - make sure ui/init.js runs before any other app code!
import { canvas } from "@instructure/ui-themes"

canvas.use({
  overrides: {
    colors: {
      brand: 'red'
    }
  }
})
```

This will register the `canvas` theme with its overrides as the active theme in the [ThemeRegistry](/#ThemeRegistry) and then every InstUI component - that is not wrapped in an `InstUISettingsProvider` - will use this theme no matter which React tree they are rendered in.

#### Use global theme together with InstUISettingsProvider

You can use the global theming and the application level theming together, however there are some caveats you should be aware of:

If you globally .use() a theme and would like to override that theme in a sub-tree of your application then just wrap that part in an `InstUISettingsProvider`

```js
---
type: code
---
//ui/init.js
import { canvas } from "@instructure/ui-themes"

canvas.use({ overrides: ... })

//render app
```

Then just specify the overrides, not the full theme:

```jsx
---
type: code
---
//then later in a sub-tree you can override the theme for that sub-tree only:
render() {
  return(
    <InstUISettingsProvider theme={{
      colors: {
        brand: 'magenta'
      }
    }}>
    //Any InstUI component that uses the `theme.colors.brand` will have it's color set to "magenta" in this subtree
    <SubTree />
  </InstUISettingsProvider>
  )
}
```

This example won't override the global theme, instead it will override the application level theme provided to `InstUISettingsProvider`

```js
---
type: code
---
//ui/init.js
import { canvas } from "@instructure/ui-themes"

canvas.use({ overrides: ... })

//render app
```

```jsx
---
type: code
---
//your application root code:
import { instructure } from "@instructure/ui-themes"

render() {
  return (
    <InstUISettingsProvider theme={instructure}>
      <SubTree1 />
      <InstUISettingsProvider theme={{
        colors: {
          brand: 'orange'
        }
      }}>
        //Any InstUI component that uses the `theme.colors.brand` will have it's color set to "orange" in this subtree
        <SubTree2/>
      </InstUISettingsProvider>
    </InstUISettingsProvider>
 )
}
```
