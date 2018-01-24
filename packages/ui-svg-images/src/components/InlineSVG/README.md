---
describes: InlineSVG
---

The InlineSVG component renders an accessible SVG inline in the html document.

**If you are rendering a square SVG icon, use [SVGIcon](#SVGIcon), which provides
props and styles specific to icons, such as pre-defined sizes.**

### Sizing SVGs

InlineSVG accepts the `className` prop, which you can use to style your image.
For sizing, the component accepts `width` and `height` props, which are added
to the SVG as attributes.

Note that setting your SVG to `display: block` will remove extra space at the bottom of
the image that results from it displaying inline (the default).

```js
---
example: true
---
<InlineSVG src={iconExample} width="3em" height="3em" />
```
