---
describes: Link
---

```js
---
guidelines: true
---
<Guidelines>
  <Figure title="Upgrade Notes for v8.0.0" recommendation="none">
    <Figure.Item>
      The <code>linkRef</code> prop will be removed. Use <code>elementRef</code> instead.
    </Figure.Item>
    <Figure.Item>
      The <code>variant</code> prop will be removed. Use <code>color: ['link', 'link-inverse']</code> instead.
    </Figure.Item>
    <Figure.Item>
      The <code>disabled</code> boolean prop will be removed. Use <code>interaction: ['enabled', 'disabled']</code> instead.
    </Figure.Item>
  </Figure>
</Guidelines>
```

### Where to use Link

`Link` is intended for presenting actions __inline with other content__, such as within headings or sentences. Typically those actions navigate the user to a different view.

```js
---
example: true
---
<Text>The quick brown fox <Link href="https://instructure.github.io/instructure-ui/">jumps</Link> over the lazy dog.</Text>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<Text color="primary-inverse">The quick brown fox <Link color="link-inverse" href="https://instructure.github.io/instructure-ui/">jumps</Link> over the lazy dog.</Text>
```

### Adding margin

Use the `margin` prop to add space to the left or right of the Link. Because
Link displays `inline`, __top and bottom margin will not work__. If you need
to add margin to the top or bottom of Link, wrap it inside a `<View />`.

```js
---
example: true
---
<Text>The quick brown fox <Link href="https://instructure.github.io/instructure-ui/" margin="0 small">jumps</Link> over the lazy dog.</Text>
```

### Underlines

Link's primary use is inline with other content, which is why it is underlined by default. For rare situations where Link needs
to appear without surrounding text, the default underline can be configured to only show on hover by making `isWithinText={false}`.

```js
---
example: true
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
example: true
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

Use the `renderIcon` property to put an [icon](#iconography) inside a Link. To position the
icon _after_ the link text, change the `iconPlacement` property to `end`. You can also
render a Link with just an icon. Don't forget to add text for screen readers, though.

```js
---
example: true
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
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Use <code>color="link-inverse"</code> when a Link appears on a dark background to ensure adequate contrast</Figure.Item>
    <Figure.Item>Links must have a non-empty href attribute to be considered true links and to be accessible to keyboard users</Figure.Item>
  </Figure>
</Guidelines>
```
