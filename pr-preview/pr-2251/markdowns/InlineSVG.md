# InlineSVG


The InlineSVG component renders an accessible SVG inline in the html document.
InlineSVG accepts the `className` prop, which you can use to style your image.

> If you are rendering a square SVG icon, use [SVGIcon](#SVGIcon), which provides
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

