## ThemeProvider

`<instui-theme-provider>` is a Lit Web Component that exposes InstUI design
tokens as global CSS custom properties, with automatic system-preference
switching for dark and high-contrast modes.

The tokens come from `@instructure/ui-themes` (the modern
`primitives` / `semantics` / `sharedTokens` / `components` shape). Token paths
are flattened into CSS variables — for example,
`semantics.semantic.color.background.base` becomes
`var(--semantics-semantic-color-background-base)`.

### Themes

Mounted name → InstUI source theme:

| Mounted name    | Source                                            |
| --------------- | ------------------------------------------------- |
| `defaultTheme`  | `legacyCanvas` (the standard InstUI Canvas theme) |
| `contrastTheme` | `legacyCanvasHighContrast`                        |
| `darkTheme`     | `dark`                                            |
| `lightTheme`    | `light`                                           |

### Notable attributes

- `default-theme-name` — Fallback theme when no system preference applies and
  no `user-theme` cookie is set. Defaults to `'defaultTheme'`.
- `user-theme` — Per-user override (typically read from a cookie on SSR).
- `custom-default-theme` / `custom-contrast-theme` / `custom-dark-theme` /
  `custom-light-theme` — JSON attribute values deep-merged onto the base theme.
  May include an `isEnabled` boolean to gate the automatic system-preference
  switcher (e.g. set `customDarkTheme.isEnabled = true` to opt into dark-mode
  switching).

### System preferences and SSR

On every theme application the provider writes two cookies, mirroring the
tastysoft pattern so SSR coordination stays stack-portable:

- `sec-ch-prefers-color-scheme` — `light` or `dark`
- `sec-ch-prefers-contrast` — `normal` or `more`

### Examples

Plain HTML:

```html
<instui-theme-provider
  default-theme-name="defaultTheme"
  custom-dark-theme='{"isEnabled": true}'
>
  <!-- app content; tokens are now globally available as CSS vars -->
</instui-theme-provider>
```

React (via `@lit/react` wrappers, landing in a follow-up):

```tsx
import { ThemeProvider } from '@instructure/ui-web-core/react'

;<ThemeProvider
  defaultThemeName="defaultTheme"
  customDarkTheme={{ isEnabled: true }}
>
  <App />
</ThemeProvider>
```

Angular:

```html
<instui-theme-provider
  default-theme-name="lightTheme"
  [attr.custom-contrast-theme]="customContrastTheme | json"
  [attr.custom-dark-theme]="customDarkTheme | json"
>
  <router-outlet></router-outlet>
</instui-theme-provider>
```
