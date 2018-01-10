---
category: packages
---

## ui-icons

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]


### Installation

```sh
yarn add --dev @instructure/ui-icons
```

### Usage

To use the React components:

```js
import { IconAddLine } from '@instructure/ui-icons'

function MyComponent () {
  return <IconAddLine />
}
```


### Adding and Modifying Icons

- Start with the
  [Sketch template](https://github.com/instructure/instructure-ui/tree/master/packages/ui-icons/template.sketch).
  Open the template file and then save it as a template (File > Save as Template...).
  The next time you want to make an icon it will be available in your template list (File > New From Template) in the
  Sketch app.

- Use dashes in the name of the .sketch files (e.g `calendar-month`).
  Use the same name for art-boards, but prefix with the variant, e.g. `solid/calendar-month` and `line/calendar-month`.

- Save new icon files in the `/src` directory.

- Run `yarn export:icons` from the repository root directory to generate the SVG files.

- Verify that the art-boards are exported as SVG to the `/src/__svg__` directory. There should be
  directories for each variant based on the art-board names.

- Run `yarn start:watch` from the repository root directory to start the local server and check the generated output.


### Guidelines for Drawing Icons

- Draw your icons on the 1920 x 1920 art-boards that are set up for you in the template.

- Before you flatten shapes or vectorize strokes as described below, make a hidden copy of the original paths off
  to the side so that you can more easily come back and make changes later.

- Flatten your shapes (Layer > Paths > Flatten).

- Export strokes to vector (Layer > Convert to Outlines).

- Don’t use borders on vectors, especially not inside/outside borders which aren’t supported in SVG.

- Make sure none of the paths go outside of the art-board. If so, the glyph in the icon font will be misaligned.
  Draw inside the lines.

- Fill the space edge-to-edge as much as possible. The build process will add margins as needed.


[npm]: https://img.shields.io/npm/v/@instructure/ui-icons.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-icons

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
