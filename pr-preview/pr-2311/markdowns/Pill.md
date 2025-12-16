# Pill


Displays short, contextual information about an item. Change the border
and text color via the `color` prop. Use the `margin` prop to add space around
the component. Use the `renderIcon` prop to add an icon to the left of the text. Additionally,
you can use the `statusLabel` prop to add a label to the left of the main text.

```js
---
type: example
---
<div>

<InstUISettingsProvider theme={canvas}>
<div>
  <Pill
    margin="x-small"
  >
    Excused
  </Pill>
  <Pill
    statusLabel="Status"
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
  <Pill
    statusLabel="Status"
    renderIcon={<IconCheckLine />}
    color="success"
    margin="x-small"
  >
    Checked In
  </Pill>
  <Pill
    renderIcon={<IconClockLine />}
    color="warning"
    margin="x-small"
  >
    Late
  </Pill>
  <Pill
    renderIcon={<IconMessageLine />}
    color="error"
    margin="x-small"
  >
    Notification
  </Pill>
</div>
</InstUISettingsProvider>
<InstUISettingsProvider theme={canvasHighContrast}>
<div>
  <Pill
    margin="x-small"
  >
    Excused
  </Pill>
  <Pill
    statusLabel="Status"
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
  <Pill
    statusLabel="Status"
    renderIcon={<IconCheckLine />}
    color="success"
    margin="x-small"
  >
    Checked In
  </Pill>
  <Pill
    renderIcon={<IconClockLine />}
    color="warning"
    margin="x-small"
  >
    Late
  </Pill>
  <Pill
    renderIcon={<IconMessageLine />}
    color="error"
    margin="x-small"
  >
    Notification
  </Pill>
</div>
</InstUISettingsProvider>
<InstUISettingsProvider theme={rebrandLight}>
<div>
  <Pill
    margin="x-small"
  >
    Excused
  </Pill>
  <Pill
    statusLabel="Status"
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
  <Pill
    statusLabel="Status"
    renderIcon={<IconCheckLine />}
    color="success"
    margin="x-small"
  >
    Checked In
  </Pill>
  <Pill
    renderIcon={<IconClockLine />}
    color="warning"
    margin="x-small"
  >
    Late
  </Pill>
  <Pill
    renderIcon={<IconMessageLine />}
    color="error"
    margin="x-small"
  >
    Notification
  </Pill>
</div>
</InstUISettingsProvider>
<InstUISettingsProvider theme={rebrandDark}>
<div>
  <Pill
    margin="x-small"
  >
    Excused
  </Pill>
  <Pill
    statusLabel="Status"
    color="info"
    margin="x-small"
  >
    Draft
  </Pill>
  <Pill
    statusLabel="Status"
    renderIcon={<IconCheckLine />}
    color="success"
    margin="x-small"
  >
    Checked In
  </Pill>
  <Pill
    renderIcon={<IconClockLine />}
    color="warning"
    margin="x-small"
  >
    Late
  </Pill>
  <Pill
    renderIcon={<IconMessageLine />}
    color="error"
    margin="x-small"
  >
    Notification
  </Pill>
</div>
</InstUISettingsProvider>
</div>
```

The component has a `max-width`, set by its theme. Any overflowing text will be handled via ellipses.

> **DEPRECATED** Please do not make Pills that have overflowing text, it's an a11y anti-pattern. The issue is if text overflows it cannot be read by keyboard-only users. We could make the Pill focusable, but that would be an anti-pattern too because only elements that are interactive should be focusable (and just displaying a tooltip is not a real interaction)

```js
---
type: example
---
<Pill>
  Supercalifragilisticexpialidocious bear
</Pill>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use more than 2 words for the main text</Figure.Item>
    <Figure.Item>Use more than 2 words for the statusLabel</Figure.Item>
    <Figure.Item>Use for dismissible items (use a <Link href="/#Tag">Tag</Link> instead)</Figure.Item>
    <Figure.Item>Use for counts (use a <Link href="/#Badge">Badge</Link> instead)</Figure.Item>
    <Figure.Item>Put actions next to the text</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Pill | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - |  |
| Pill | color | `'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | No | `'primary'` |  |
| Pill | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying HTML element |
| Pill | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Pill | children | `React.ReactNode` | Yes | - |  |
| Pill | statusLabel | `string` | No | - | Adds a status label to the left of the main text. |
| Pill | renderIcon | `React.ReactNode` | No | - | An icon displayed to the left of the text. |

### Usage

Install the package:

```shell
npm install @instructure/ui-pill
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Pill } from '@instructure/ui-pill'
```

