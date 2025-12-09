---
title: Using theme overrides
category: Guides
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

### Overriding theme for a specific component in a subtree

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
      theme={{
        componentOverrides: {
          Alert: {
            infoIconBackground: "darkblue",
            infoBorderColor: "darkblue"
          }
        }
      }}
    >
      <Alert variant="info" margin="small">
        My icon background and border should be dark blue in any theme.
      </Alert>
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

#### Override function

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

Themeable components (that implement the [withStyle](withStyle) decorator) accept a `themeOverride` prop. This prop let's you override the component's own theme. It accepts an object or a function.

The available theme variables are always displayed at the bottom of the component's page (e.g.: [Button component theme variables](/#Button/#ButtonTheme)).

#### Override object

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
          TextInput: { backgroundColor: "yellow" }
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

#### Override function

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

See the [theming dev guide](/#theming-basics), and [InstUISettingsProvider](/#InstUISettingsProvider) docs pages for more info and examples.

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

```ts
---
type: example
---
const Example = () => {
  // global stuff
  const [icBrandPrimary, setIcBrandPrimary] = useState(canvas['ic-brand-primary'])
  const [icBrandFontColorDark, setIcBrandFontColorDark] = useState(canvas['ic-brand-font-color-dark'])
  // Link
  const [icLinkColor, setIcLinkColor] = useState(canvas['ic-link-color'])
  const [icLinkDecoration, setIcLinkDecoration] = useState(canvas['ic-link-decoration'])
  // Button
  const [icBrandButtonPrimaryBgd, setIcBrandButtonPrimaryBgd] = useState(canvas['ic-brand-button--primary-bgd'])
  const [icBrandButtonPrimaryText, setIcBrandButtonPrimaryText] = useState(canvas['ic-brand-button--primary-text'])
  const [icBrandButtonSecondaryBgd, setIcBrandButtonSecondaryBgd] = useState(canvas['ic-brand-button--secondary-bgd'])
  const [icBrandButtonSecondaryText, setIcBrandButtonSecondaryText] = useState(canvas['ic-brand-button--secondary-text'])
  // SideNavBar
  const [icBrandGlobalNavBgd, setIcBrandGlobalNavBgd] = useState(canvas['ic-brand-global-nav-bgd'])
  const [icGlobalNavLinkHover, setIcGlobalNavLinkHover] = useState(canvas['ic-global-nav-link-hover'])
  const [icBrandGlobalNavIcIconSvgFill, setIcBrandGlobalNavIcIconSvgFill] = useState(canvas['ic-brand-global-nav-ic-icon-svg-fill'])
  const [icBrandGlobalNavIcIconSvgFillActive, setIcBrandGlobalNavIcIconSvgFillActive] = useState(canvas['ic-brand-global-nav-ic-icon-svg-fill--active'])
  const [icBrandGlobalNavMenuItemTextColor, setIcBrandGlobalNavMenuItemTextColor] = useState(canvas['ic-brand-global-nav-menu-item__text-color'])
  const [icBrandGlobalNavMenuItemTextColorActive, setIcBrandGlobalNavMenuItemTextColorActive] = useState(canvas['ic-brand-global-nav-menu-item__text-color--active'])

  return (
    <div>
      <h3>Common variables</h3>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput renderLabel="ic-brand-primary" value={icBrandPrimary} onChange={(e, v) => setIcBrandPrimary(v)}
  messages={[{text:'used for border/background/focus/shadow/.. colors in many places',type:'hint'}]} />
        </Flex.Item>
        <Flex.Item size="45%">
  <TextInput renderLabel="ic-brand-font-color-dark" value={icBrandFontColorDark} onChange={(e, v) => setIcBrandFontColorDark(v)}
  messages={[{text:'used in lots of places for text color',type:'hint'}]} />
        </Flex.Item>
    </Flex>

      <h3><code>Button</code> branding</h3>
      <Flex gap="small">
        <Flex.Item size="45%">
          <TextInput renderLabel="ic-brand-button--primary-bgd" value={icBrandButtonPrimaryBgd} onChange={(e, v) => setIcBrandButtonPrimaryBgd(v)}
  messages={[{text:"Used by 'primary' color buttons for background",type:'hint'}]} />
          <br/>
          <TextInput renderLabel="ic-brand-button--primary-text" value={icBrandButtonPrimaryText} onChange={(e, v) => setIcBrandButtonPrimaryText(v)}
  messages={[{text:"Used by 'primary' color buttons for text color",type:'hint'}]} />
        </Flex.Item>
        <Flex.Item size="45%">
          <TextInput renderLabel="ic-brand-button--secondary-bgd" value={icBrandButtonSecondaryBgd} onChange={(e, v) => setIcBrandButtonSecondaryBgd(v)}
  messages={[{text:'Unused in InstUI',type:'hint'}]} />
          <br/>
          <TextInput renderLabel="ic-brand-button--secondary-text" value={icBrandButtonSecondaryText} onChange={(e, v) => setIcBrandButtonSecondaryText(v)}
  messages={[{text:'Unused in InstUI',type:'hint'}]}/>
        </Flex.Item>
      </Flex>
      <div style={{display: 'flex', gap: '2rem', marginTop: '3rem', flexDirection: 'column'}}>
        <InstUISettingsProvider theme={{...canvas, ...{
          'ic-brand-primary': icBrandPrimary,
          'ic-brand-font-color-dark': icBrandFontColorDark,
          'ic-link-color': icLinkColor,
          'ic-link-decoration': icLinkDecoration,
          'ic-brand-button--primary-bgd': icBrandButtonPrimaryBgd,
          'ic-brand-button--primary-text': icBrandButtonPrimaryText,
          'ic-brand-button--secondary-bgd': icBrandButtonSecondaryBgd,
          'ic-brand-button--secondary-text': icBrandButtonSecondaryText,
          'ic-brand-global-nav-bgd': icBrandGlobalNavBgd,
          'ic-global-nav-link-hover': icGlobalNavLinkHover,
          'ic-brand-global-nav-ic-icon-svg-fill': icBrandGlobalNavIcIconSvgFill,
          'ic-brand-global-nav-ic-icon-svg-fill--active': icBrandGlobalNavIcIconSvgFillActive,
          'ic-brand-global-nav-menu-item__text-color': icBrandGlobalNavMenuItemTextColor,
          'ic-brand-global-nav-menu-item__text-color--active': icBrandGlobalNavMenuItemTextColorActive
        }}}>
          <hr style={{width:'100%'}}/>
          <Flex gap="large">
            <Flex.Item size="45%">
              <Badge count={15} countUntil={100} margin="0 medium 0 0">
                <Button color="primary">I'm a 'primary' color button</Button>
              </Badge>
              <TextInput renderLabel="TextInput" placeholder="ic-brand-primary sets focus color"/>
            </Flex.Item>
            <Flex.Item size="45%">
              <Badge count={15} countUntil={100} margin="0 medium 0 0">
                <Button color="secondary">I'm a 'secondary' color button</Button>
              </Badge>
              <TextArea label="TextArea" placeholder="ic-brand-primary sets focus color"/>
            </Flex.Item>
          </Flex>

          <Tabs>
            <Tabs.Panel id="tabA" renderTitle="Tab A" isSelected={true}></Tabs.Panel>
            <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled></Tabs.Panel>
            <Tabs.Panel id="tabC" renderTitle="Tab C"></Tabs.Panel>
            <Tabs.Panel id="tabD" renderTitle="Tab D"></Tabs.Panel>
          </Tabs>

          <hr style={{width:'100%'}}/>
          <h3>Link colors used by <code>Link</code> and <code>Billboard</code>:</h3>
          <Flex gap="small">
            <Flex.Item size="45%">
              <TextInput renderLabel="ic-link-color" value={icLinkColor} onChange={(e, v) => setIcLinkColor(v)}
              messages={[{text:'Used for non-inverse Link and clickable Billboard',type:'hint'}]} />
            </Flex.Item>
            <Flex.Item size="45%">
              <TextInput renderLabel="ic-link-decoration" value={icLinkDecoration} onChange={(e, v) => setIcLinkDecoration(v)}
              messages={[{text:'Unused in InstUI',type:'hint'}]}/>
            </Flex.Item>
          </Flex>
          <hr style={{width:'100%'}}/>
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

          <hr style={{width:'100%'}}/>
          <h3><code>SideNavBar</code> branding</h3>
          <Flex gap="large small">
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
          <hr style={{width:'100%'}}/>
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
              onClick={() => { this.loadSubNav('account') }}
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
    </div>
  )
}

render(<Example/>)
```
