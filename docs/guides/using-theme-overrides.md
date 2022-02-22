---
title: Using theme overrides
category: Guides
order: 4
---

## Using theme overrides

- [How theming works in InstUI](/#using-theme-overrides/#using-theme-overrides-how-theming-works-in-instui)
- [Global theme overrides](/#using-theme-overrides/#using-theme-overrides-global-theme-overrides)
  - [Full themes](/#using-theme-overrides/#using-theme-overrides-global-theme-overrides-full-themes)
  - [Partial theme overrides](/#using-theme-overrides/#using-theme-overrides-global-theme-overrides-partial-theme-overrides)
  - [Targeting variables in multiple themes](/#using-theme-overrides/#using-theme-overrides-global-theme-overrides-targeting-variables-in-multiple-themes)
  - [Globally overriding component themes](/#using-theme-overrides/#using-theme-overrides-global-theme-overrides-globally-overriding-component-themes)
- [Component themeOverride prop](/#using-theme-overrides/#using-theme-overrides-component-themeoverride-prop)
  - [Override object](/#using-theme-overrides/#using-theme-overrides-component-themeoverride-prop-override-object)
  - [Override function](/#using-theme-overrides/#using-theme-overrides-component-themeoverride-prop-override-function)

```js
---
embed: true
---
<ToggleBlockquote
  summary="Note"
>
  <ToggleBlockquote.Paragraph>
    The "colorful" examples below are extreme and for demonstrational purposes only! Please style the components in a way that they fit into our style guidelines!
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

### How theming works in InstUI

The theming system in InstUI has two levels:

**The global theme**

On the broader level, there is the main theme object that contains the color, spacing, typography etc. variables available in the theme (e.g.: [canvas theme](/#canvas)). The global theme can be set via the [InstUISettingsProvider](/#InstUISettingsProvider) component.

**The component's own theme**

Every themeable component has its own "theme map". This map defines the components own theme variables (used by this component only), and maps them to values in the global theme object. These local variables are then passed to the component and used in the styles object.

See the [emotion](/#emotion) and [InstUISettingsProvider](/#InstUISettingsProvider) docs pages for more info and examples.

```jsx
// app/component root sets the global theme
;<InstUISettingsProvider theme={canvas}>
  <ExampleComponent />
</InstUISettingsProvider>

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

`<InstUISettingsProvider/>` accepts full theme objects and override objects too.

#### Full themes

By nesting the `InstUISettingsProvider` you can apply different themes to some sections of you app.

```js
---
example: true
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
example: true
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
example: true
render: false
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

#### Globally overriding component themes

You can globally override the theme variables of specific components too with the `componentOverrides` key.

**Important:** these variables are the components own theme variables set in the `theme.js` of the component.

The `componentOverrides` can also be nested inside `themeOverrides`.

**Note:** these overrides are handled in the `getComponentThemeOverride` style util method, not in `InstUISettingsProvider`.

```js
---
example: true
---
;<InstUISettingsProvider theme={canvas}>
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
example: true
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
example: true
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
example: true
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
