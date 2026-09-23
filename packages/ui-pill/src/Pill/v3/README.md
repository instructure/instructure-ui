---
describes: Pill
---

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

The component has a `max-width`, set by its theme. Any overflowing text will be handled via ellipses.

> **DEPRECATED** Please do not make Pills that have overflowing text, it's an a11y anti-pattern. The issue is if text overflows it cannot be read by keyboard-only users. We could make the Pill focusable, but that would be an anti-pattern too because only elements that are interactive should be focusable (and just displaying a tooltip is not a real interaction)

```js
---
type: example
---
<Pill>
  Supercalifragilisticexpialidocious bear with tiny hat
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
