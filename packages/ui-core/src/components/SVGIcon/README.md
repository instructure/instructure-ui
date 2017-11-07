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

The `fill` is set to `currentColor` and the default `width` and `height` are set to `1em` so you can change the
size and color of the icons via CSS `color` and `font-size` rules on the parent element.

```js
---
example: true
---
<SVGIcon src={iconExample} width="2em" height="2em" title="Icon Example" />
```

The SVGIcon component also accepts SVG content as jsx via the children prop.

```js
---
example: true
---
<SVGIcon width="2em" height="2em" viewBox="0 0 2000 2000">
  <path d="M1692.48 910.647l-732.762 687.36-731.182-685.779c-154.616-156.875-154.616-412.122 0-568.997 74.542-75.558 173.704-117.233 279.304-117.233h.113c105.487 0 204.65 41.675 279.078 117.233l.113.113c74.767 75.783 116.103 176.865 116.103 284.385h112.941c0-107.52 41.224-208.602 116.104-284.498 74.428-75.558 173.59-117.233 279.19-117.233h.113c105.487 0 204.763 41.675 279.19 117.233 154.617 156.875 154.617 412.122 1.695 567.416m78.833-646.701c-95.887-97.355-223.737-150.89-359.718-150.89h-.113c-136.094 0-263.83 53.535-359.604 150.777-37.61 38.061-68.443 80.979-92.16 127.398-23.718-46.42-54.664-89.337-92.16-127.285-95.774-97.355-223.51-150.89-359.605-150.89h-.113c-135.981 0-263.83 53.535-359.83 150.89-197.648 200.696-197.648 526.983 1.694 729.035l810.014 759.868L1771.313 991.4c197.647-200.47 197.647-526.758 0-727.454" stroke="none" strokeWidth="1" fillRule="evenodd"/>
</SVGIcon>
```

SVGIcon can be rotated by adding a `rotate` prop of 0 (default), 90, 180, or 270.

```js
---
example: true
---
<SVGIcon src={iconExample} width="2em" height="2em" rotate="90" />
```
