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
      onClick={() => console.log('Add')}
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
    target="_blank"
  />
  <AppNav.Item
    renderLabel="WebCrawler"
    href="http://webcrawler.com"
    target="_blank"
  />
  <AppNav.Item
    isSelected
    renderLabel="Goooooogle"
    onClick={() => console.log('google')}
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
    onClick={() => console.log('duck!')}
  />
</AppNav>
```
