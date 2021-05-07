---
category: packages
---

## ui-icons

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

### Installation

```sh
yarn add @instructure/ui-icons
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

- Run `yarn export:icons` from the repository root directory to generate the SVG files.

- Run `yarn && yarn bootstrap`.

- Finally, run `yarn dev` from the repository root directory to start the local server and check the generated output.

- Verify icons display correctly by checking under `iconography` in the main nav

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
