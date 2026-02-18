## ui-icons

[![npm][npm]][npm-url]
[![MIT License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]

Icon set for Instructure products. Provides ~2,000 React icon components with InstUI semantic
theming, automatic stroke-width scaling, RTL support, and an AI gradient color.

---

### Installation

```sh
npm install @instructure/ui-icons
```

---

### Usage

```tsx
import { SearchInstUIIcon, AiInfoInstUIIcon } from '@instructure/ui-icons'

// Basic
<SearchInstUIIcon />

// With semantic tokens
<SearchInstUIIcon size="lg" color="baseColor" />

// Accessible (adds aria-label + role="img")
<SearchInstUIIcon size="md" color="errorColor" title="Search" />

// AI gradient color
<AiInfoInstUIIcon size="md" color="ai" />

// Rotate
<SearchInstUIIcon rotate="90" />
```

All icons accept the same props — see the [Props](#props) section below.

---

### Icon sources

The package exports icons from three sources, all under the same `<Name>InstUIIcon` naming pattern:

| Source     | Count  | Examples                                   | Notes                                                 |
| ---------- | ------ | ------------------------------------------ | ----------------------------------------------------- |
| **Lucide** | ~1,900 | `SearchInstUIIcon`, `HeartInstUIIcon`      | Stroke-based, from [lucide-react](https://lucide.dev) |
| **Custom** | ~85    | `AiInfoInstUIIcon`, `CanvasLogoInstUIIcon` | Instructure-specific, from `svg/Custom/`              |
| **Legacy** | ~770   | `IconSearchLine`, `IconSearchSolid`        | Class components, kept for backwards compatibility    |

Custom icons take precedence: if `svg/Custom/` contains an icon with the same name as a Lucide icon,
the custom version is exported and the Lucide one is hidden.

**Namespace imports** (useful in galleries or when distinguishing sources):

```tsx
import { CustomIcons, LucideIcons } from '@instructure/ui-icons'

const icon = CustomIcons.AiInfoInstUIIcon // always the custom version
const icon = LucideIcons.SearchInstUIIcon // always Lucide
```

---

### Props

All `InstUIIcon` components accept `InstUIIconProps`:

| Prop            | Type                                  | Default     | Description                                        |
| --------------- | ------------------------------------- | ----------- | -------------------------------------------------- |
| `size`          | `SizeToken`                           | `undefined` | Semantic size token                                |
| `color`         | `ColorToken`                          | `undefined` | Semantic color token                               |
| `rotate`        | `'0' \| '90' \| '180' \| '270'`       | `'0'`       | SVG rotation                                       |
| `bidirectional` | `boolean`                             | `true`      | Flip horizontally in RTL (`dir="rtl"`) contexts    |
| `inline`        | `boolean`                             | `true`      | `inline-block` when true, `block` when false       |
| `title`         | `string`                              | —           | Adds `aria-label` + `role="img"` for accessibility |
| `elementRef`    | `(el: SVGSVGElement \| null) => void` | —           | Ref callback to the SVG element                    |
| `themeOverride` | `ThemeOverrideValue`                  | —           | InstUI theme override                              |

#### Size tokens

| Token     | Size                             |
| --------- | -------------------------------- |
| `xs`      | 8 px                             |
| `sm`      | 16 px                            |
| `md`      | 24 px (default in most contexts) |
| `lg`      | 32 px                            |
| `xl`      | 40 px                            |
| `2xl`     | 48 px                            |
| `illu-sm` | 64 px                            |
| `illu-md` | 96 px                            |
| `illu-lg` | 128 px                           |

Stroke width is automatically derived from size to maintain consistent visual weight — it is not a
free prop.

#### Color tokens

All InstUI semantic color tokens are accepted, plus two special values:

| Special value | Behaviour                                                                          |
| ------------- | ---------------------------------------------------------------------------------- |
| `ai`          | Renders an AI gradient (top → bottom linear gradient via `actionAi*` theme tokens) |
| `inherit`     | Uses `currentColor` (inherits from parent CSS)                                     |

Common semantic tokens: `baseColor`, `mutedColor`, `successColor`, `errorColor`, `warningColor`,
`infoColor`, `accentBlueColor`, `accentGreenColor`, `accentVioletColor`, …

---

### Legacy icons

The original class-component icons (`IconSearchLine`, `IconSearchSolid`, etc.) are still exported
from `@instructure/ui-icons` for backwards compatibility. They accept `SVGIconProps` from
`@instructure/ui-svg-images`.

To migrate from legacy icons to the new `InstUIIcon` API, use the codemod:

```sh
npx @instructure/ui-codemods migrateToNewIcons <path>
```

---

### Adding custom icons

1. Move the `.svg` file into `svg/Custom/`. The filename becomes the export name:
   `my-icon.svg` → `MyIconInstUIIcon`
2. Regenerate the index:
   ```sh
   pnpm run generate-custom
   ```

---

#### Generated files

`src/lucide/index.ts` and `src/custom/index.ts` are **generated** — do not edit them manually.

| File                  | Generated by                     | Command                    |
| --------------------- | -------------------------------- | -------------------------- |
| `src/lucide/index.ts` | `scripts/generateLucideIndex.ts` | `pnpm run generate-lucide` |
| `src/custom/index.ts` | `scripts/generateCustomIndex.ts` | `pnpm run generate-custom` |

Both scripts are **not** part of the normal build — run them manually when:

- Updating the `lucide-react` version → run `generate-lucide`
- Adding/changing SVG files in `svg/Custom/` → run `generate-custom`

#### How icons are rendered

**Lucide icons** — the generated index wraps each Lucide component:

```ts
export const SearchInstUIIcon = wrapLucideIcon(Lucide.Search)
```

At render time `wrapLucideIcon` calls `useStyle()` to resolve semantic tokens, then delegates to
the Lucide component via `size`, `color`, `strokeWidth`, and `absoluteStrokeWidth` props.

**Custom icons** — the generated index embeds a flat `iconNode` array parsed from the SVG:

```ts
export const AiInfoInstUIIcon = wrapCustomIcon(
  [['path', { d: 'M12…', stroke: 'currentColor' }]],
  'AiInfo',
  '0 0 24 24'
)
```

At render time `wrapCustomIcon` calls `useStyle()` then builds the SVG manually with
`React.createElement`. Stroke width is converted from CSS units to SVG user units:
`strokeWidth = numericStrokeWidth / (numericSize / viewBoxWidth)`.

**AI gradient** — both wrappers handle `color="ai"` by injecting a hidden `<svg>` containing a
`<linearGradient>` into the DOM before the icon SVG. The gradient is referenced by a stable
per-instance `useId()` ID to avoid collisions.

---

[npm]: https://img.shields.io/npm/v/@instructure/ui-icons.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-icons
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE.md
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
