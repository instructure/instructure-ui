
## Branding (user customizable theming)

The `canvas` theme has specific theme variables that are meant as a basis to provide end users a customizability of this theme, e.g. a university can use their own colors throughout the UI. This is used by [Canvas's theme editor](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-create-a-theme-for-an-account-using-the-Theme-Editor/ta-p/242).

> `canvas-high-contrast` does not have this functionality, so a11y color contrast requirements (e.g. [WCAG](https://webaim.org/articles/contrast/)) are always met

Some of these branding variables — notably `ic-brand-primary` — intentionally affect many components (focus rings, tab indicators, secondary button borders, etc.) because they serve as the primary brand color hooks in the `canvas` theme.

However, a small number of `canvas` theme branding variables are not currently consumed by any InstUI component, so changing them has no visible effect: `ic-brand-button--secondary-bgd`, `ic-brand-button--secondary-text`, `ic-link-decoration`.

### Common variables — broad-impact branding

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

### `Button` branding

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

### `Link` and `Billboard` branding

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

### `SideNavBar` branding

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


