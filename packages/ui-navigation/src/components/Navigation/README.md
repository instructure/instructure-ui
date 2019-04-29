---
describes: Navigation
---

A top-level `Navigation` component

```js
---
example: true
---
  <div style={{height: '35rem'}}>
    <Navigation
      label="Main navigation"
      toggleLabel={{
        expandedLabel: 'Minimize Navigation',
        minimizedLabel: 'Expand Navigation'
      }}
    >
      <NavigationItem
        icon={<Img src={placeholderLogo(85, 85)} constrain="cover" />}
        label={<ScreenReaderContent>Home</ScreenReaderContent>}
        href="#"
        theme={{
          backgroundColor: 'red',
          hoverBackgroundColor: 'blue'
        }}
      />
      <NavigationItem
        icon={<Avatar name="Ziggy Marley" size="x-small"/>}
        label="Account"
        onClick={() => { this.loadSubNav('account') }}
      />
      <NavigationItem
        icon={<IconAdminLine />}
        label="Admin"
        href="#"
      />
      <NavigationItem selected
        icon={<IconDashboardLine />}
        label="Dashboard"
        href="#"
      />
      <NavigationItem
        icon={<Badge count={99}><IconInboxLine /></Badge>}
        label="Inbox"
        href="#"
      />
      <NavigationItem
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
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use for top-level Navigation</FigureItem>
    <FigureItem>Remember that Navigation can be themed by the institution</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Add LTI links to the main area</FigureItem>
  </Figure>
</Guidelines>
```
