# InlineSVG


The InlineSVG component renders an accessible SVG inline in the html document.
InlineSVG accepts the `className` prop, which you can use to style your image.

> If you are rendering a square SVG icon, use [SVGIcon](SVGIcon), which provides
> props and styles specific to icons, such as pre-defined sizes.

### Setting a fixed `width` or `height`

For sizing, the component accepts `width` and `height` props, which are added
to the SVG as attributes.

```js
---
type: example
---
<InlineSVG src={iconExample} width="3em" height="3em" />
```

### Sizing to fill container

If you want your SVG to expand to fill its container, set both `height`
and `width` to `auto`.

> Note that setting `inline` to `false` will cause the SVG to display block, which
> can be useful for removing any extra space at the bottom of the image that results from
> `line-height` being inherited.

```js
---
type: example
---
<View
  as="div"
  width="15rem"
  borderWidth="small"
>
  <InlineSVG
    width="auto"
    height="auto"
    inline={false}
    viewBox="0 0 500 500"
  >
    <circle cx="250" cy="250" r="250" />
  </InlineSVG>
</View>
```

### Using SVG sprite sheets with `<use>` elements

By default, `<use>` elements are stripped for security. When rendering SVG
sprite sheets that use `<use xlink:href="#id">` references to `<symbol>` or
`<path>` definitions, set `allowUseElement` to allow same-document fragment
references. External URLs are blocked for security.

```js
---
type: example
---
const spriteSvg = `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <circle id="dot" cx="20" cy="20" r="18" />
  </defs>
  <use href="#dot" x="0" fill="#0374B5" />
  <use href="#dot" x="40" fill="#03893D" />
  <use href="#dot" x="80" fill="#E62429" />
</svg>`

render(
  <div>
    <p>
      <code>allowUseElement</code> set: the three circles render:
    </p>
    <InlineSVG src={spriteSvg} width="9rem" height="3rem" allowUseElement />
    <p>
      Without <code>allowUseElement</code>: the <code>&lt;use&gt;</code>{' '}
      elements are stripped, so nothing is drawn:
    </p>
    <InlineSVG src={spriteSvg} width="9rem" height="3rem" />
  </div>
)
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| InlineSVG | children | `React.ReactNode` | No | - |  |
| InlineSVG | src | `string` | No | `''` |  |
| InlineSVG | title | `string` | No | `''` |  |
| InlineSVG | description | `string` | No | `''` |  |
| InlineSVG | focusable | `boolean` | No | `false` |  |
| InlineSVG | width | `string \| number` | No | `'1em'` | Width of the SVG. Accepts valid CSS unit strings like '1rem' To let the SVG expand to fill its container, use "`auto`" |
| InlineSVG | height | `string \| number` | No | `'1em'` | Height of the SVG. Accepts valid CSS unit strings like '1rem' To let the SVG expand to fill its container, use "`auto`" |
| InlineSVG | inline | `boolean` | No | `true` |  |
| InlineSVG | color | `\| 'inherit' \| 'primary' \| 'secondary' \| 'primary-inverse' \| 'secondary-inverse' \| 'success' \| 'error' \| 'alert' \| 'warning' \| 'brand' \| 'auto'` | No | `'inherit'` |  |
| InlineSVG | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| InlineSVG | allowUseElement | `boolean` | No | - | Allow `<use>` elements with `href`/`xlink:href` attributes. When enabled, only same-document fragment references (e.g. `#my-symbol`) are permitted; external URLs are blocked. |

### Usage

Install the package:

```shell
npm install @instructure/ui-svg-images
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { InlineSVG } from '@instructure/ui-svg-images'
```

