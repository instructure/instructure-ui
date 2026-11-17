---
title: New institutional theming
category: Theming
order: 8
relevantForAI: true
---

## Branding (user customizable theming)

The new theming system exposes the equivalents of the legacy Canvas `ic-brand-*` variables under `semantics.color.institutional.*`. Overriding these has the same broad effect as Canvas's [Theme Editor](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-create-a-theme-for-an-account-using-the-Theme-Editor/ta-p/242) — the Button family, `SideNavBar`, `Link`, `Billboard`, and several other components consume them automatically.

> **Theme support for branding:**
>
> - **`canvas` (legacy)** — branding overrides are supported.
> - **`light`** — branding overrides are supported.
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

### Common variables — broad-impact branding

`brandPrimary` is the main brand color hook — consumed by the Tabs active indicator, `Badge` primary color, `RangeInput` handle, `TableRow` hover border, and several other accent colors. `brandFontColorDark` is the default dark text color used across many components.

> **Heads up:** unlike the legacy `ic-brand-primary`, in the new system `brandPrimary` **no longer drives** the secondary `Button` border or the `TextInput` focus ring. Focus rings are now centrally controlled via `sharedTokens.focusOutline` — see the [Overriding shared tokens](new-theme-overrides) section to customize them.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light, dark }
  const [themeName, setThemeName] = useState('canvas')

  const semantics = themes[themeName].newTheme.semantics(themes[themeName].newTheme.primitives)
  const defaults = semantics.color.institutional
  const sharedTokens = themes[themeName].newTheme.sharedTokens(semantics)
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
          <SimpleSelect.Option id="light" value="light">light</SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>dark (coming soon)</SimpleSelect.Option>
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
        <div style={{background: sharedTokens.background.containerColor, padding: '1rem'}}>
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
        </div>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

### `Button` branding

These semantics only affect the `primary` color `Button`.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light, dark }
  const [themeName, setThemeName] = useState('canvas')

  const semantics = themes[themeName].newTheme.semantics(themes[themeName].newTheme.primitives)
  const defaults = semantics.color.institutional
  const sharedTokens = themes[themeName].newTheme.sharedTokens(semantics)
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
          <SimpleSelect.Option id="light" value="light">light</SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>dark (coming soon)</SimpleSelect.Option>
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
        <div style={{background: sharedTokens.background.containerColor, padding: '1rem'}}>
          <Button color="primary">I'm a 'primary' color button</Button>
        </div>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

### `Link` and `Billboard` branding

`linkColor` is used by non-inverse `Link` and by clickable `Billboard`.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light, dark }
  const [themeName, setThemeName] = useState('canvas')

  const semantics = themes[themeName].newTheme.semantics(themes[themeName].newTheme.primitives)
  const defaults = semantics.color.institutional
  const sharedTokens = themes[themeName].newTheme.sharedTokens(semantics)
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
          <SimpleSelect.Option id="light" value="light">light</SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>dark (coming soon)</SimpleSelect.Option>
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
        <div style={{background: sharedTokens.background.containerColor, padding: '1rem'}}>
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
        </div>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

### `SideNavBar` branding

These semantics control the `SideNavBar` background, hover state, and menu item text colors — for both default and active states.

```ts
---
type: example
---
const Example = () => {
  const themes = { canvas, light, dark }
  const [themeName, setThemeName] = useState('canvas')

  const semantics = themes[themeName].newTheme.semantics(themes[themeName].newTheme.primitives)
  const defaults = semantics.color.institutional
  const sharedTokens = themes[themeName].newTheme.sharedTokens(semantics)
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
          <SimpleSelect.Option id="light" value="light">light</SimpleSelect.Option>
          <SimpleSelect.Option id="dark" value="dark" isDisabled>dark (coming soon)</SimpleSelect.Option>
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
        <div style={{background: sharedTokens.background.containerColor, padding: '1rem'}}>
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
        </div>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```
