---
describes: SVGIcon
---

SVGIcon renders an accessible SVG icon inline in the HTML document.

In this example `iconExample` is the SVG source loaded as a string. You can use a webpack
loader like [svg-inline-loader](https://github.com/webpack-contrib/svg-inline-loader) to import
the SVG source into your react component.

The SVGIcon component will add title and description elements for you if you set the `title`
and `description` props. See the [InlineSVG](#InlineSVG) component for more props and
examples.

_A11y note:_ By default the role is set to `presentation`. However, when the `title` prop is set, the `role`
attribute is set to `img`. Include the `description` prop to further describe the image.

### Default icon size

By default SVGIcon is set to a size of `1em`, so it will scale to match the `font-size` of
its parent element.

```js
---
example: true
---
<div>
  <div>I <SVGIcon src={iconExample} title="love" /> New York!</div>
  <Heading>I <SVGIcon src={iconExample} title="love" /> New York!</Heading>
</div>
```

### Changing icon size
To change the size of the icon, use one of the predefined options for the `size` prop.

```js
---
example: true
---
<div>
  <SVGIcon src={iconExample} size="x-small" title="Icon Example" />
  <SVGIcon src={iconExample} size="small" title="Icon Example" />
  <SVGIcon src={iconExample} size="medium" title="Icon Example" />
  <SVGIcon src={iconExample} size="large" title="Icon Example" />
  <SVGIcon src={iconExample} size="x-large" title="Icon Example" />
</div>
```

If you need a size that is not offered via the `size` prop, adjust the
`font-size` on the icon's parent element.

```js
---
example: true
---
<div style={{fontSize: '15rem', lineHeight: 1}}>
  <SVGIcon src={iconExample} title="Icon Example" />
</div>
```

### Changing icon color

By default SVGIcon inherits the color of its parent element. However,
[InlineSVG](#InlineSVG), the child component of SVGIcon, supports setting
the icon to one of the theme colors via the `color` property.

```js
---
example: true
---
<div>
  <SVGIcon color="primary" src={iconExample} size="large" title="Icon Example" />
  <SVGIcon color="secondary" src={iconExample} size="large" title="Icon Example" />
  <SVGIcon color="brand" src={iconExample} size="large" title="Icon Example" />
  <SVGIcon color="success" src={iconExample} size="large" title="Icon Example" />
  <SVGIcon color="warning" src={iconExample} size="large" title="Icon Example" />
  <SVGIcon color="error" src={iconExample} size="large" title="Icon Example" />
</div>
```

```js
---
example: true
inverse: true
---
<div>
  <SVGIcon color="primary-inverse" src={iconExample} size="large" title="Icon Example" />
  <SVGIcon color="secondary-inverse" src={iconExample} size="large" title="Icon Example" />
</div>
```

### Changing icon rotation

SVGIcon can be rotated by adding a `rotate` prop of 0 (default), 90, 180, or 270.

```js
---
example: true
---
<SVGIcon src={iconExample} size="medium" rotate="90" />
```

### Changing the icon's display property

SVGIcon defaults to displaying `inline-block`, which can result in some space
appearing beneath the icon, as it will inherit its parent's `line-height`.
In situations where this is undesirable, you can set `inline` to `false` to make
the icon display as a block-level element.

```js
---
example: true
---
<SVGIcon src={iconExample} size="medium" inline={false} />
```

### Children

The SVGIcon component also accepts SVG content as jsx via the children prop. Note: if passing the path via the children prop, do not forget to include the **viewBox** attribute (see example).

```js
---
example: true
---
<SVGIcon size="small" viewBox="0 0 2000 2000">
  <path d="M1692.48 910.647l-732.762 687.36-731.182-685.779c-154.616-156.875-154.616-412.122 0-568.997 74.542-75.558 173.704-117.233 279.304-117.233h.113c105.487 0 204.65 41.675 279.078 117.233l.113.113c74.767 75.783 116.103 176.865 116.103 284.385h112.941c0-107.52 41.224-208.602 116.104-284.498 74.428-75.558 173.59-117.233 279.19-117.233h.113c105.487 0 204.763 41.675 279.19 117.233 154.617 156.875 154.617 412.122 1.695 567.416m78.833-646.701c-95.887-97.355-223.737-150.89-359.718-150.89h-.113c-136.094 0-263.83 53.535-359.604 150.777-37.61 38.061-68.443 80.979-92.16 127.398-23.718-46.42-54.664-89.337-92.16-127.285-95.774-97.355-223.51-150.89-359.605-150.89h-.113c-135.981 0-263.83 53.535-359.83 150.89-197.648 200.696-197.648 526.983 1.694 729.035l810.014 759.868L1771.313 991.4c197.647-200.47 197.647-526.758 0-727.454" stroke="none" strokeWidth="1" fillRule="evenodd"/>
</SVGIcon>
```
