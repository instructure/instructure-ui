---
title: Freezing themes
category: Contributing
order: 9
---

# Freezing themes

## Why freeze?

Component themes in the new theming system are generated from `@instructure/instructure-design-tokens`. That package has its own semantic version, so a major bump can rename, reshape, or drop tokens a component relies on.

If a component's theme variables change in a way that breaks the component, we freeze the component's current theme structure. The component keeps resolving its tokens from that frozen snapshot, so it renders the same after the breaking token change. This is the theming counterpart of the [Multi-Version System](#multi-version-system): the old component version stays intact, and the frozen theme is what keeps it intact.

## How to freeze

When design tokens release a new major version, snapshot the previous one. For a 4.0.0 release, the previous major is 3, so add:

```sh
---
type: code
---
packages/ui-themes/src/themes/frozenThemes/designTokensV3/
├── index.ts
├── primitives.ts
├── semantics.ts
├── sharedTokens.ts
└── components/
    ├── index.ts
    └── <component>/
        ├── type.ts
        ├── canvas.ts
        ├── canvasHighContrast.ts
        ├── dark.ts
        └── light.ts
```

The folder is a partial theme. Include only what broke:

- the themes of the components that broke in 4.0.0, one folder per component with a file per theme key (`canvas`, `canvas-high-contrast`, `dark`, `light`)
- primitives, semantics, and shared tokens, but only if those broke too

Then export the snapshot and its component types from `frozenThemes/index.ts` and from the `ui-themes` entry point, and register the component value types in the `FrozenComponentValues` union in `packages/ui-themes/src/index.ts`. That union is what makes `themeOverride.components` accept the frozen token shape.

See `packages/ui-themes/src/themes/frozenThemes/designTokensV1` for a worked example.

## What's next?

A frozen component opts in by passing the snapshot to `withStyleNew` or `useStyleNew` and typing its theme against the snapshot's component types.

```js
---
type: code
---
// class component
import { frozenThemesDesignTokensV1 } from '@instructure/ui-themes'

@withStyleNew(generateStyle, null, frozenThemesDesignTokensV1)
class Alert extends Component<AlertProps, AlertState> { /* ... */ }

// function component
const styles = useStyleNew({
  generateStyle,
  componentId: 'Pill',
  themeOverride: props.themeOverride,
  frozenTheme: frozenThemesDesignTokensV1
})
```

`props.ts` and `styles.ts` switch from `NewComponentTypes` to the frozen types:

```js
---
type: code
---
import type { DesignTokensV1ComponentTypes } from '@instructure/ui-themes'

const generateStyle = (
  componentTheme: ReturnType<DesignTokensV1ComponentTypes['Alert']>,
  props: AlertProps,
  sharedTokens: SharedTokens
): AlertStyle => { /* ... */ }
```
