---
title: New Theme Override Patterns
category: Guides
order: 6
relevantForAI: true
---

## New Theme Override Patterns

This guide covers all the override patterns available in the new theming system (v11.7+). The new system uses a layered token architecture: **primitives** (raw values) -> **semantics** (meaning) -> **components** (per-component tokens).

Overrides are applied via the `themeOverride` prop on `InstUISettingsProvider`, which is separate from the `theme` prop. The `theme` prop replaces the active theme entirely; `themeOverride` layers modifications on top.

```js
---
type: embed
---
<ToggleBlockquote
  summary="Note"
>
  <ToggleBlockquote.Paragraph>
    The examples below use exaggerated colors for demonstration purposes only. Please ensure your overrides maintain sufficient color contrast ratios for accessibility (WCAG 2.1 AA).
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

### 1. Switching themes

Use the `theme` prop to replace the entire theme for a subtree. This is unchanged from the legacy system.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    I use the "canvas" theme.
  </Alert>

  <InstUISettingsProvider theme={light}>
    <Alert variant="info" margin="small">
      I use the "light" theme.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 2. Component-level overrides via `themeOverride`

Override specific component tokens for all instances of a component within a subtree. Use the component's name as the key under `components`, and provide partial token overrides.

The available tokens for each component can be found in the component's theme file (e.g., `theme.ts`), or at the bottom of each component's documentation page.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Default Alert - no overrides.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      components: {
        Alert: {
          infoIconBackground: 'darkblue',
          infoBorderColor: 'darkblue'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Alert with overridden icon background and border color.
    </Alert>
    <Alert variant="success" margin="small">
      Success Alert is unaffected by the info-specific overrides.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 3. Overriding multiple components at once

You can override tokens for multiple components in a single `themeOverride`.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        Alert: {
          infoBorderColor: 'purple',
          infoIconBackground: 'purple'
        },
        Pill: {
          primaryBackground: 'purple',
          primaryBorderColor: 'purple'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Purple info Alert.
    </Alert>
    <Pill margin="small" color="primary">Purple Pill</Pill>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 4. Nesting overrides

Overrides from nested `InstUISettingsProvider` components are deep-merged. Child overrides layer on top of parent overrides.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        Alert: {
          infoBorderColor: 'darkblue',
          infoIconBackground: 'darkblue'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Dark blue border and icon (from parent override).
    </Alert>

    <InstUISettingsProvider
      themeOverride={{
        components: {
          Alert: {
            infoIconBackground: 'deeppink'
          }
        }
      }}
    >
      <Alert variant="info" margin="small">
        Dark blue border (inherited from parent) + deep pink icon (child override).
      </Alert>
    </InstUISettingsProvider>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 5. Overriding primitives

Primitives are the lowest-level raw design tokens (colors, sizes, fonts). Overriding a primitive cascades through all semantics and components that reference it.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Default Alert with standard blue.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      primitives: {
        color: {
          blue: {
            blue100: 'rebeccapurple'
          }
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      The blue primitive has been overridden to purple. Any semantic token
      that maps to blue100 is now purple.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 6. Overriding semantics

Semantic tokens sit between primitives and components. They assign meaning to raw values (e.g., "error color", "base text color"). Overriding semantics affects all components that use that semantic token.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="error" margin="small">
    Default error Alert.
  </Alert>
  <Alert variant="warning" margin="small">
    Default warning Alert.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      semantics: {
        color: {
          stroke: {
            error: 'deeppink',
            warning: 'darkviolet'
          },
          background: {
            error: 'deeppink',
            warning: 'darkviolet'
          }
        }
      }
    }}
  >
    <Alert variant="error" margin="small">
      Error color remapped to deep pink via semantic override.
    </Alert>
    <Alert variant="warning" margin="small">
      Warning color remapped to dark violet via semantic override.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 7. Combining override layers

Primitives, semantics, and component overrides can all be used together. They are applied in order: primitives first, then semantics, then component-level overrides.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      primitives: {
        color: {
          blue: {
            blue100: 'teal'
          }
        }
      },
      semantics: {
        color: {
          stroke: {
            success: 'darkgreen'
          },
          background: {
            success: 'darkgreen'
          }
        }
      },
      components: {
        Alert: {
          warningBorderColor: 'darkorange',
          warningIconBackground: 'darkorange'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Info uses teal (via primitive override of blue100).
    </Alert>
    <Alert variant="success" margin="small">
      Success uses dark green (via semantic override).
    </Alert>
    <Alert variant="warning" margin="small">
      Warning uses dark orange (via direct component override).
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 8. Per-component `themeOverride` prop

Individual component instances accept a `themeOverride` prop for one-off styling. This overrides the component's own tokens and takes highest priority.

#### Object form

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Default info Alert.
  </Alert>
  <Alert
    variant="info"
    margin="small"
    themeOverride={{
      infoBorderColor: 'crimson',
      infoIconBackground: 'crimson'
    }}
  >
    This specific Alert has crimson info styling.
  </Alert>
</InstUISettingsProvider>
```

#### Function form

The function receives the component's calculated theme as the first argument and the current full theme as the second. This lets you derive overrides from existing token values.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert
    variant="info"
    margin="small"
    themeOverride={(componentTheme) => ({
      infoBorderColor: componentTheme.successBorderColor,
      infoIconBackground: componentTheme.successIconBackground
    })}
  >
    Info Alert styled with the success colors via function override.
  </Alert>
</InstUISettingsProvider>
```

### 9. Provider override + per-component override

Provider-level overrides and per-component `themeOverride` props stack. The per-component prop takes highest priority.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        Alert: {
          infoBorderColor: 'darkblue',
          infoIconBackground: 'darkblue',
          background: 'lightyellow'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Dark blue info + light yellow background (from provider).
    </Alert>
    <Alert
      variant="info"
      margin="small"
      themeOverride={{
        infoIconBackground: 'deeppink'
      }}
    >
      Dark blue border + light yellow background (from provider), but deep pink icon (from component prop). The component prop wins for infoIconBackground.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 10. Replacing themes with overrides in a subtree

You can switch the theme entirely via the `theme` prop while also applying overrides via `themeOverride`. The theme is replaced first, then overrides are applied on top.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Canvas theme Alert.
  </Alert>

  <InstUISettingsProvider
    theme={light}
    themeOverride={{
      components: {
        Alert: {
          infoBorderColor: 'darkorange',
          infoIconBackground: 'darkorange'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Light theme Alert with orange info overrides on top.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### Override priority (highest to lowest)

1. **Per-component `themeOverride` prop** - affects a single instance
2. **Provider `themeOverride.components`** - affects all instances of a component in the subtree
3. **Provider `themeOverride.semantics`** - affects all components using those semantic tokens
4. **Provider `themeOverride.primitives`** - affects everything that references those raw values
5. **Base theme** (from `theme` prop or inherited from parent provider)
