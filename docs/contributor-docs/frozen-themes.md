---
title: Frozen Themes
category: Contributor Guides
order: 9
---

# Frozen Themes

## Overview

When a component version is frozen (see [Multi-Version System](multi-version-system)), its theming must also be frozen. The live theme definitions in `@instructure/ui-themes` continue to evolve — tokens get renamed, semantics change, new primitives appear — so an older component version that reads from the live theme would eventually render incorrectly or break.

**Frozen themes** solve this by bundling a complete, self-contained copy of every supported theme (primitives, semantics, shared tokens, and component tokens) at a specific point in time. A frozen component version uses this snapshot instead of the live theme, guaranteeing that its styling never changes regardless of how the live theming system evolves.

## How It Works

### Theme resolution in `withStyle`

The `@withStyle` decorator accepts an optional third argument: a frozen theme object. When present, the decorator uses it instead of the live theme from context:

```ts
---
type: code
---
// Frozen — uses the bundled v11_7 theme snapshot
@withStyle(generateStyle, null, frozenThemes)
class Alert extends Component { ... }

// Not frozen — uses the live theme from context
@withStyle(generateStyle)
class Alert extends Component { ... }
```

At render time, `withStyle` looks up the current theme key (e.g. `"light"`, `"dark"`) in the frozen theme object. If found, it resolves primitives, semantics, shared tokens, and component tokens from the snapshot. If the current theme key does not exist in the snapshot (because a new theme was added after the freeze), an error is logged asking the consumer to upgrade.

### The frozen theme structure

Each frozen theme version lives under `packages/ui-themes/src/themes/frozenThemes/<version>/` and contains a complete, independent copy of every theme variant:

```sh
---
type: code
---
frozenThemes/v11_7/
├── index.ts                          # Exports all theme variants
├── commonTypes.ts                    # BaseTheme, SharedTokens types
├── componentTypes/                   # Frozen component token types
│   ├── alert.ts
│   └── index.ts
├── light/                            # Light theme variant
│   ├── index.ts
│   ├── primitives.ts                 # Raw design tokens (colors, sizes)
│   ├── semantics.ts                  # Semantic tokens (functions of primitives)
│   ├── sharedTokens.ts              # Cross-component tokens (functions of semantics)
│   └── components/
│       └── alert.ts                  # Alert-specific tokens (function of semantics)
├── dark/
│   └── ... (same structure)
├── legacyCanvas/
│   └── ... (same structure)
└── legacyCanvasHighContrast/
    └── ... (same structure)
```

Each theme variant follows the same layered architecture as the live theme:

**Primitives** → **Semantics** → **Shared Tokens** → **Component Tokens**

The key difference is that these are frozen copies — they will never be updated when the live theme changes.

### Package exports

Frozen themes are exported from `@instructure/ui-themes` via versioned subpaths:

```json
---
type: code
---
{
  "exports": {
    "./v11_7": {
      "src": "./src/themes/frozenThemes/v11_7/index.ts",
      "import": "./es/themes/frozenThemes/v11_7/index.js"
    }
  }
}
```

Components import them as:

```ts
---
type: code
---
import frozenThemes from '@instructure/ui-themes/v11_7'
```

## Examples with Alert

The examples below use the Alert component to demonstrate the theming behaviors that frozen themes interact with. A frozen component behaves identically to these examples, except its base token values come from its bundled snapshot rather than the live theme.

### 1. Live Alert responds to theme switching

A live (non-frozen) Alert picks up its tokens from whatever theme is active in context. Switching from `canvas` to `light` changes its appearance:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Alert using the "canvas" theme (live tokens from context).
  </Alert>

  <InstUISettingsProvider theme={light}>
    <Alert variant="info" margin="small">
      Alert using the "light" theme (live tokens from context).
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

A **frozen** Alert would ignore this switch entirely. It would look the same in both providers because it reads from its bundled snapshot, not from context. Only the theme **key** (e.g. `"light"`) is used — to select which variant of the snapshot to use.

### 2. Component-level overrides work on frozen components

