---
describes: Navigation
---

A top-level `Navigation` component.

```js
---
type: embed
---
<ToggleBlockquote
  summary="DEPRECATED"
>
  <ToggleBlockquote.Paragraph>
    This component is deprecated. Please use <Link href="#SideNavBar">SideNavBar</Link> instead.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

```js
---
type: example
---
  <div style={{height: '35rem'}}>
    <Navigation
      label="Main navigation"
      toggleLabel={{
        expandedLabel: 'Minimize Navigation',
        minimizedLabel: 'Expand Navigation'
      }}
    >
      <Navigation.Item
        icon={<IconUserLine />}
        label={<ScreenReaderContent>Home</ScreenReaderContent>}
        href="#"
        themeOverride={{
          backgroundColor: 'red',
          hoverBackgroundColor: 'blue'
        }}
      />
      <Navigation.Item
        icon={<Avatar name="Ziggy Marley" size="x-small"/>}
        label="Account"
        onClick={() => { this.loadSubNav('account') }}
      />
      <Navigation.Item
        icon={<IconAdminLine />}
        label="Admin"
        href="#"
      />
      <Navigation.Item selected
        icon={<IconDashboardLine />}
        label="Dashboard"
        href="#"
      />
      <Navigation.Item
        icon={<Badge count={99}><IconInboxLine /></Badge>}
        label="Inbox"
        href="#"
      />
      <Navigation.Item
        icon={<IconUserLine />}
        label="Supercalifragilistic"
        href="#"
      />
    </Navigation>
  </div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use for top-level Navigation</Figure.Item>
    <Figure.Item>Remember that Navigation can be themed by the institution</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Add LTI links to the main area</Figure.Item>
  </Figure>
</Guidelines>
```
