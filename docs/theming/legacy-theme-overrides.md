---
title: Legacy theme overrides
category: Theming
order: 5
relevantForAI: true
---

## Using theme overrides

This document gives an overview on how you can customize Instructure UI components by tweaking their theme variables.
While this gives you a level of flexibility on the look and feel of the components you should be aware of 2 things:

- The default theme variables are tested to have high enough contrast ratios for WCAG 2.1 AA conformance. If you are making changes, please make sure that your app stays WCAG conformant.
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

### Using a different theme for a DOM subtree

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

### Overriding parts of a theme

You can modify parts of a theme object:

```js
---
type: example
---
<InstUISettingsProvider theme={{
    ...canvas,
    ...{
      typography: { fontFamily: 'monospace' }
    }
  }}>
  <div>
    <Heading level="h3" margin="small small">
      I should have monospace font family from the override
    </Heading>
  </div>
</InstUISettingsProvider>
```

Or modify a theme inside a subtree in 2 ways:

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
      theme={{ typography: { fontFamily: 'monospace' } }}
    >
      <Heading level="h3" margin="small small">
        monospace font family set via override on the parent theme.
      </Heading>
    </InstUISettingsProvider>
    <InstUISettingsProvider
      theme={{
        themeOverrides: {
          canvas: { typography: { fontFamily: 'monospace' } }
        }
      }}
    >
      <Heading level="h3" margin="small small">
        monospace font family set via override only if the parent theme is 'canvas'.
      </Heading>
    </InstUISettingsProvider>
  </div>
</InstUISettingsProvider>
```

### Overriding theme for all components in a subtree

You can override the theme variables of specific components too with the `componentOverrides` key. You can do this for every theme or for just a given theme.

**Important:** these variables are the components own theme variables set in the `theme.js` of the component.

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
      themeOverride={{
        components:{
          Alert: {
            infoIconBackground: "darkblue",
            infoBorderColor: "darkblue"
          },
          Pill:{

          }
        }
      }}
    >
    <InstUISettingsProvider
      themeOverride={{
        components:{
          Alert: {
            infoIconBackground: "darkblue",
            infoBorderColor: "darkblue"
          },
          Pill:{
            infoTextColor:"red"
          }
        }
      }}
    >
      <Alert variant="info" margin="small">
        My icon background and border should be dark blue in any theme.
      </Alert>
       <Pill
    statusLabel="Status"
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
    </InstUISettingsProvider>
    </InstUISettingsProvider>

    <InstUISettingsProvider
      theme={{
        themeOverrides: {
          canvas: {
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
        My border and icon background should be deep pink just if the 'canvas' theme is active.
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

#### Override function for all instances

The `InstUISettingsProvider` accepts a `function`. The override function's first parameter is the currently applied theme object. It should return a valid theme or override object.

```js
---
type: example
---
<div>
  <div>
  <InstUISettingsProvider theme={
    (theme)=>{
      return {
        componentOverrides: {
          Alert:{
            infoBorderColor:theme.colors.contrasts.red4570
          }
        }
      }
    }
  }
  >
    <Alert>Overridden Alert</Alert>
  </InstUISettingsProvider>
</div>
</div>
```

### Overriding theme for a single component

Themeable components (that implement the [withStyleNew](withStyleNew) decorator) accept a `themeOverride` prop. This prop let's you override the component's own theme. It accepts an object or a function.

The available theme variables are always displayed at the bottom of the component's page (e.g.: [Button component theme variables](/#Button/#ButtonTheme)).

#### Override object for a single component

```js
---
type: example
---
<div>
  <div>
    <Button color='primary'>Default Primary Button</Button>
  </div>

  <div>
    <Button color='primary'
      themeOverride={{
        primaryBackground: "purple",
        borderRadius: '999rem'
    }}
      margin="small 0 large">
      Purple Primary Button with rounded corners
    </Button>
    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          TextInput: { background: "yellow" }
        }
      }}
    >
      <DateInput2
        renderLabel="This is how to handle override in a nested component"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        width="20rem"
        invalidDateErrorMessage="Invalid date"
      />
    </InstUISettingsProvider>
  </div>
</div>
```

#### Override function for a single component

The override function's first parameter is the component's own theme object, the second is the main theme object.

```js
---
type: example
---
<div>
  <div>
    <Button color='primary'>Default Primary Button</Button>
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
    <Button color='primary'>Default Primary Button</Button>
  </div>

  <div>
    <Button
      color='primary'
      margin="small 0 0"
      themeOverride={(_componentTheme, currentTheme) => ({
        primaryBackground: currentTheme.colors.primitives.orange57,
        primaryBorderColor: currentTheme.colors.primitives.green45,
        borderWidth: currentTheme.borders.widthLarge,
        borderStyle: 'dashed'
      })}
    >
      Custom Primary Button
    </Button>
  </div>
</div>
```

**The component's own theme**

Every themeable component has its own "theme map". This map defines the components own theme variables (used by this component only), and maps them to values in the global theme object. These local variables are then passed to the component and used in the styles object.

See the [InstUISettingsProvider](/#InstUISettingsProvider) docs page for more info and examples.

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
