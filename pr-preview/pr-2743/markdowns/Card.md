# Card


Use `<Card />` as a basic wrapper for grouping related content with padding,
border radius, shadow, and background color.

Card takes no size prop. It measures its own rendered width and scales its
padding and border radius from that, so the same markup works in a narrow
sidebar and in a wide main region.

```js
---
type: example
---
<Card>
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Content goes here.</Text>
</Card>
```

### Variants

`variant` picks the surface treatment:

- `base` _(default)_ draws a background color and a shadow. Use it for a Card
  that sits on the page background.
- `nested` draws a thin border and no background or shadow. Use it inside a
  `base` Card, or on top of another surface such as a Modal, Tray, or
  DrawerLayout.

```js
---
type: example
---
<Card variant="base">
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Draws a background color and a shadow.</Text>
  <Card variant="nested">
    <Heading level="h4" margin="0 0 x-small 0">
      Nested card
    </Heading>
    <Text variant="content">
      Draws a border and borrows the surface behind it.
    </Text>
  </Card>
</Card>
```

### Responsive padding and border radius

Card is a CSS container query container, and it styles itself against its own
inline size in three steps:

| Card width                       | Padding and border radius |
| -------------------------------- | ------------------------- |
| Below `breakpointMd`             | Small                     |
| `breakpointMd` to `breakpointLg` | Medium                    |
| `breakpointLg` and above         | Large                     |

The query reads the Card's own width, never the viewport width, so a narrow
Card on a wide screen still gets small padding. `breakpointMd` and
`breakpointLg` are theme variables, so `themeOverride` shifts where the steps
land.

Drag the right edge of the panel below to watch the steps change.

```js
---
type: example
---
<div
  style={{
    resize: 'horizontal',
    overflow: 'auto',
    minWidth: '10rem',
    maxWidth: '100%',
    border: '1px dashed #999',
    padding: '0.5rem'
  }}
>
  <Card>
    <Text variant="content">
      Drag this panel's right edge to see padding and border radius change.
    </Text>
  </Card>
</div>
```

### Width

A Card fills the width of whatever contains it, and it sets no minimum or
maximum width of its own. Size it from the surrounding layout rather than on
the Card itself. Since each Card reads its own width, two Cards in one row can
land on different steps. Long unbroken content, such as a URL, wraps instead
of overflowing.

```js
---
type: example
---
<div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
  <div style={{ width: '14rem' }}>
    <Card>
      <Text variant="content">Narrow Card, so small padding.</Text>
    </Card>
  </div>
  <div style={{ flex: 1, minWidth: 0 }}>
    <Card>
      <Text variant="content">
        Wider Card in the same row, so it gets roomier padding.
      </Text>
    </Card>
  </div>
</div>
```

### Nested cards

A `base` Card can hold several `nested` Cards, for example to lay out a group
of related sub-sections inside one container. Each nested Card measures the
padded content area it sits in, so it scales independently of its parent.

```js
---
type: example
---
<Card>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Card variant="nested">
      <Heading level="h3" margin="0 0 x-small 0">
        Lorem ipsum
      </Heading>
      <Text variant="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore.
      </Text>
    </Card>
    <Card variant="nested">
      <Heading level="h3" margin="0 0 x-small 0">
        Dolor sit amet
      </Heading>
      <Text variant="content">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo.
      </Text>
    </Card>
    <Card variant="nested">
      <Heading level="h3" margin="0 0 x-small 0">
        Consectetur adipiscing
      </Heading>
      <Text variant="content">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla.
      </Text>
    </Card>
  </div>
</Card>
```

### Other props

Card renders a plain `div` and adds no semantics of its own. Any prop it
doesn't recognize lands on its outermost element, so you can pass `id`,
`role`, `aria-*` attributes, or event handlers. Give it a role or a label when
the grouping needs to reach assistive technology.

```js
---
type: example
---
<Card role="group" aria-labelledby="card-assignments-heading">
  <Heading id="card-assignments-heading" level="h3" margin="0 0 x-small 0">
    Assignments
  </Heading>
  <Text variant="content">
    A labelled group, so screen reader users hear what the Card holds.
  </Text>
</Card>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Place a <code>nested</code> Card inside a <code>base</code> Card
    </Figure.Item>
    <Figure.Item>
      Place a <code>nested</code> Card on top of another surface, such as a
      Card, Modal, or utility panel (e.g. Tray, DrawerLayout)
    </Figure.Item>
    <Figure.Item>
      Control a Card's width from the layout around it, and let the Card pick
      its own padding and border radius
    </Figure.Item>
    <Figure.Item>
      Use a flex or grid layout when placing several <code>nested</code> Cards
      side by side, so they can reflow to fit the available width
    </Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>
      Place a <code>base</code> Card inside another <code>base</code> Card
    </Figure.Item>
    <Figure.Item>
      Place a <code>nested</code> Card directly on the page background — it
      relies on a surface behind it for contrast, since it has no background
      color of its own
    </Figure.Item>
    <Figure.Item>
      Set padding or border radius on the Card yourself to force a particular
      step — override the <code>breakpointMd</code> and{' '}
      <code>breakpointLg</code> theme variables instead
    </Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Card | children | `ReactNode` | No | - | The content to be rendered inside the Card |
| Card | variant | `'base' \| 'nested'` | No | `'base'` | `base` renders a background, border color, and shadow. `nested` is meant to be placed inside a `base` Card and omits the background, border color, and shadow. |

### Usage

Install the package:

```shell
npm install @instructure/ui-card
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Card } from '@instructure/ui-card/v11_7'
```

