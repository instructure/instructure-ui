# Card


Use `<Card />` as a basic wrapper for grouping related content with padding,
border radius, shadow, and background color.

```js
---
type: example
---
<Card>
  <Heading level="h3" margin="0 0 x-small 0">
    Base card
  </Heading>
  <Text variant="content">Medium size, the default.</Text>
</Card>
```

### Sizes

`size` controls padding, border radius, and the card's min-/max-width
breakpoints: `sm` applies a max-width, `md` applies a min- and max-width, and
`lg` applies a min-width.

```js
---
type: example
---
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <Card size="sm">
    <Text variant="content">Small card</Text>
  </Card>
  <Card size="md">
    <Text variant="content">Medium card</Text>
  </Card>
  <Card size="lg">
    <Text variant="content">Large card</Text>
  </Card>
</div>
```

### Nested cards

The `nested` variant is meant to be placed inside a `base` Card. It omits the
background color and shadow, and uses a smaller border radius. A nested
Card's `size` is independent of its parent's — choose it based on the nested
content's own needs, not to match the parent.

```js
---
type: example
---
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <Card variant="base" size="sm">
    <Card variant="nested" size="sm">
      <Text variant="content">Nested small card</Text>
    </Card>
  </Card>
  <Card variant="base" size="md">
    <Card variant="nested" size="md">
      <Text variant="content">Nested medium card</Text>
    </Card>
  </Card>
  <Card variant="base" size="lg">
    <Card variant="nested" size="lg">
      <Text variant="content">Nested large card</Text>
    </Card>
  </Card>
</div>
```

### Mixed sizes

Nested Cards don't need to match their parent's size, or each other's — you
can place several different-sized `nested` Cards side by side inside one
larger `base` Card.

```js
---
type: example
---
<Card variant="base" size="lg">
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Card variant="nested" size="sm">
      <Text variant="content">Small nested card</Text>
    </Card>
    <Card variant="nested" size="md">
      <Text variant="content">Medium nested card</Text>
    </Card>
  </div>
</Card>
```

### Multiple nested cards

A `base` Card can hold several `nested` Cards, for example to lay out a group
of related sub-sections inside a single container.

```js
---
type: example
---
<Card variant="base" size="lg">
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
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla.
      </Text>
    </Card>
  </div>
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
      Size each <code>nested</code> Card independently, based on its own
      content — it doesn't need to match its parent{' '}
      <code>base</code> Card's <code>size</code>
    </Figure.Item>
    <Figure.Item>
      Give a row of <code>md</code>/<code>lg</code> <code>nested</code> Cards
      enough width to fit their minimum widths, or let them wrap, when
      placing several side by side
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
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Card | children | `ReactNode` | No | - | The content to be rendered inside the Card |
| Card | variant | `'base' \| 'nested'` | No | `'base'` | `base` renders a background, border color, and shadow. `nested` is meant to be placed inside a `base` Card and omits the background, border color, and shadow. |
| Card | size | `'sm' \| 'md' \| 'lg'` | No | `'md'` | `sm` applies a max-width, `md` applies a min- and max-width, and `lg` applies a min-width, each based on breakpoint tokens. Padding and border radius also scale per size. |

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

