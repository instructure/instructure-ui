## ui-icons-svg

Raw SVG source files for the Instructure UI icon set, with no React peer dependency.

### Layout

```
Line/    — line variant icons
Solid/   — solid variant icons
Custom/  — brand and custom icons
```

### Usage

```js
const path = require('path')
const fs = require('fs')

const pkgDir = path.dirname(
  require.resolve('@instructure/ui-icons-svg/package.json')
)
const svg = fs.readFileSync(path.join(pkgDir, 'svg/Line/a11y.svg'), 'utf8')
```

Or via subpath import (with a bundler that handles `.svg`):

```js
import a11ySvgUrl from '@instructure/ui-icons-svg/Line/a11y.svg'
```

### Why a separate package

These SVGs power the React components in `@instructure/ui-icons`, but consumers
that don't use React (e.g. Lit-based component libraries) need access to the raw
source files without inheriting a `react` peer dependency. Splitting the SVGs
into their own package keeps the React contract clean for `ui-icons` while
making the source files freely consumable elsewhere.
