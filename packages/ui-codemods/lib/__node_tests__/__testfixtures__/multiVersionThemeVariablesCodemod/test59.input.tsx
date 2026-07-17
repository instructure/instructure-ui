// @ts-nocheck
// Relocated override collides with an existing `themeOverride`: the v1
// `Spinner.xSmallBorderWidth` renames to `strokeWidthXs` and merges into the
// InstUISettingsProvider's existing `themeOverride.components.Spinner`, which
// already sets `strokeWidthXs`. Two values can't share one token key, so the
// existing value is kept, the relocated one is dropped, and a conflict is warned.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = (
  <InstUISettingsProvider
    theme={{ componentOverrides: { Spinner: { xSmallBorderWidth: '1rem' } } }}
    themeOverride={{ components: { Spinner: { strokeWidthXs: '2rem' } } }}
  >
    <Spinner renderTitle="x" />
  </InstUISettingsProvider>
)
