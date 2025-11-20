# Link


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
    <Link renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/" size="small">
      Small link
    </Link>
  </div>
  <br />
  <div>
    <Link renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/" size="medium">
      Medium link
    </Link>
  </div>
  <br />
  <div>
    <Link renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/" size="large">
      Large link
    </Link>
  </div>
  <br />
  <div>
    <Text size="large">This is large text with an <Link renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">inherited size link</Link></Text>
  </div>
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
    In a line of text you should use the <Link variant="inline" size="medium" renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">inline</Link> link variant.
  </div>
  <br />
  <div>
    If the link is standalone (not in a text), use the <code>standalone</code> variant:
    <Link display="block" variant="standalone" size="medium" renderIcon={<IconUserLine />} href="https://instructure.github.io/instructure-ui/">standalone</Link>
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
  renderIcon={<IconUserLine />}
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
    <Link href="https://instructure.design" renderIcon={<IconUserLine />}>Icon before text</Link> with the quick brown fox
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Link | children | `React.ReactNode` | Yes | - | The text and/or icon displayed by the link |
| Link | href | `string` | No | - | Sets the link's `href` attribute |
| Link | color | `'link' \| 'link-inverse'` | No | - | Designates Link's text color to accommodate light and dark backgrounds |
| Link | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying HTML element |
| Link | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | The element type to render as (will default to `<a>` if href is provided) |
| Link | role | `string` | No | - | The ARIA role of the element. |
| Link | forceButtonRole | `boolean` | No | - | If the Link has an onClick handler but is not a button element, force ARIA role to be "button". |
| Link | interaction | `'enabled' \| 'disabled'` | No | - | Determines if the link is enabled or disabled |
| Link | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Link | renderIcon | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Add an SVG icon to the Link. Do not add icons directly as children. |
| Link | iconPlacement | `'start' \| 'end'` | No | - | Place the icon before or after the text in the Link. |
| Link | display | `'auto' \| 'block' \| 'inline-block' \| 'flex' \| 'inline-flex'` | No | - | Set the CSS display property of the Link element. 'auto' sets no display property. |
| Link | isWithinText | `boolean` | No | - | Set `false` to remove default underline if Link does not appear inline with text |
| Link | onBlur | `(event: React.FocusEvent<ViewOwnProps>) => void` | No | - | Fires when the Link loses focus |
| Link | onClick | `(event: React.MouseEvent<ViewOwnProps>) => void` | No | - | Fires when the Link is clicked |
| Link | onFocus | `(event: React.FocusEvent<ViewOwnProps>) => void` | No | - | Fires when the Link gains focus |
| Link | onMouseEnter | `(event: React.MouseEvent<ViewOwnProps>) => void` | No | - | Fires when the Link is hovered |
| Link | size | `'small' \| 'medium' \| 'large'` | No | - | Sets the size of the link (font size, line height, and icon gap) |
| Link | variant | `'inline' \| 'standalone' \| 'inline-small' \| 'standalone-small'` | No | - | Sets pre-defined values for the component to achieve specific roles for the component - `inline` - `standalone` __Deprecated values:__ - `inline-small` - `standalone-small` |
| Link | to | `string` | No | - | Needed for React Router links @private |

### Usage

Install the package:

```shell
npm install @instructure/ui-link
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Link } from '@instructure/ui-link'
```

