// @ts-nocheck
// InstUISettingsProvider overrides ALWAYS migrate - even for a v1 (bare-import)
// Spinner: `xSmallBorderWidth` -> `strokeWidthXs` (rename) + relocated to
// `themeOverride.components`. Because the file may target v11.6-or-earlier
// components, the codemod warns they no longer read `theme.componentOverrides`.
import { Spinner } from '@instructure/ui-spinner'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = (
  <InstUISettingsProvider
    themeOverride={{
      components: { Spinner: { strokeWidthXs: '1rem' } }
    }}
  >
    <Spinner renderTitle="x" />
  </InstUISettingsProvider>
)