`themeOverride` on `InstUISettingsProvider` applies on top of the resolved tokens — whether those tokens came from a frozen snapshot or the live theme. The override mechanism is identical:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Default info Alert — no overrides.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      components: {
        Alert: {
          infoBorderColor: 'darkblue',
          infoIconBackground: 'darkblue'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Overridden info Alert — dark blue border and icon. This override works
      identically on a frozen Alert.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

### 3. Per-instance `themeOverride` prop

Individual component instances also accept `themeOverride` for one-off styling. This has the highest priority and works on both frozen and live components:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Default info Alert.
  </Alert>
  <Alert
    variant="info"
    margin="small"
    themeOverride={{
      infoBorderColor: 'crimson',
      infoIconBackground: 'crimson'
    }}
  >
    Per-instance override — crimson info styling. Works on frozen components too.
  </Alert>
</InstUISettingsProvider>
```

### 4. Semantic overrides — where frozen and live diverge

This is where frozen themes make a visible difference. A semantic override changes a design-system-level token (e.g. the "error" stroke color) and cascades to every live component that references it:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="error" margin="small">
    Default error Alert.
  </Alert>
  <Alert variant="warning" margin="small">
    Default warning Alert.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      semantics: {
        color: {
          stroke: {
            error: 'deeppink',
            warning: 'darkviolet'
          },
          background: {
            error: 'deeppink',
            warning: 'darkviolet'
          }
        }
      }
    }}
  >
    <Alert variant="error" margin="small">
      Live Alert — error color changed to deep pink via semantic override.
    </Alert>
    <Alert variant="warning" margin="small">
      Live Alert — warning color changed to dark violet via semantic override.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

A **frozen** Alert would be **immune** to this semantic override. Its tokens were computed from the frozen semantic layer at freeze time, so changing the live semantics has no effect. Only a direct `components.Alert` override (examples 2 and 3 above) can change a frozen Alert's appearance.

### 5. Primitive overrides — also ignored by frozen components

Similarly, overriding a primitive cascades through the live semantic and component layers, but does not reach frozen components:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <Alert variant="info" margin="small">
    Default info Alert with standard blue.
  </Alert>

  <InstUISettingsProvider
    themeOverride={{
      primitives: {
        color: {
          blue: {
            blue100: 'rebeccapurple'
          }
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Live Alert — the blue primitive is overridden to purple. Any semantic
      token that maps to blue100 is now purple.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

A frozen Alert would still show the original blue, because its tokens were derived from frozen primitives that are bundled inside the snapshot.

### 6. Combining all override layers

Primitives, semantics, and component overrides can be used together. They are applied in order: primitives first, then semantics, then component-level overrides. On a frozen component, only the component-level overrides take effect:

```js
---
type: example
---
<InstUISettingsProvider theme={canvas}>
  <InstUISettingsProvider
    themeOverride={{
      primitives: {
        color: {
          blue: {
            blue100: 'teal'
          }
        }
      },
      semantics: {
        color: {
          stroke: {
            success: 'darkgreen'
          },
          background: {
            success: 'darkgreen'
          }
        }
      },
      components: {
        Alert: {
          warningBorderColor: 'darkorange',
          warningIconBackground: 'darkorange'
        }
      }
    }}
  >
    <Alert variant="info" margin="small">
      Info uses teal (primitive override) — frozen Alert would ignore this.
    </Alert>
    <Alert variant="success" margin="small">
      Success uses dark green (semantic override) — frozen Alert would ignore this.
    </Alert>
    <Alert variant="warning" margin="small">
      Warning uses dark orange (component override) — frozen Alert WOULD apply this.
    </Alert>
  </InstUISettingsProvider>
</InstUISettingsProvider>
```

## Code: Alert v2 (Frozen) vs Alert v3 (Live)

The source code difference between a frozen and live component is minimal — just an import and an extra argument to `@withStyle`.

### Alert v2 — frozen to v11_7

```ts
---
type: code
---
// packages/ui-alerts/src/Alert/v2/index.tsx

import { withStyle } from '@instructure/emotion'
import generateStyle from './styles'
import frozenThemes from '@instructure/ui-themes/v11_7'

@withStyle(generateStyle, null, frozenThemes)
class Alert extends Component<AlertProps, AlertState> {
  static readonly componentId = 'Alert'
  // ...
}
```

This version will **always** use the v11_7 snapshot of Alert tokens, regardless of what the live theme defines. Even if the live theme renames `infoBorderColor` to something else, or changes which primitive it maps to, this component is unaffected.

### Alert v3 — uses live theme

```ts
---
type: code
---
// packages/ui-alerts/src/Alert/v3/index.tsx

import { withStyle } from '@instructure/emotion'
import generateStyle from './styles'

@withStyle(generateStyle)
class Alert extends Component<AlertProps, AlertState> {
  static readonly componentId = 'Alert'
  // ...
}
```

This version reads directly from the live theme context. It always gets the latest token values and benefits from any design system updates.

### What happens at runtime

When a consumer's app has both versions in play (e.g. a library uses Alert v2, but the app itself uses Alert v3), each resolves its tokens independently:

```
┌─────────────────────────────────────────────┐
│         InstUISettingsProvider               │
│         theme={light}                        │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │ Alert v2 (frozen)                     │   │
│  │  → looks up "light" in frozenThemes   │   │
│  │  → uses v11_7 snapshot of light       │   │
│  │  → tokens are fixed                   │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌───────────────────────────────────────┐   │
│  │ Alert v3 (live)                       │   │
│  │  → reads "light" from context         │   │
│  │  → uses current live theme            │   │
│  │  → tokens evolve with the system      │   │
│  └───────────────────────────────────────┘   │
│                                              │
└─────────────────────────────────────────────┘
```

## Override behavior summary

| Override layer                   | Affects live components                               | Affects frozen components                         |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------- |
| `themeOverride.primitives`       | Yes — cascades through semantics and component tokens | **No** — frozen components use bundled primitives |
| `themeOverride.semantics`        | Yes — cascades through component tokens               | **No** — frozen components use bundled semantics  |
| `themeOverride.sharedTokens`     | Yes — affects shared behaviors (shadows, focus rings) | Yes — shared tokens are merged at render time     |
| `themeOverride.components.Alert` | Yes — direct component token override                 | **Yes** — applied on top of frozen tokens         |
| `<Alert themeOverride={...}>`    | Yes — highest priority                                | **Yes** — highest priority                        |

## Unsupported theme error

If a new theme is added to InstUI after a component version was frozen, and that theme key does not exist in the frozen snapshot, the component logs an error:

```
The version of Alert you are using does not support the currently applied "newThemeName" theme.
Please upgrade to the latest version of Alert.
```

This guides consumers to upgrade the component to a version that supports the new theme.

## Creating a Frozen Theme

When you freeze a component version (as part of the [multi-version workflow](multi-version-system)), you need to ensure the frozen theme snapshot includes that component's tokens. Here is what to do:

### 1. Check if the frozen theme version already exists

Look under `packages/ui-themes/src/themes/frozenThemes/` for the version directory (e.g. `v11_7/`). If it already exists and contains other components, you are adding to it. If not, you are creating it from scratch.

### 2. Add the component type

Create or update the component type file in `componentTypes/`:

```ts
---
type: code
---
// frozenThemes/v11_7/componentTypes/alert.ts
export type Alert = {
  background: string
  borderRadius: string
  // ... all tokens the component's generateStyle function uses
}
```

Add it to `componentTypes/index.ts`:

```ts
---
type: code
---
import type Alert from "./alert"

type ComponentTypes = {
  Alert: (semantics: any) => Alert
  // ... other frozen components
}

export type { ComponentTypes }
```

### 3. Add the component theme for each variant

For each theme variant (`light/`, `dark/`, `legacyCanvas/`, `legacyCanvasHighContrast/`), create a component file that maps semantic tokens to component tokens:

```ts
---
type: code
---
// frozenThemes/v11_7/light/components/alert.ts
import type { Alert } from "../../componentTypes/alert"
import type { Semantics } from "../semantics"

const alert = (semantics: Semantics): Alert => ({
  background: semantics.color.background.elevatedSurface.base,
  borderRadius: semantics.borderRadius.lg,
  infoBorderColor: semantics.color.stroke.info,
  infoIconBackground: semantics.color.background.info,
  // ... all tokens
})
export default alert
```

Then register it in the variant's `index.ts`:

```ts
---
type: code
---
// frozenThemes/v11_7/light/index.ts
import primitives from "./primitives"
import semantics from "./semantics"
import sharedTokens from "./sharedTokens"
import alert from "./components/alert"

const theme = {
  primitives,
  semantics,
  sharedTokens,
  components: {
    Alert: alert
    // ... other frozen components
  },
}
export default theme
```

### 4. Export the frozen theme from `package.json`

If the version is new, add the export path to `packages/ui-themes/package.json`:

```json
---
type: code
---
{
  "exports": {
    "./v11_7": {
      "src": "./src/themes/frozenThemes/v11_7/index.ts",
      "types": "./types/themes/frozenThemes/v11_7/index.d.ts",
      "import": "./es/themes/frozenThemes/v11_7/index.js",
      "require": "./lib/themes/frozenThemes/v11_7/index.js",
      "default": "./es/themes/frozenThemes/v11_7/index.js"
    }
  }
}
```

### 5. Import the frozen theme in the component

In the frozen component version, import the snapshot and pass it to `@withStyle`:

```ts
---
type: code
---
import frozenThemes from '@instructure/ui-themes/v11_7'

@withStyle(generateStyle, null, frozenThemes)
class Alert extends Component { ... }
```

## Key Points

- Frozen themes are **complete snapshots** — they include primitives, semantics, shared tokens, and component tokens so they are fully self-contained.
- Only **frozen component versions** use frozen themes. The latest version always uses the live theme.
- Theme **overrides still work** on frozen components — `themeOverride` at both the provider and component level is applied on top of the frozen tokens.
- If a frozen theme does not support the currently active theme key, the component **logs an error** and the consumer should upgrade.
- Frozen themes are **never updated** once created. If a bug is found in a frozen token value, the fix goes into a new component version, not the frozen snapshot.
