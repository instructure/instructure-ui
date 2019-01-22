---
describes: Link
---

A Link component

```js
---
example: true
---
<Link href="https://instructure.github.io/instructure-ui/">I am a link</Link>
```

```js
---
example: true
---
<Link onClick={() => 'click'}>I am a button that looks like a link because I have no href prop</Link>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<Link variant="inverse" onClick={() => 'click'}>I am an inverse link for use with dark backgrounds</Link>
```

### Adding margin

Use the `margin` prop to add space to the left or right of the Link. Because
Link displays `inline`, top and bottom margin will not work. If you need
to add margin to the top or bottom of Link, wrap it inside a `<View />`.

```js
---
example: true
---
<Link href="https://instructure.github.io/instructure-ui/" margin="0 0 0 large">I am a link with left margin</Link>
```

### Truncating text

The `ellipsis` property has been deprecated. Use [TruncateText](#TruncateText) instead to truncate text within Link.
Like `ellipsis`, using TruncateText within Link will cause it to display block-level.

```js
---
example: true
---
<View as="div">
  <View as="div" margin="0 0 small">
    <Link href="https://instructure.design">
      <TruncateText position="middle">{lorem.paragraph()}</TruncateText>
    </Link>
  </View>
  <View as="div">
    <Link onClick={() => console.log('clicked')} icon={<IconUser.Line size="small" />}>
      <TruncateText>{lorem.paragraph()}</TruncateText>
    </Link>
  </View>

</View>
```

### Using icons

Use the `icon` property to put an [icon](#iconography) inside a Link. To position the
icon _after_ the link text, change the `iconPlacement` property to `end`. You can also
render a Link with just an icon. Don't forget to add text for screen readers, though.

```js
---
example: true
---
<div>
  <View as="div" margin="0 0 small">
    <Link href="https://instructure.design" icon={<IconUser.Line size="small" />}>Icon before text</Link>
  </View>
  <View as="div" margin="0 0 small">
    This Link has an icon and displays inline with text. <Link
      href="https://instructure.design"
      icon={<IconUser.Solid />}
      iconPlacement="end"
    >
      Icon appears after Link text
    </Link>. This is more text after the link.
  </View>
  <View as="div">
    This Link consists of only an icon&nbsp;
    <Link onClick={() => console.log('clicked!')} icon={IconUser.Solid}>
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
    <FigureItem>Use the <code>inverse</code> variant when a Link appear on a dark background to ensure adequate contrast</FigureItem>
    <FigureItem>Links must have a non-empty href attribute in order to be considered true links and to be accessible to keyboard users</FigureItem>
  </Figure>
</Guidelines>
```
