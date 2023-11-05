---
describes: SideNavBar
---

A top-level `SideNavBar` component.

> Note that this component is experimental and its API might change significantly in the future.

```js
---
type: example
---
  <div style={{height: '35rem'}}>
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
        themeOverride={{
          backgroundColor: 'red',
          hoverBackgroundColor: 'blue'
        }}
      />
      <SideNavBar.Item
        icon={<Avatar name="Ziggy Marley" size="x-small"/>}
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
        icon={<Badge count={99}><IconInboxLine /></Badge>}
        label="Inbox"
        href="#"
      />
      <SideNavBar.Item
        icon={<IconUserLine />}
        label="Supercalifragilistic"
        href="#"
      />
    </SideNavBar>
  </div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use for top-level SideNavBar</Figure.Item>
    <Figure.Item>Remember that SideNavBar can be themed by the institution</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Add LTI links to the main area</Figure.Item>
  </Figure>
</Guidelines>
```
