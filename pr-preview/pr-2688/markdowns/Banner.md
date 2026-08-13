# Banner


A Banner surfaces a short, prominent message -- typically an announcement
or a promotion -- with an optional header, an icon, a dismiss control, and
a call-to-action button.

```js
---
type: example
---
<Banner>Your assignments were graded.</Banner>
```
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Banner | color | `'violet' \| 'sea'` | No | `'violet'` | The color treatment used for the banner's background and default icon. |
| Banner | density | `'relaxed' \| 'compact'` | No | `'relaxed'` | Controls the padding, gaps, and font sizes used by the banner. `'relaxed'` is larger, `'compact'` is smaller. |
| Banner | header | `string` | No | - | An optional bold header line shown above the body content. |
| Banner | children | `ReactNode` | Yes | - | The banner's body content. This is the main descriptive text (or other content) shown below the optional `header`. |
| Banner | icon | `ReactNode` | No | - | Overrides the default icon shown in the icon swatch. If not provided, a decorative diamond icon is used. |
| Banner | isDismissible | `boolean` | No | `false` | Whether to show a dismiss (close) button in the top-right corner of the banner. The close button only renders when both `isDismissible` and `onDismiss` are provided -- a dismiss button with no handler is a dead end for users and is bad for accessibility, so it's intentionally omitted otherwise. When `isDismissible` is `true`, `closeButtonLabel` must also be provided or a warning is logged in development. |
| Banner | onDismiss | `() => void` | No | - | Called when the dismiss button is clicked. Required (in practice) for the dismiss button to render -- see `isDismissible`. |
| Banner | closeButtonLabel | `string` | No | - | An accessible label for the dismiss button, read by screen readers. Required when `isDismissible` is `true`. |
| Banner | ctaText | `string` | No | - | The label for an optional call-to-action button rendered below the body content. Banner always renders this as its own fixed-style `Button` (same size and color treatment everywhere) -- consumers control the label and click behavior, not the button's appearance. The button only renders when both `ctaText` and `onCtaClick` are provided. |
| Banner | onCtaClick | `() => void` | No | - | Called when the call-to-action button is clicked. Required (in practice) for the button to render -- see `ctaText`. |

### Usage

Install the package:

```shell
npm install @instructure/ui-banner
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Banner } from '@instructure/ui-banner/v11_7'
```

