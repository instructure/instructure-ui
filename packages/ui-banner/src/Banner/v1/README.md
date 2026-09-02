---
describes: Banner
---

The Banner component surfaces a short, prominent message -- an announcement
or a promotion -- with an optional header, an icon, a dismiss control, and
a slot for a call-to-action.

All of Banner's text comes from props (`header`, `children`, `ctaText`, and
whatever you pass as `icon`) so it can be translated -- Banner never renders
hardcoded copy itself.

```javascript
---
type: example
---
<Banner>Your assignments were graded.</Banner>
```

Add a `header` for a bold lead-in line above the body text.

```javascript
---
type: example
---
<Banner header="New feature">
  Try the redesigned gradebook filters.
</Banner>
```

Banner ships in two colors: `violet` (default) and `sea`.

```javascript
---
type: example
---
<div>
  <View as="div" margin="0 0 small 0">
    <Banner color="violet">Violet banner.</Banner>
  </View>
  <View as="div">
    <Banner color="sea">Sea banner.</Banner>
  </View>
</div>
```

`density` controls padding, gaps, and font sizes. `relaxed` (default) is
roomier; `compact` is tighter.

```javascript
---
type: example
---
<div>
  <View as="div" margin="0 0 small 0">
    <Banner density="relaxed" header="Relaxed">
      More padding, larger text.
    </Banner>
  </View>
  <View as="div">
    <Banner density="compact" header="Compact">
      Less padding, smaller text.
    </Banner>
  </View>
</div>
```

Pass `isDismissible` along with `onDismiss` to show a close button in the
top-right corner. `closeButtonLabel` gives the button an accessible name --
provide it whenever `isDismissible` is `true`, or a development warning is
logged. A close button only renders when both `isDismissible` and
`onDismiss` are set; a dismiss control with no handler is a dead end for
users, so Banner won't render one.

```javascript
---
type: example
---
<Banner
  isDismissible
  onDismiss={() => console.log('dismissed')}
  closeButtonLabel="Close banner"
>
  Dismiss me with the close button.
</Banner>
```

Pass `ctaText` and `onCtaClick` for a follow-up action. Banner always
renders this as its own fixed-style button -- consumers control the label
and click behavior, not the button's size or color.

```javascript
---
type: example
---
<Banner
  header="Try Studio"
  ctaText="Explore"
  onCtaClick={() => console.log('cta clicked')}
>
  See how a saved study plan can keep you on track.
</Banner>
```

Pass `icon` to override the default icon shown in the icon swatch.

```javascript
---
type: example
---
<Banner icon={<IconStarSolid size="md" color="onColor" />}>
  Custom icon example.
</Banner>
```

### Accessibility

- Banner does not assign itself a specific ARIA role; wrap it in a
  region with an appropriate role (e.g. `role="status"` or
  `role="alertdialog"`) at the call site when the message needs to be
  announced to assistive technology.
- Always provide `closeButtonLabel` when `isDismissible` is `true` -- it is
  the dismiss button's only accessible name.
- The `violet` and `sea` pastel backgrounds are chosen from the design
  token set already tuned for sufficient contrast against Banner's text
  and icon colors.
