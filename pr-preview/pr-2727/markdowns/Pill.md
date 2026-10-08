# Pill


Displays short, contextual information about an item. Set the color via the
`color` prop and the size via the `size` prop. Use the `margin` prop to add space
around the component. Use the `renderIcon` prop to add an icon before the text.
Additionally, you can use the `statusLabel` prop to add a label before the main text.

```js
---
type: example
---
<div>
  <Pill
    margin="general.spaceSm"
  >
    Excused
  </Pill>
  <Pill
    statusLabel="Status"
    color="info"
    margin="general.spaceSm"
  >
    Draft
  </Pill>
  <Pill
    statusLabel="Status"
    renderIcon={DiamondInstUIIcon}
    color="success"
    margin="general.spaceSm"
  >
    Checked In
  </Pill>
  <Pill
    renderIcon={Clock4InstUIIcon}
    color="warning"
    margin="general.spaceSm"
  >
    Late
  </Pill>
  <Pill
    renderIcon={MailInstUIIcon}
    color="error"
    margin="general.spaceSm"
  >
    Notification
  </Pill>
</div>
```

### Sizes

The `size` prop accepts `x-small`, `small` (default), `medium`, and `large`.
InstUI icons passed to `renderIcon` are sized to match.

```js
---
type: example
---
<div>
  <Pill size="x-small" renderIcon={DiamondInstUIIcon} margin="general.spaceSm">
    x-small
  </Pill>
  <Pill size="small" renderIcon={DiamondInstUIIcon} margin="general.spaceSm">
    small
  </Pill>
  <Pill size="medium" renderIcon={DiamondInstUIIcon} margin="general.spaceSm">
    medium
  </Pill>
  <Pill size="large" renderIcon={DiamondInstUIIcon} margin="general.spaceSm">
    large
  </Pill>
</div>
```

### Colors

The status colors (`primary`, `info`, `success`, `warning`, `error`) convey meaning.
`primary` is the neutral Pill in the design files. The accent colors (`stone`, `sky`,
`orange`, `aurora`, `plum`, `violet`, `sea`) are for categorization and carry no
status meaning.

```js
---
type: example
---
<div>
  <Pill color="primary" margin="general.spaceSm">primary</Pill>
  <Pill color="info" margin="general.spaceSm">info</Pill>
  <Pill color="success" margin="general.spaceSm">success</Pill>
  <Pill color="warning" margin="general.spaceSm">warning</Pill>
  <Pill color="error" margin="general.spaceSm">error</Pill>
  <br />
  <Pill color="stone" margin="general.spaceSm">stone</Pill>
  <Pill color="sky" margin="general.spaceSm">sky</Pill>
  <Pill color="orange" margin="general.spaceSm">orange</Pill>
  <Pill color="aurora" margin="general.spaceSm">aurora</Pill>
  <Pill color="plum" margin="general.spaceSm">plum</Pill>
  <Pill color="violet" margin="general.spaceSm">violet</Pill>
  <Pill color="sea" margin="general.spaceSm">sea</Pill>
</div>
```

The Pill always shows its full text on a single line, so keep the text short.

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
| Pill | as | `AsElementType` | No | - |  |
| Pill | color | `\| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'stone' \| 'sky' \| 'orange' \| 'aurora' \| 'plum' \| 'violet' \| 'sea'` | No | - | The status colors (`primary`, `info`, `success`, `warning`, `error`) convey meaning, the accent colors (`stone`, `sky`, `orange`, `aurora`, `plum`, `violet`, `sea`) are for categorization. |
| Pill | size | `keyof typeof pillSizeToIconSize` | No | - | The size of the Pill. The icon is sized to match. |
| Pill | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying HTML element |
| Pill | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`. |
| Pill | children | `React.ReactNode` | Yes | - |  |
| Pill | statusLabel | `string` | No | - | Adds a status label to the left of the main text. |
| Pill | renderIcon | `Renderable` | No | - | An icon displayed before the text. InstUI icons are sized and colored automatically. |

### Usage

Install the package:

```shell
npm install @instructure/ui-pill
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Pill } from '@instructure/ui-pill/v11_8'
```

