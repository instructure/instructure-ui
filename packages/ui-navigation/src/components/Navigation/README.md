---
describes: Navigation
---

A `Navigation` component [WIP]

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
        icon={<IconUser.Solid />}
        label="Admin"
        href="#"
      />
      <NavigationItem selected
        icon={<IconUser.Solid />}
        label="Dashboard"
        href="#"
      />
      <NavigationItem
        icon={<Badge count={99}><IconUser.Solid /></Badge>}
        label="Inbox"
        href="#"
      />
      <NavigationItem
        icon={<IconUser.Solid />}
        label="Supercalifragilistic"
        href="#"
      />
    </Navigation>
  </div>
```
