
## Using theme overrides

```js
---
type: embed
---
<Alert variant="warning" margin="0 0 medium">
  The examples on this page use the <strong>legacy theming system</strong> and are designed for <strong>v11.6</strong> components. If you are viewing the v11.7 version, <Link href={window.location.pathname.match(/v\d+_\d+/) ? window.location.pathname.replace(/v\d+_\d+/, 'v11_6') : `/v11_6${window.location.pathname}`}>switch to v11.6</Link> to see the examples working correctly.
</Alert>
```

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

### Branding (user customizable theming)

The `canvas` theme has specific theme variables that are meant as a basis to provide end users a customizability of this theme, e.g. a university can use their own colors throughout the UI. This is used by [Canvas's theme editor](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-create-a-theme-for-an-account-using-the-Theme-Editor/ta-p/242).

> `canvas-high-contrast` does not have this functionality, so a11y color contrast requirements (e.g. [WCAG](https://webaim.org/articles/contrast/)) are always met

Some of these branding variables — notably `ic-brand-primary` — intentionally affect many components (focus rings, tab indicators, secondary button borders, etc.) because they serve as the primary brand color hooks in the `canvas` theme.

However, a small number of `canvas` theme branding variables are not currently consumed by any InstUI component, so changing them has no visible effect: `ic-brand-button--secondary-bgd`, `ic-brand-button--secondary-text`, `ic-link-decoration`.

#### Common variables — broad-impact branding

`ic-brand-primary` is the main brand color hook. It is used for borders, backgrounds, focus rings, shadows and similar accents in many components (Tabs active indicator, secondary `Button` border, `TextInput` focus ring, etc.). `ic-brand-font-color-dark` is the default dark text color used in many places.

```ts
---
type: example
---
const Example = () => {
  const [icBrandPrimary, setIcBrandPrimary] = useState(canvas['ic-brand-primary'])
  const [icBrandFontColorDark, setIcBrandFontColorDark] = useState(canvas['ic-brand-font-color-dark'])

  return (
    <div>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput
            renderLabel="ic-brand-primary"
            value={icBrandPrimary}
            onChange={(e, v) => setIcBrandPrimary(v)}
            messages={[{text:'border/background/focus/shadow colors in many components',type:'hint'}]}
          />
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput
            renderLabel="ic-brand-font-color-dark"
            value={icBrandFontColorDark}
            onChange={(e, v) => setIcBrandFontColorDark(v)}
            messages={[{text:'default text color in many components',type:'hint'}]}
          />
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider theme={{...canvas, ...{
        'ic-brand-primary': icBrandPrimary,
        'ic-brand-font-color-dark': icBrandFontColorDark
      }}}>
        <Tabs>
          <Tabs.Panel id="tabA" renderTitle="Tab A" isSelected={true}></Tabs.Panel>
          <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled></Tabs.Panel>
          <Tabs.Panel id="tabC" renderTitle="Tab C"></Tabs.Panel>
        </Tabs>
        <Flex gap="medium" margin="medium 0 0 0">
          <Flex.Item>
            <Button color="secondary">Secondary Button</Button>
          </Flex.Item>
          <Flex.Item shouldGrow>
            <TextInput renderLabel="TextInput" placeholder="focus to see ic-brand-primary"/>
          </Flex.Item>
        </Flex>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

#### `Button` branding

These variables only affect the `primary` color `Button`.

```ts
---
type: example
---
const Example = () => {
  const [icBrandButtonPrimaryBgd, setIcBrandButtonPrimaryBgd] = useState(canvas['ic-brand-button--primary-bgd'])
  const [icBrandButtonPrimaryText, setIcBrandButtonPrimaryText] = useState(canvas['ic-brand-button--primary-text'])

  return (
    <div>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput
            renderLabel="ic-brand-button--primary-bgd"
            value={icBrandButtonPrimaryBgd}
            onChange={(e, v) => setIcBrandButtonPrimaryBgd(v)}
            messages={[{text:"primary Button background",type:'hint'}]}
          />
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput
            renderLabel="ic-brand-button--primary-text"
            value={icBrandButtonPrimaryText}
            onChange={(e, v) => setIcBrandButtonPrimaryText(v)}
            messages={[{text:"primary Button text color",type:'hint'}]}
          />
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider theme={{...canvas, ...{
        'ic-brand-button--primary-bgd': icBrandButtonPrimaryBgd,
        'ic-brand-button--primary-text': icBrandButtonPrimaryText
      }}}>
        <Button color="primary">I'm a 'primary' color button</Button>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```

#### `Link` and `Billboard` branding

`ic-link-color` sets the color of non-inverse `Link` and of clickable `Billboard`.

```ts
---
type: example
---
const Example = () => {
  const [icLinkColor, setIcLinkColor] = useState(canvas['ic-link-color'])

  return (
    <div>
      <Flex gap="small">
        <Flex.Item size="60%">
          <TextInput
            renderLabel="ic-link-color"
            value={icLinkColor}
            onChange={(e, v) => setIcLinkColor(v)}
            messages={[{text:'used by non-inverse Link and clickable Billboard',type:'hint'}]}
          />
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider theme={{...canvas, ...{
        'ic-link-color': icLinkColor
      }}}>
        <Flex gap="small">
          <Flex.Item size="50%">
            <Link href="https://instructure.github.io/instructure-ui/">normal link</Link>
          </Flex.Item>
          <Flex.Item size="50%">
            <View background="primary-inverse" as="div">
              <Link color="link-inverse" href="https://instructure.github.io/instructure-ui/">inverse link</Link>
            </View>
          </Flex.Item>
        </Flex>
        <Flex gap="small">
          <Flex.Item size="40%">
            <Billboard
              margin="small"
              message="Billboard with link"
              href="http://instructure.com"
              hero={(size) => <IconGradebookLine size={size} />}
            />
          </Flex.Item>
          <Flex.Item size="40%">
            <Billboard
              margin="small"
              message="Billboard without link"
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

These variables control the colors of the `SideNavBar` background, hover state, icons and menu item text — for both default and active states.

```ts
---
type: example
---
const Example = () => {
  const [icBrandGlobalNavBgd, setIcBrandGlobalNavBgd] = useState(canvas['ic-brand-global-nav-bgd'])
  const [icGlobalNavLinkHover, setIcGlobalNavLinkHover] = useState(canvas['ic-global-nav-link-hover'])
  const [icBrandGlobalNavIcIconSvgFill, setIcBrandGlobalNavIcIconSvgFill] = useState(canvas['ic-brand-global-nav-ic-icon-svg-fill'])
  const [icBrandGlobalNavIcIconSvgFillActive, setIcBrandGlobalNavIcIconSvgFillActive] = useState(canvas['ic-brand-global-nav-ic-icon-svg-fill--active'])
  const [icBrandGlobalNavMenuItemTextColor, setIcBrandGlobalNavMenuItemTextColor] = useState(canvas['ic-brand-global-nav-menu-item__text-color'])
  const [icBrandGlobalNavMenuItemTextColorActive, setIcBrandGlobalNavMenuItemTextColorActive] = useState(canvas['ic-brand-global-nav-menu-item__text-color--active'])

  return (
    <div>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput renderLabel="ic-brand-global-nav-bgd" value={icBrandGlobalNavBgd} onChange={(e, v) => setIcBrandGlobalNavBgd(v)}/>
          <TextInput renderLabel="ic-global-nav-link-hover" value={icGlobalNavLinkHover} onChange={(e, v) => setIcGlobalNavLinkHover(v)}/>
          <TextInput renderLabel="ic-brand-global-nav-ic-icon-svg-fill" value={icBrandGlobalNavIcIconSvgFill} onChange={(e, v) => setIcBrandGlobalNavIcIconSvgFill(v)}/>
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput renderLabel="ic-brand-global-nav-menu-item__text-color" value={icBrandGlobalNavMenuItemTextColor} onChange={(e, v) => setIcBrandGlobalNavMenuItemTextColor(v)}/>
          <TextInput renderLabel="ic-brand-global-nav-menu-item__text-color--active" value={icBrandGlobalNavMenuItemTextColorActive} onChange={(e, v) => setIcBrandGlobalNavMenuItemTextColorActive(v)}/>
          <TextInput renderLabel="ic-brand-global-nav-ic-icon-svg-fill--active" value={icBrandGlobalNavIcIconSvgFillActive} onChange={(e, v) => setIcBrandGlobalNavIcIconSvgFillActive(v)}/>
        </Flex.Item>
      </Flex>
      <hr style={{width:'100%', margin:'2rem 0 1rem'}}/>
      <InstUISettingsProvider theme={{...canvas, ...{
        'ic-brand-global-nav-bgd': icBrandGlobalNavBgd,
        'ic-global-nav-link-hover': icGlobalNavLinkHover,
        'ic-brand-global-nav-ic-icon-svg-fill': icBrandGlobalNavIcIconSvgFill,
        'ic-brand-global-nav-ic-icon-svg-fill--active': icBrandGlobalNavIcIconSvgFillActive,
        'ic-brand-global-nav-menu-item__text-color': icBrandGlobalNavMenuItemTextColor,
        'ic-brand-global-nav-menu-item__text-color--active': icBrandGlobalNavMenuItemTextColorActive
      }}}>
        <SideNavBar
          label="Main navigation"
          toggleLabel={{
            expandedLabel: 'Minimize SideNavBar',
            minimizedLabel: 'Expand SideNavBar'
          }}
        >
          <SideNavBar.Item
            icon={<IconUserLine />}
            label={<ScreenReaderContent>Home</ScreenReaderContent>}
            href="#"
          />
          <SideNavBar.Item
            icon={<Avatar name="Ziggy Marley" size="x-small" src={avatarSquare} showBorder="always"/>}
            label="Account"
            onClick={() => {}}
          />
          <SideNavBar.Item
            icon={<IconAdminLine />}
            label="Admin"
            href="#"
          />
          <SideNavBar.Item selected
            icon={<IconDashboardLine />}
            label="Dashboard"
            href="#"
          />
          <SideNavBar.Item
            icon={<Badge count={99}
              formatOutput={function (formattedCount) {
                return (
                  <AccessibleContent alt={`You have ${formattedCount} unread messages.`}>
                    {formattedCount}
                  </AccessibleContent>
                )
              }}
            ><IconInboxLine /></Badge>}
            label="Inbox"
            href="#"
          />
          <SideNavBar.Item icon={<IconUserLine />}
            label="Supercalifragilistic"
            href="#" />
        </SideNavBar>
      </InstUISettingsProvider>
    </div>
  )
}

render(<Example/>)
```


