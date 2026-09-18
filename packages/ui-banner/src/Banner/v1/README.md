---
describes: Banner
---

`Banner` is a prominent message used to promote a feature, offer, event, or
announcement.

Use `Banner` when you want to proactively inform or market to the user —
for example, announcing a new feature or an upcoming event. Use
[Alert](#Alert) instead when you need to communicate system or account
status in response to something the user did, such as an error, a warning,
or a confirmation. Because `Banner` isn't reporting a status change, it
never interrupts assistive technology the way a live-region status message
would.

`Banner` always renders an icon — pass `renderIcon` to use your own, or
leave it out for the default. Give it a `renderTitle` and it will label the
banner for assistive technology; if you don't render a title, provide
`screenReaderLabel` instead so the banner can still be identified when
navigating by landmark.

```js
---
type: example
---
<div>
  <Banner
    renderTitle="New: dark mode"
    renderCloseButtonLabel="Close"
    margin="0 0 small 0"
  >
    Switch your workspace to dark mode from account settings.
  </Banner>
  <Banner
    color="sky"
    renderTitle="Product summit — June 12"
    renderActions={<Button size="small">Reserve a seat</Button>}
    renderCloseButtonLabel="Close"
  >
    Join us for a full day of workshops and product previews.
  </Banner>
</div>
```

### Colors

`Banner` supports two color treatments, `plum` (the default) and `sky`.
Neither carries a status meaning — pick whichever reads best against
surrounding content.

```js
---
type: example
---
<div>
  <Banner color="plum" renderTitle="Plum" margin="0 0 small 0">
    The default color treatment.
  </Banner>
  <Banner color="sky" renderTitle="Sky">
    The alternate color treatment.
  </Banner>
</div>
```

### Dismissing a Banner

The close button only renders when `renderCloseButtonLabel` is provided —
this is also what makes the button accessible, so always pass a label when
a `Banner` should be dismissible. `Banner` doesn't manage its own
visibility: handle the `onDismiss` callback to remove it from your UI.

```js
---
type: example
---
class Example extends React.Component {
  state = { open: true }

  render() {
    return this.state.open ? (
      <Banner
        renderTitle="Dismissible banner"
        renderCloseButtonLabel="Close"
        onDismiss={() => this.setState({ open: false })}
      >
        Click the close button to dismiss this banner.
      </Banner>
    ) : null
  }
}

render(<Example />)
```

### Theme variables

The `margin` prop can be used to add space around the `Banner`.

```js
---
type: code
---
type BannerTheme = {
  plumBackground: string
  skyBackground: string
  plumIconBackground: string
  skyIconBackground: string
  iconColor: string
  color: string
  titleColor: string
  borderRadius: string
  iconContainerBorderRadius: string
  borderWidth: string
  borderStyle: string
  borderColor: string
  paddingVertical: string
  paddingHorizontal: string
  iconGap: string
  stackGap: string
  actionGap: string
  closeButtonMarginTop: string
  closeButtonMarginEnd: string
  titleFontFamily: string
  titleFontSize: string
  titleFontWeight: string | number
  titleLineHeight: string | number
  contentFontFamily: string
  contentFontSize: string
  contentFontWeight: string | number
  contentLineHeight: string | number
}
```
