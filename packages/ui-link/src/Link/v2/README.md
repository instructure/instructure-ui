---
describes: Link
---

### Where to use Link

`Link` is intended for presenting actions **inline with other content**, such as within headings or sentences. Typically those actions navigate the user to a different view.

```js
---
type: example
---
<Link href="https://instructure.github.io/instructure-ui/" target="_blank">
  Link text
</Link>
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

If neither `href` nor `onClick` is provided, the Link will render as plain text (a `<span>` element) without interactive styling:

```js
---
type: example
---
<div>
  <Text>This is a Link with no href or onClick: <Link>I look like plain text</Link></Text>
</div>
```

### Size

The `size` prop controls the font size, line height, and icon size, icon gap. Available sizes are `small`, `medium`, and `large`.

```js
---
type: example
---
<div>
  <div>
    <Link renderIcon={<DiamondInstUIIcon />} variant="standalone" href="https://instructure.github.io/instructure-ui/" size="small">
      Link small
    </Link>
  </div>
  <br />
  <div>
    <Link renderIcon={<DiamondInstUIIcon />} variant="standalone" href="https://instructure.github.io/instructure-ui/" size="medium">
      Link medium
    </Link>
  </div>
  <br />
  <div>
    <Link renderIcon={<DiamondInstUIIcon />} variant="standalone" href="https://instructure.github.io/instructure-ui/" size="large">
      Link large
    </Link>
  </div>
  <br />
</div>
```

### Variant

The `variant` prop controls the text decoration and intended use case. Available variants are `inline` (underlined, for use within text) and `standalone` (no underline, for standalone links).

Use the `variant` prop in combination with the `size` prop to control both the appearance and size of the link.

```js
---
type: example
---
<div>
  <div>
    In a line of text you should use the <Link variant="inline" size="medium" renderIcon={<DiamondInstUIIcon />} href="https://instructure.github.io/instructure-ui/">inline</Link> link variant.
  </div>
  <br />
  <div>
    If the link is standalone (not in a text), use the <code>standalone</code> variant:
    <Link variant="standalone" size="medium" renderIcon={<DiamondInstUIIcon />} href="https://instructure.github.io/instructure-ui/">standalone</Link>
  </div>
</div>
```

#### Deprecated variant values

**The following variant values are deprecated and will be removed in a future version:**

- `inline-small`
- `standalone-small`

These deprecated values are still supported for backward compatibility but will trigger console warnings. Please update your code to use the new `variant` + `size` prop combination.

```js
---
type: code
---
// Deprecated (still works but triggers warning)
<Link variant="inline-small" href="#">Link</Link>
<Link variant="standalone-small" href="#">Link</Link>

// Recommended
<Link variant="inline" size="small" href="#">Link</Link>
<Link variant="standalone" size="small" href="#">Link</Link>
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

### Truncating text

Use [TruncateText](TruncateText) to truncate text within Link. Note this will cause Link to display `inline-flex`,
unless an alternate `display` prop is provided.

```js
---
type: example
---
<Link
  onClick={() => console.log('clicked')}
  renderIcon={<DiamondInstUIIcon />}
>
  <TruncateText>{lorem.paragraph()}</TruncateText>
</Link>
```

### Using icons

Use the `renderIcon` property to put an [icon](icons) inside a Link. To position the
icon _after_ the link text, change the `iconPlacement` property to `end`. You can also
render a Link with just an icon. Don't forget to add text for screen readers, though.

```js
---
type: example
---
<div>
  <View as="div" margin="0 0 small">
    <Link href="https://instructure.design" renderIcon={<DiamondInstUIIcon />}>Icon before text</Link> with the quick brown fox
  </View>
  <View as="div" margin="0 0 small">
    This Link has an icon and displays inline with text. <Link
      href="https://instructure.design"
      renderIcon={<DiamondInstUIIcon />}
      iconPlacement="end"
    >
      Icon appears after Link text
    </Link>. This is more text after the link.
  </View>
  <View as="div">
    This Link consists of only an icon&nbsp;
    <Link onClick={() => console.log('clicked!')} renderIcon={<DiamondInstUIIcon />}>
      <ScreenReaderContent>Descriptive text</ScreenReaderContent>
    </Link>.
  </View>
</div>
```

### Theme overrides

Examples showing how [theme overrides](using-theme-overrides) work for Link:

```js
---
type: example
---
<div>
  <InstUISettingsProvider
    theme={{
      newTheme: {
        sharedTokens: {
          focusOutline: {
            infoColor: 'pink',
            width: '0.5rem',
          }
        }
      }
    }}
  >
    <Text>The quick brown fox <Link
      href="https://instructure.github.io/instructure-ui/"
      themeOverride={{
        textColor: 'red',
        textHoverColor: 'green',
        fontWeight: 700
      }}>jumps</Link> over the lazy dog.
    </Text>
  </InstUISettingsProvider>
</div>
```

```js
---
type: example
---
<View background="primary-inverse" as="div">
  <Text color="primary-inverse">The quick brown fox <Link
    href="https://instructure.github.io/instructure-ui/"
    color="link"
    themeOverride={{
      textColor: 'red',
      textHoverColor: 'magenta',
      onColorTextColor: 'orange',
      onColorTextHoverColor: 'lime',
      fontWeight: 700
  }}
  >jumps</Link> over the lazy dog.</Text>
  <br />
  <Text color="primary-inverse">The quick brown fox <Link
    href="https://instructure.github.io/instructure-ui/"
    renderIcon={<LogOutInstUIIcon />}
    color="link-inverse"
    themeOverride={{
      textColor: 'red',
      textHoverColor: 'magenta',
      onColorTextColor: 'orange',
      onColorTextHoverColor: 'lime',
      fontWeight: 700
  }}
  >jumps</Link> over the lazy dog.</Text>
</View>
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
