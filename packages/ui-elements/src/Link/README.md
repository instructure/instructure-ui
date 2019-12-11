---
describes: DeprecatedLink
id: DeprecatedLink__README
---

**DEPRECATED:** Link will be removed from `ui-elements` in version 7.0.0. Use the [Link](#Link) from [ui-link](#ui-link) instead. Codemods are available to automatically update imports to the new package.
***

The default behavior when `renderIcon` is used with `<TruncateText />` has changed in [Link from ui-link](#Link):
Link now sets its `display` prop to `inline-flex` instead of `flex`. Please check all areas where you are
using Link with TruncateText. (The `display` prop can be manually reset to `flex`, if needed.)

[Link from ui-link](#Link) also supports a prop to control its text-decoration, to account for situations where
Link is used within and without surrounding text. The following theme variables have been updated to accommodate this change:

- `textDecoration` has been replaced with `textDecorationWithinText` and `textDecorationOutsideText`
- `hoverTextDecoration` has been replaced with `hoverTextDecorationWithinText` and `hoverTextDecorationOutsideText`

### When to use Link

`Link` is intended for presenting actions __inline with other content__, such as within headings or sentences. Typically those actions navigate the user to a different view. If the action is not presented within other content or is grouped with other similar actions, use a [Button](#Button) with variant="link".

```js
---
example: true
---
<Text>The quick brown fox <DeprecatedLink href="https://instructure.github.io/instructure-ui/">jumps</DeprecatedLink> over the lazy dog.</Text>
```

```js
---
example: true
background: 'checkerboard-inverse'
---
<Text color="primary-inverse">The quick brown fox <DeprecatedLink variant="inverse" href="https://instructure.github.io/instructure-ui/">jumps</DeprecatedLink> over the lazy dog.</Text>
```

### Adding margin

Use the `margin` prop to add space to the left or right of the Link. Because
Link displays `inline`, __top and bottom margin will not work__. If you need
to add margin to the top or bottom of Link, wrap it inside a `<View />`.

```js
---
example: true
---
<Text>The quick brown fox <DeprecatedLink href="https://instructure.github.io/instructure-ui/" margin="0 small">jumps</DeprecatedLink> over the lazy dog.</Text>
```

### Truncating text

Use [TruncateText](#TruncateText) to truncate text within Link. Note this will cause Link to display block-level.

```js
---
example: true
---
<View as="div">
  <View as="div" margin="0 0 small">
    <DeprecatedLink href="https://instructure.design/#Link">
      <TruncateText position="middle">{lorem.paragraph()}</TruncateText>
    </DeprecatedLink>
  </View>
  <View as="div">
    <DeprecatedLink onClick={() => console.log('clicked')} icon={<IconUserLine size="small" />}>
      <TruncateText>{lorem.paragraph()}</TruncateText>
    </DeprecatedLink>
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
    <DeprecatedLink href="https://instructure.design" icon={<IconUserLine size="small" />}>Icon before text</DeprecatedLink> with the quick brown fox
  </View>
  <View as="div" margin="0 0 small">
    This Link has an icon and displays inline with text. <DeprecatedLink
      href="https://instructure.design"
      icon={<IconUserLine />}
      iconPlacement="end"
    >
      Icon appears after Link text
    </DeprecatedLink>. This is more text after the link.
  </View>
  <View as="div">
    This Link consists of only an icon&nbsp;
    <DeprecatedLink onClick={() => console.log('clicked!')} icon={IconUserLine}>
      <ScreenReaderContent>Descriptive text</ScreenReaderContent>
    </DeprecatedLink>.
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
    <Figure.Item>Use the <code>inverse</code> variant when a Link appears on a dark background to ensure adequate contrast</Figure.Item>
    <Figure.Item>Links must have a non-empty href attribute in order to be considered true links and to be accessible to keyboard users</Figure.Item>
  </Figure>
</Guidelines>
```
