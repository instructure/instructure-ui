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

### Variant

In order to make it easy to get the most commonly used links, we have the variant prop. It will set all the necessary styles (fontSize, lineHeight, and textDecoration).

```js
---
type: example
---
<div>
<div>
In a line of text you should use the <Link variant="inline" renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">inline</Link> link variant.
</div>

<br></br>
<div>
<Text variant="contentSmall">In a line of text, where the text is smaller, use the <Link variant="inline-small"  renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">inline-small</Link> link variant
</Text>
</div>

<br></br>
<div>
If the link is standalone (not in a text), use the <code>standalone</code> <Link display="block" variant="standalone" renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">standalone</Link>
</div>

<br></br>
<div>
If the link is standalone (not in a text), but smaller, use the <code>standalone-small</code> <Link display="block" variant="standalone-small"  renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">standalone-small</Link>
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

Use [TruncateText](#TruncateText) to truncate text within Link. Note this will cause Link to display `inline-flex`,
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

Use the `renderIcon` property to put an [icon](#icons) inside a Link. To position the
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
