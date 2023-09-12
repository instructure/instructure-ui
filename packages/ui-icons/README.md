---
category: packages
---

## ui-icons

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
npm install @instructure/ui-icons
```

### Usage

To use the React components:

```js
import { IconAddLine } from '@instructure/ui-icons'

const MyComponent = () => {
  return <IconAdd />
}
```

### Adding and Modifying Icons

- Use dashes in the name of the .svg files (e.g `calendar-month`).
  Use the same name for the "line" and "solid" variants, and save them in the respective folder, e.g. `Solid/calendar-month` and `Line/calendar-month`.

- Copy the new icon files in the `/svg/Solid` and `/svg/Line` directories.

- Double-check that the SVG size is 1920x1920.

```html
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

- The files cannot contain [clipping paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath)! Sadly, when the Designers export icons from Figma, most of the time they have a clipping path around the whole canvas. If the source code has them, manually refactor the code, e.g:

```html
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

- If the icon has to bidirectional (being mirrored in RTL mode, typically arrow icons), add the icon name to the bidirectional list in `packages/ui-icons/icons.config.js`. Deprecated icons are handled here as well.

- Run `npm run export:icons` from the repository root directory to generate the icons. This script will also take care of further optimizations on the SVG files (e.g. removing the `fill`s). The configs for this are located in `packages/ui-icons-build/lib/tasks/optimize-svgs/index.js` and `packages/ui-icons/svgo.config.js`.

- Run `npm install && npm run bootstrap`.

- Finally, run `npm run dev` from the repository root directory to start the local server and check the generated output.

- Verify icons display correctly by checking under [iconography](/#iconography) in the main nav. Check all 3 versions (React, SVG and icon font).

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

[npm]: https://img.shields.io/npm/v/@instructure/ui-icons.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-icons
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
