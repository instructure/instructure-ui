---
title: Adding new icons
category: Contributor Guides
order: 9
---

## Adding and Modifying Icons

- Use dashes in the name of the .svg files (e.g `calendar-month`).
- Use the same name for the "Line" and "Solid" variants, and save them in the respective folder, e.g. `instructure-ui/packages/ui-icons/svg/Line/calendar-month.svg` and `instructure-ui/packages/ui-icons/svg/Solid/calendar-month.svg`.
- Double-check that the SVG size is 1920x1920.

```js
---
type: code
---
<svg
  width="1920"
  height="1920"
  viewBox="0 0 1920 1920"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {...}
</svg>
```

- The files cannot contain [clipping paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath)! Sadly, when the Designers export icons from Figma, most of the time they have a clipping path around the whole canvas. When an SVG includes clipping paths, the `Icon Font` variant may not render correctly. Specifically, the use of `<g clip-path="...">` and `<clipPath id="...">` elements can cause rendering issues. If the source code has them, manually refactor the code, e.g:

```js
---
type: code
---

// Before:
<svg
  width="1920"
  height="1920"
  viewBox="0 0 1920 1920"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_1007_24)">
    <path d="..." fill="#2D3B45" />
  </g>
  <defs>
    <clipPath id="clip0_1007_24">
      <rect width="1920" height="1920" fill="white" />
    </clipPath>
  </defs>
</svg>

// After:
<svg
  width="1920"
  height="1920"
  viewBox="0 0 1920 1920"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="..." fill="#2D3B45" />
</svg>
```

- If the icon has to be bidirectional (being mirrored in RTL mode, typically arrow icons), add the icon name to the bidirectional list in `packages/ui-icons/icons.config.js`. Deprecated icons are handled here as well.

- Run `npm run bootstrap`.

- Finally, run `npm run dev` and verify that the icons are displayed correctly under [Icons](/#icons). Check all 3 versions (React, SVG and icon font).

(Note: The fonts are sometimes not rendered correctly, but we decided not to fix them, because they are not really used anywhere, and we might stop supporting icon fonts in the future in general.)

### Guidelines for Drawing Icons

- Draw your icons on the 1920 x 1920 art-boards.

- Before you flatten shapes or vectorize strokes as described below, make a hidden copy of the original paths off
  to the side so that you can more easily come back and make changes later.

- Flatten your shapes.

- Export strokes to vector.

- Don’t use borders on vectors, especially not inside/outside borders which aren’t supported in SVG. Do not use clipping paths.

- Make sure none of the paths go outside of the art-board. If so, the glyph in the icon font will be misaligned.
  Draw inside the lines.

- Fill the space edge-to-edge as much as possible. The build process will add margins as needed.

- Don't use inline styles

- Don't use `class` or `for` attributes

- Always have `<svg>` as the root tag
