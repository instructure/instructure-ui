---
describes: AppNav
---

`AppNav` is a navigation component currently intended for use within LTI apps.

To render content after the navigation items, use the `renderAfterItems`
property.

```javascript
---
example: true
---

<AppNav
  screenReaderLabel="App navigation"
  margin="none none large"
  renderAfterItems={
    <Button
      variant="icon"
      href="#"
      icon={IconPlusSolid}
    >
      <ScreenReaderContent>Add something</ScreenReaderContent>
    </Button>
  }
>
  <AppNav.Item
    renderLabel={<ScreenReaderContent>AltaVista</ScreenReaderContent>}
    renderIcon={<SVGIcon src={iconExample} inline={false} size="medium" color="primary" />}
    href="http://altavista.com"
  />
  <AppNav.Item
    renderLabel="WebCrawler"
    href="http://webcrawler.com"
  />
  <AppNav.Item
    isSelected
    renderLabel="Goooooogle"
    onClick={() => 'google'}
    renderAfter={
      <Badge
        type="notification"
        standalone
        formatOutput={function () {
          return <ScreenReaderContent>You have notifications from Google</ScreenReaderContent>
        }}
      />
    }
  />
  <AppNav.Item
    renderLabel="DuckDuckGo"
    onClick={() => 'duck!'}
  />
</AppNav>
```
