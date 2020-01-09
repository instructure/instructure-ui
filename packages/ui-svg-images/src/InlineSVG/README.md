---
describes: InlineSVG
---

The InlineSVG component renders an accessible SVG inline in the html document.
InlineSVG accepts the `className` prop, which you can use to style your image.

> If you are rendering a square SVG icon, use [SVGIcon](#SVGIcon), which provides
props and styles specific to icons, such as pre-defined sizes.

### Setting a fixed `width` or `height`

For sizing, the component accepts `width` and `height` props, which are added
to the SVG as attributes.

```js
---
example: true
---
<InlineSVG src={iconExample} width="3em" height="3em" />
```

### Sizing to fill container

If you want your SVG to expand to fill its container, set both `height`
and `width` to `auto`.

> Note that setting `inline` to `false` will cause the SVG to display block, which
can be useful for removing any extra space at the bottom of the image that results from
`line-height` being inherited.

```js
---
example: true
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
