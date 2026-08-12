
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
          baseTextColor: 'purple',
          baseBorderColor: 'purple'
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

### 8. Component's `themeOverride` prop

Individual component instances accept a `themeOverride` prop for one-off styling. This overrides the component's own tokens and takes highest priority.

#### Object form

```js
---
type: example
---
<div>
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
</div>
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

### 11. Overriding shared tokens

Shared tokens are cross-component design tokens for common UI patterns like focus outlines, spacing, border radii, and elevation shadows. They sit alongside semantics and are passed to all component style functions. Overriding shared tokens affects every component that uses them.

#### Focus outline

The `focusOutline` shared tokens control the focus ring appearance across all focusable components.

```js
---
type: example
---
<InstUISettingsProvider theme={light}>
  <TextInput renderLabel="Default focus ring" placeholder="Click to focus me" />

  <View as="div" margin="small 0 0 0">
    <InstUISettingsProvider
      themeOverride={{
        sharedTokens: {
          focusOutline: {
            width: '0.25rem',
            infoColor: 'deeppink'
          }
        }
      }}
    >
      <TextInput renderLabel="Custom focus ring" placeholder="Click to focus me" />
    </InstUISettingsProvider>
  </View>
</InstUISettingsProvider>
```

#### Box shadow (elevation)

The `boxShadow` shared tokens control elevation shadows. Components like `Alert` use these to render drop shadows.

```js
---
type: example
---
<InstUISettingsProvider theme={light}>
  <Alert variant="info" margin="small">
    Default elevation shadow.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      sharedTokens: {
        boxShadow: {
          elevation4: {
            0: { color: 'rgba(138, 43, 226, 0.4)', type: 'dropShadow', x: '0px', y: '0.25rem', blur: '0.75rem', spread: '0px' },
            1: { color: 'rgba(138, 43, 226, 0.2)', type: 'dropShadow', x: '0px', y: '0.5rem', blur: '1.5rem', spread: '0px' }
          }
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Custom purple elevation shadow.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

#### Combining shared tokens with other overrides

Shared tokens can be combined with primitives, semantics, and component overrides in a single `themeOverride`.

```js
---
type: example
---
<InstUISettingsProvider theme={light}>
  <InstUISettingsProvider
    themeOverride={{
      sharedTokens: {
        focusOutline: {
          width: '0.25rem',
          infoColor: 'darkorange'
        }
      },
      components: {
        Alert: {
          infoBorderColor: 'darkorange',
          infoIconBackground: 'darkorange'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Alert with orange info styling.
    </Alert>
    <View as="div" margin="small 0 0 0">
      <TextInput renderLabel="Matching orange focus ring" placeholder="Click to focus me" />
    </View>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 12. Overrides on internal child components

Some components render other components internally. For example, `Button` renders `BaseButton` internally. Provider-level `components.BaseButton` overrides affect all BaseButton instances, including those rendered inside `Button`.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        BaseButton: {
          primaryBackground: 'rebeccapurple',
          primaryBorderColor: 'rebeccapurple'
        }
      }
    }}
  >
    <BaseButton color="primary" margin="small">
      BaseButton - purple via BaseButton override
    </BaseButton>
    <Button color="primary" margin="small">
      Button - also purple (uses BaseButton internally)
    </Button>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 13. Independent overrides for child parts of compound components

Most compound components expose each part as a separate component with its own `componentId`. This means you can independently override each part via `components` — both overrides take effect:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        TableColHeader: {
          background: 'rebeccapurple',
          color: 'gold'
        },
        TableRowHeader: {
          background: 'deeppink',
          color: 'white'
        }
      }
    }}
  >
    <Table caption="Independent overrides: ColHeader purple, RowHeader deeppink">
      <Table.Head>
        <Table.Row>
          <Table.ColHeader id="row-headers">Row headers column - purple</Table.ColHeader>
          <Table.ColHeader id="cells">Cells column - purple</Table.ColHeader>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.RowHeader>TableRowHeader — deeppink</Table.RowHeader>
          <Table.Cell>TableCell — unchanged</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeader>TableRowHeader — deeppink</Table.RowHeader>
          <Table.Cell>TableCell — unchanged</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

**Exception — `Button` and `BaseButton`:** `Button` uses `BaseButton`'s `componentId` internally, so `components.Button` has no effect. A `components.BaseButton` override affects all `BaseButton` instances including those rendered inside `Button` — there is no way to target only one:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        BaseButton: {
          primaryBackground: 'rebeccapurple',
          primaryBorderColor: 'rebeccapurple'
        },
        Button: {
          primaryBackground: 'deeppink',
          primaryBorderColor: 'deeppink'
        }
      }
    }}
  >
    <BaseButton color="primary" margin="small">
      BaseButton - purple (BaseButton override)
    </BaseButton>
    <Button color="primary" margin="small">
      Button - also purple (Button uses BaseButton's theme; deeppink has no effect)
    </Button>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

To override a specific `Button` instance without affecting others, use the per-component `themeOverride` prop instead (see section 14).

### 14. Per-component `themeOverride` prop overriding provider-level child overrides

When a provider sets `components.BaseButton` overrides, a specific `Button` instance can override those via its own `themeOverride` prop. The per-component prop has the highest priority.

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      components: {
        BaseButton: {
          primaryBackground: 'rebeccapurple',
          primaryBorderColor: 'rebeccapurple'
        }
      }
    }}
  >
    <BaseButton color="primary" margin="small">
      BaseButton - purple (from provider)
    </BaseButton>
    <Button color="primary" margin="small">
      Button - also purple (inherits BaseButton override)
    </Button>
    <Button
      color="primary"
      margin="small"
      themeOverride={{
        primaryBackground: 'deeppink',
        primaryBorderColor: 'deeppink'
      }}
    >
      Button - deeppink (per-component themeOverride wins)
    </Button>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 15. Branding (user customizable theming)

The new theming system exposes the equivalents of the legacy Canvas `ic-brand-*` variables under `semantics.color.institutional.*`. Overriding these has the same broad effect as Canvas's [Theme Editor](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-create-a-theme-for-an-account-using-the-Theme-Editor/ta-p/242) — the Button family, `SideNavBar`, `Link`, `Billboard`, and several other components consume them automatically.

> **Theme support for branding:**
>
> - **`canvas` (legacy)** — branding overrides are supported.
> - **`light`** — branding support is coming soon.
> - **`dark`** — branding support is coming soon.
> - **High-contrast themes** — branding will **never** be available, by design. These themes maintain WCAG-compliant color contrast at all times, so user-customizable colors cannot override them.

| Legacy variable                                     | New semantic token                      |
| --------------------------------------------------- | --------------------------------------- |
| `ic-brand-primary`                                  | `brandPrimary`                          |
| `ic-brand-font-color-dark`                          | `brandFontColorDark`                    |
| `ic-link-color`                                     | `linkColor`                             |
| `ic-brand-button--primary-bgd`                      | `brandButtonPrimaryBgd`                 |
| `ic-brand-button--primary-text`                     | `brandButtonPrimaryText`                |
| `ic-brand-global-nav-bgd`                           | `brandGlobalNavBgd`                     |
| `ic-global-nav-link-hover`                          | `globalNavLinkHover`                    |
| `ic-brand-global-nav-menu-item__text-color`         | `brandGlobalNavMenuItemTextColor`       |
| `ic-brand-global-nav-menu-item__text-color--active` | `brandGlobalNavMenuItemTextColorActive` |

A handful of legacy variables are not in the new system, for two different reasons:

- **SVG icon-fill variables** (`ic-brand-global-nav-ic-icon-svg-fill` and `--active`) — these _were_ consumed by the `v11.6` to recolor its icons, but `v11.7` uses a different icon-coloring mechanism so they were not migrated.
- **Variables that no InstUI component ever consumed** (`ic-brand-button--secondary-bgd`, `ic-brand-button--secondary-text`, `ic-link-decoration`)

#### Common variables — broad-impact branding

`brandPrimary` is the main brand color hook — consumed by the Tabs active indicator, `Badge` primary color, `RangeInput` handle, `TableRow` hover border, and several other accent colors. `brandFontColorDark` is the default dark text color used across many components.

> **Heads up:** unlike the legacy `ic-brand-primary`, in the new system `brandPrimary` **no longer drives** the secondary `Button` border or the `TextInput` focus ring. Focus rings are now centrally controlled via `sharedTokens.focusOutline` — see the [Overriding shared tokens](#new-theme-overrides) section above to customize them.

```ts
---
type: example
---
const Example = () => {
  // Branding overrides work the same way across all new-system themes.
  // Switch the "Base theme" selector to verify the override applies to canvas, light, and dark.
  const themes = { canvas, light }
  const [themeName, setThemeName] = useState('canvas')

  const defaults = canvas.newTheme.semantics(canvas.newTheme.primitives).color.institutional
  const [brandPrimary, setBrandPrimary] = useState(defaults.brandPrimary)
  const [brandFontColorDark, setBrandFontColorDark] = useState(defaults.brandFontColorDark)

  return (
    <div>
      <View as="div" margin="0 0 small">
        <SimpleSelect
          renderLabel="Base theme"
          value={themeName}
          onChange={(_e, { value }) => setThemeName(value)}
        >
          <SimpleSelect.Option id="canvas" value="canvas">canvas</SimpleSelect.Option>
          <SimpleSelect.Option id="light" value="light" isDisabled>
            light (coming soon)
          </SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>
            dark (coming soon)
          </SimpleSelect.Option>
        </SimpleSelect>
      </View>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput
            renderLabel="brandPrimary"
            value={brandPrimary}
            onChange={(e, v) => setBrandPrimary(v)}
            messages={[{text:'Tabs indicator, Badge, RangeInput handle, etc.', type:'hint'}]}
          />
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput
            renderLabel="brandFontColorDark"
            value={brandFontColorDark}
            onChange={(e, v) => setBrandFontColorDark(v)}
            messages={[{text:'default dark text color in many components', type:'hint'}]}
          />
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider
        theme={themes[themeName]}
        themeOverride={{
          semantics: {
            color: {
              institutional: { brandPrimary, brandFontColorDark }
            }
          }
        }}
      >
        <Tabs>
          <Tabs.Panel id="tabA" renderTitle="Tab A" isSelected={true}></Tabs.Panel>
          <Tabs.Panel id="tabB" renderTitle="Tab B"></Tabs.Panel>
          <Tabs.Panel id="tabC" renderTitle="Tab C"></Tabs.Panel>
        </Tabs>
        <Flex gap="medium" margin="medium 0 0 0">
          <Flex.Item>
            <Badge count={42} countUntil={100} margin="0 medium 0 0">
              <Button color="secondary">Notifications</Button>
            </Badge>
          </Flex.Item>
          <Flex.Item shouldGrow>
            <Text>Default body text — uses brandFontColorDark.</Text>
          </Flex.Item>
        </Flex>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

#### `Button` branding

These semantics only affect the `primary` color `Button`.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light }
  const [themeName, setThemeName] = useState('canvas')

  const defaults = canvas.newTheme.semantics(canvas.newTheme.primitives).color.institutional
  const [brandButtonPrimaryBgd, setBrandButtonPrimaryBgd] = useState(defaults.brandButtonPrimaryBgd)
  const [brandButtonPrimaryText, setBrandButtonPrimaryText] = useState(defaults.brandButtonPrimaryText)

  return (
    <div>
      <View as="div" margin="0 0 small">
        <SimpleSelect
          renderLabel="Base theme"
          value={themeName}
          onChange={(_e, { value }) => setThemeName(value)}
        >
          <SimpleSelect.Option id="canvas" value="canvas">canvas</SimpleSelect.Option>
          <SimpleSelect.Option id="light" value="light" isDisabled>
            light (coming soon)
          </SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>
            dark (coming soon)
          </SimpleSelect.Option>
        </SimpleSelect>
      </View>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput
            renderLabel="brandButtonPrimaryBgd"
            value={brandButtonPrimaryBgd}
            onChange={(e, v) => setBrandButtonPrimaryBgd(v)}
            messages={[{text:"primary Button background", type:'hint'}]}
          />
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput
            renderLabel="brandButtonPrimaryText"
            value={brandButtonPrimaryText}
            onChange={(e, v) => setBrandButtonPrimaryText(v)}
            messages={[{text:"primary Button text color", type:'hint'}]}
          />
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider
        theme={themes[themeName]}
        themeOverride={{
          semantics: {
            color: {
              institutional: { brandButtonPrimaryBgd, brandButtonPrimaryText }
            }
          }
        }}
      >
        <Button color="primary">I'm a 'primary' color button</Button>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

#### `Link` and `Billboard` branding

`linkColor` is used by non-inverse `Link` and by clickable `Billboard`.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light }
  const [themeName, setThemeName] = useState('canvas')

  const defaults = canvas.newTheme.semantics(canvas.newTheme.primitives).color.institutional
  const [linkColor, setLinkColor] = useState(defaults.linkColor)

  return (
    <div>
      <View as="div" margin="0 0 small">
        <SimpleSelect
          renderLabel="Base theme"
          value={themeName}
          onChange={(_e, { value }) => setThemeName(value)}
        >
          <SimpleSelect.Option id="canvas" value="canvas">canvas</SimpleSelect.Option>
          <SimpleSelect.Option id="light" value="light" isDisabled>
            light (coming soon)
          </SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>
            dark (coming soon)
          </SimpleSelect.Option>
        </SimpleSelect>
      </View>
      <Flex gap="small">
        <Flex.Item size="60%">
          <TextInput
            renderLabel="linkColor"
            value={linkColor}
            onChange={(e, v) => setLinkColor(v)}
            messages={[{text:'used by non-inverse Link and clickable Billboard', type:'hint'}]}
          />
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider
        theme={themes[themeName]}
        themeOverride={{
          semantics: {
            color: {
              institutional: { linkColor }
            }
          }
        }}
      >
        <Flex gap="small">
          <Flex.Item size="50%">
            <Link href="https://instructure.github.io/instructure-ui/">normal link</Link>
          </Flex.Item>
          <Flex.Item size="50%">
            <Billboard
              margin="small"
              message="Billboard with link"
              href="http://instructure.com"
              hero={(size) => <IconGradebookLine size={size} />}
            />
          </Flex.Item>
        </Flex>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

#### `SideNavBar` branding

These semantics control the `SideNavBar` background, hover state, and menu item text colors — for both default and active states.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light }
  const [themeName, setThemeName] = useState('canvas')

  const defaults = canvas.newTheme.semantics(canvas.newTheme.primitives).color.institutional
  const [brandGlobalNavBgd, setBrandGlobalNavBgd] = useState(defaults.brandGlobalNavBgd)
  const [globalNavLinkHover, setGlobalNavLinkHover] = useState(defaults.globalNavLinkHover)
  const [brandGlobalNavMenuItemTextColor, setBrandGlobalNavMenuItemTextColor] = useState(defaults.brandGlobalNavMenuItemTextColor)
  const [brandGlobalNavMenuItemTextColorActive, setBrandGlobalNavMenuItemTextColorActive] = useState(defaults.brandGlobalNavMenuItemTextColorActive)

  return (
    <div>
      <View as="div" margin="0 0 small">
        <SimpleSelect
          renderLabel="Base theme"
          value={themeName}
          onChange={(_e, { value }) => setThemeName(value)}
        >
          <SimpleSelect.Option id="canvas" value="canvas">canvas</SimpleSelect.Option>
          <SimpleSelect.Option id="light" value="light" isDisabled>
            light (coming soon)
          </SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>
            dark (coming soon)
          </SimpleSelect.Option>
        </SimpleSelect>
      </View>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput renderLabel="brandGlobalNavBgd" value={brandGlobalNavBgd} onChange={(e, v) => setBrandGlobalNavBgd(v)}/>
          <TextInput renderLabel="globalNavLinkHover" value={globalNavLinkHover} onChange={(e, v) => setGlobalNavLinkHover(v)}/>
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput renderLabel="brandGlobalNavMenuItemTextColor" value={brandGlobalNavMenuItemTextColor} onChange={(e, v) => setBrandGlobalNavMenuItemTextColor(v)}/>
          <TextInput renderLabel="brandGlobalNavMenuItemTextColorActive" value={brandGlobalNavMenuItemTextColorActive} onChange={(e, v) => setBrandGlobalNavMenuItemTextColorActive(v)}/>
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider
        theme={themes[themeName]}
        themeOverride={{
          semantics: {
            color: {
              institutional: {
                brandGlobalNavBgd,
                globalNavLinkHover,
                brandGlobalNavMenuItemTextColor,
                brandGlobalNavMenuItemTextColorActive
              }
            }
          }
        }}
      >
        <SideNavBar
          label="Main navigation"
          toggleLabel={{
            expandedLabel: 'Minimize SideNavBar',
            minimizedLabel: 'Expand SideNavBar'
          }}
        >
          <SideNavBar.Item icon={<IconUserLine />} label="Home" href="#" />
          <SideNavBar.Item icon={<IconAdminLine />} label="Admin" href="#" />
          <SideNavBar.Item selected icon={<IconDashboardLine />} label="Dashboard" href="#" />
          <SideNavBar.Item icon={<IconInboxLine />} label="Inbox" href="#" />
        </SideNavBar>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

### Override priority (highest to lowest)

1. **Per-component `themeOverride` prop** - affects a single instance
2. **Provider `themeOverride.components`** - affects all instances of a component in the subtree
3. **Provider `themeOverride.sharedTokens`** - affects cross-component patterns (focus outlines, spacing, shadows, border radii)
4. **Provider `themeOverride.semantics`** - affects all components using those semantic tokens
5. **Provider `themeOverride.primitives`** - affects everything that references those raw values
6. **Base theme** (from `theme` prop or inherited from parent provider)


