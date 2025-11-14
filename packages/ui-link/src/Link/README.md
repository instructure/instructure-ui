---
describes: Link
---

### Where to use Link

`Link` is intended for presenting actions **inline with other content**, such as within headings or sentences. Typically those actions navigate the user to a different view.

```js
---
type: example
---
<Text>The quick brown fox <Link href="https://instructure.github.io/instructure-ui/">jumps</Link> over the lazy dog.</Text>
```

```js
---
type: example
---
<View background="primary-inverse" as="div">
  <Text color="primary-inverse">The quick brown fox <Link color="link-inverse" href="https://instructure.github.io/instructure-ui/">jumps</Link> over the lazy dog.</Text>
</View>
```

### Controlled navigation

Sometimes a simple `Link (<a>)` with an `href` is not enough for navigation and an `onClick` handler is needed. In this case, the recommended approach is the following

```js
---
type: example
---
<Link
  variant="standalone"
  onClick = {(e)=>{
    e.preventDefault()
    console.log("do navigation")
  }}
  forceButtonRole={false}
  href="#">Go to places
</Link>
```

### Size

The `size` prop controls the font size, line height, and icon gap. Available sizes are `small`, `medium`, and `large`. If no size is provided, the link will inherit the font size and line height from its parent context.

```js
---
type: example
---
<div>
  <div>
    <Link href="https://instructure.github.io/instructure-ui/" size="small">
      Small link
    </Link>
  </div>
  <br />
  <div>
    <Link href="https://instructure.github.io/instructure-ui/" size="medium">
      Medium link
    </Link>
  </div>
  <br />
  <div>
    <Link href="https://instructure.github.io/instructure-ui/" size="large">
      Large link
    </Link>
  </div>
  <br />
  <div>
    <Text size="large">This is large text with an <Link href="https://instructure.github.io/instructure-ui/">inherited size link</Link></Text>
  </div>
</div>
```

### Variant

The `variant` prop controls the text decoration and intended use case. Available variants are `inline` (underlined, for use within text) and `standalone` (no underline, for standalone links).

```js
---
type: example
---
<div>
  <div>
    In a line of text you should use the <Link variant="inline" renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">inline</Link> link variant.
  </div>
  <br />
  <div>
    If the link is standalone (not in a text), use the <code>standalone</code> variant:
    <Link display="block" variant="standalone" renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">standalone</Link>
  </div>
</div>
```

### Adding margin

Use the `margin` prop to add space to the left or right of the Link. Because
Link displays `inline`, **top and bottom margin will not work**. If you need
to add margin to the top or bottom of Link, wrap it inside a `<View />`.

```js
---
type: example
---
<Text>The quick brown fox <Link href="https://instructure.github.io/instructure-ui/" margin="0 small">jumps</Link> over the lazy dog.</Text>
```

### Underlines

Link's primary use is inline with other content, which is why it is underlined by default. For rare situations where Link needs
to appear without surrounding text, the default underline can be configured to only show on hover by making `isWithinText={false}`. **Note: this only applies when outside high contrast mode. When inside high contrast mode, the link will always have an underline.**

```js
---
type: example
---
<Link
  href="http://instructure.design"
  isWithinText={false}
>
  I have no default underline
</Link>
```

### Truncating text

Use [TruncateText](TruncateText) to truncate text within Link. Note this will cause Link to display `inline-flex`,
unless an alternate `display` prop is provided.

```js
---
type: example
---
<Link
  onClick={() => console.log('clicked')}
  isWithinText={false}
  renderIcon={<IconUserLine size="small" />}
>
  <TruncateText>{lorem.paragraph()}</TruncateText>
</Link>
```

### Using icons

Use the `renderIcon` property to put an [icon](icons) inside a Link. To position the
icon _after_ the link text, change the `iconPlacement` property to `end`. You can also
render a Link with just an icon. Don't forget to add text for screen readers, though.

NOTE: if you want the icon to have the same `font-size` as the link, do not specify its `size`!

```js
---
type: example
---
<div>
  <View as="div" margin="0 0 small">
    <Link href="https://instructure.design" renderIcon={<IconUserLine size="small" />}>Icon before text</Link> with the quick brown fox
  </View>
  <View as="div" margin="0 0 small">
    This Link has an icon and displays inline with text. <Link
      href="https://instructure.design"
      renderIcon={<IconUserLine />}
      iconPlacement="end"
    >
      Icon appears after Link text
    </Link>. This is more text after the link.
  </View>
  <View as="div">
    This Link consists of only an icon&nbsp;
    <Link onClick={() => console.log('clicked!')} renderIcon={IconUserLine}>
      <ScreenReaderContent>Descriptive text</ScreenReaderContent>
    </Link>.
  </View>
</div>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Use <code>color="link-inverse"</code> when a Link appears on a dark background to ensure adequate contrast</Figure.Item>
    <Figure.Item>Links must have a non-empty href attribute to be considered true links and to be accessible to keyboard users</Figure.Item>
  </Figure>
</Guidelines>
```
