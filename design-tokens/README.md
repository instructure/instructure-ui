# instructure-design-tokens

Token Studio JSON files for Instructure design tokens. This package is intended for Node.js environments — it uses Node-only APIs (`fs`, `path`) to load token files at runtime.

## Installation

Add the dependency to your `package.json`:

```json
"dependencies": {
  "@instructure/instructure-design-tokens": "github:instructure/instructure-design-tokens"
}
```

Then run:

```sh
npm install
```

To receive updates, re-run the same command.

## Usage

### Import all tokens

```js
import { themeTokens } from '@instructure/instructure-design-tokens'
```

`themeTokens` is a nested object that mirrors the `tokenStudio/` directory structure:

```
themeTokens
├── $metadata
├── $themes
├── primitives
│   └── default
├── canvas
│   ├── semantic
│   │   ├── color
│   │   │   ├── canvas
│   │   │   └── canvasHighContrast
│   │   └── layout
│   │       └── default
│   └── component
│       ├── Alert
│       ├── BaseButton
│       └── ...
└── rebrand
    ├── semantic
    │   ├── color
    │   │   ├── rebrandLight
    │   │   └── rebrandDark
    │   └── layout
    │       └── default
    └── component
        ├── Alert
        ├── BaseButton
        └── ...
```

### Access a specific token set

```js
import { themeTokens } from '@instructure/instructure-design-tokens'

const canvasColors = themeTokens.canvas.semantic.color.canvas
const rebrandLight = themeTokens.rebrand.semantic.color.rebrandLight
const buttonTokens = themeTokens.canvas.component.BaseButton
```

### Token value shape

Each token is an object with a `value` and a `type` field, following the [W3C Design Tokens specification](https://www.designtokens.org/tr/2025.10/). Values may reference other tokens using Token Studio's `{path.to.token}` syntax.

```js
canvasColors.color.background.base
// { value: '{color.white}', type: 'color' }

canvasColors.color.background.error
// { value: '{color.red.red100}', type: 'color' }
```

### Import a single JSON file directly

Individual token files are exposed via the `./tokens/*` export path. Node.js requires the `with { type: 'json' }` import attribute for JSON files.

```js
import canvasColors from '@instructure/instructure-design-tokens/tokens/canvas/semantic/color/canvas' with { type: 'json' }
import rebrandLight from '@instructure/instructure-design-tokens/tokens/rebrand/semantic/color/rebrandLight' with { type: 'json' }
import buttonTokens from '@instructure/instructure-design-tokens/tokens/canvas/component/BaseButton' with { type: 'json' }
```

## Token structure

```
tokenStudio/
├── $metadata.json
├── $themes.json
├── primitives/
│   └── default.json          # base color palette
├── canvas/
│   ├── semantic/
│   │   ├── color/
│   │   │   ├── canvas.json
│   │   │   └── canvasHighContrast.json
│   │   └── layout/
│   │       └── default.json
│   └── component/            # per-component tokens
│       ├── Alert.json
│       ├── BaseButton.json
│       └── ...
└── rebrand/
    ├── semantic/
    │   ├── color/
    │   │   ├── rebrandLight.json
    │   │   └── rebrandDark.json
    │   └── layout/
    │       └── default.json
    └── component/
        ├── Alert.json
        ├── BaseButton.json
        └── ...
```

## Release process

Releases are cut with the [Release workflow](.github/workflows/release.yml), which is triggered manually.

1. Go to the repository's **Actions** tab on GitHub.
2. Select the **Release** workflow.
3. Click **Run workflow** and choose the `main` branch.

The workflow then:

- Checks out the latest `main`.
- Reads the most recent version tag (e.g. `v1.2.0`) and computes the next **minor** version by bumping the minor number and resetting the patch to `0` (e.g. `v1.2.0` → `v1.3.0`).
- Creates that git tag and pushes it to the repository.

Consumers installing via `github:instructure/instructure-design-tokens` can pin to a specific release by referencing the tag:

```json
"dependencies": {
  "@instructure/instructure-design-tokens": "github:instructure/instructure-design-tokens#v1.3.0"
}
```

> **Note:** the workflow only bumps the minor version — it does not support patch or major releases, and it creates a git tag only (it does not publish to npm or create a GitHub Release). The first release requires at least one existing `vX.Y.Z` tag to bump from.
