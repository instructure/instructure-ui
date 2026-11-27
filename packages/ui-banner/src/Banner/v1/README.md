---
describes: Banner
---

Banner is a prominent message used to promote a feature, offer, event, or announcement.
Its purpose is to market or inform proactively, not to respond to something the user did.
To communicate system or account status (errors, warnings, confirmations), use [Alert](Alert)
instead.

Place a page-level Banner at the top of the main content area, above or just below the H1.
Use one Banner per region at a time. Stacked banners get ignored or can create competing
hierarchy and message fatigue.

```js
---
type: example
---
<Banner
  title="Summer courses are open"
  renderIcon={DiamondInstUIIcon}
  closeButtonLabel="Close"
  margin="0 0 general.spaceMd"
>
  Enroll in summer courses before June 1 to secure your spot. Places are
  limited and usually fill up within weeks.
</Banner>
```

### Variant

Use `relaxed` (default) for standalone banners and `compact` where space is
tight. `compact` has smaller spacing, icon box and text. The `color` prop sets
the background of the Banner and its icon box: `violet` (default) or `sea`.

```js
---
type: example
---
<div>
  <Banner
    title="Relaxed violet banner"
    renderIcon={DiamondInstUIIcon}
    margin="0 0 general.spaceMd"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Banner>
  <Banner
    variant="compact"
    color="sea"
    title="Compact sea banner"
    renderIcon={DiamondInstUIIcon}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Banner>
</div>
```

### Buttons in a Banner

A Banner can contain buttons to let the user act on the message. Use `primary`
buttons, a filled one for the main action and one without background for the
other.

```js
---
type: example
---
<Banner
  variant="compact"
  color="sea"
  renderIcon={DiamondInstUIIcon}
  closeButtonLabel="Close"
>
  Your school now offers a free study skills course. Enroll by the end of the
  month to get access to all lessons.
  <Flex gap="gap.buttons" padding="general.spaceSm 0 0 0">
    <Button size="small" color="primary">
      Enroll
    </Button>
    <Button size="small" withBackground={false} color="primary">
      Maybe later
    </Button>
  </Flex>
</Banner>
```

### Dismissing

Setting `closeButtonLabel` renders a close button, which also makes the
`Escape` key close the Banner while focus is inside it. The `timeout` prop
dismisses the Banner automatically. `onDismiss` is called after the Banner
closes.

```js
---
type: example
---
const Example = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Show banner</Button>
      {isOpen && (
        <Banner
          title="Close me"
          variant="compact"
          renderIcon={DiamondInstUIIcon}
          closeButtonLabel="Close"
          margin="general.spaceMd 0 0"
          timeout={5000}
          onDismiss={() => setIsOpen(false)}
        >
          I fade out after 5 seconds.
        </Banner>
      )}
    </div>
  )
}

render(<Example />)
```

### Screen reader announcement

Given a `liveRegion`, the Banner sets `aria-live="polite"` on it and renders its
title and content there, so screen readers announce a Banner that appears
while the user is on the page. Use `isLiveRegionAtomic` to set `aria-atomic`.

The live region element should be static, either server rendered or included
in the static HTML of the app, because some screen readers ignore live regions
added later.

```js
---
type: example
---
const Example = () => {
  const [banners, setBanners] = useState([])
  const [count, setCount] = useState(0)

  const addBanner = () => {
    setBanners([...banners, count])
    setCount(count + 1)
  }

  const closeBanner = (key) =>
    setBanners(banners.filter((banner) => banner !== key))

  return (
    <div>
      <Button onClick={addBanner}>Add Banner</Button>
      {banners.map((banner) => (
        <Banner
          key={banner}
          title={`Banner ${banner + 1}`}
          renderIcon={DiamondInstUIIcon}
          closeButtonLabel="Close"
          onDismiss={() => closeBanner(banner)}
          liveRegion={() => document.getElementById('flash-messages')}
          margin="general.spaceMd 0 0"
        >
          This banner is announced by screen readers.
        </Banner>
      ))}
    </div>
  )
}

render(<Example />)
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use a Banner for messages that are helpful but not urgent</Figure.Item>
    <Figure.Item>Keep the title and the content short</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use a Banner for errors, warnings or confirmations, use an Alert instead</Figure.Item>
    <Figure.Item>Show several Banners on the same page</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>The title isn't a heading element, so it doesn't show up in the page outline</Figure.Item>
    <Figure.Item>Don't set <code>aria-live</code>, <code>aria-relevant</code> or <code>aria-atomic</code> on the <code>liveRegion</code>, the Banner overrides them</Figure.Item>
  </Figure>
</Guidelines>
```
