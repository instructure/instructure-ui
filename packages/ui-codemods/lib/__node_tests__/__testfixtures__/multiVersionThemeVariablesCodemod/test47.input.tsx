// @ts-nocheck
// Spread alongside `componentOverrides` on InstUISettingsProvider: Spinner
// `xSmallBorderWidth` -> `strokeWidthXs`; `theme` keeps the remaining `...canvas`
// spread and a separate `themeOverride` is added for the relocated override.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      theme={{
        ...canvas,
        componentOverrides: { Spinner: { xSmallBorderWidth: '2rem' } }
      }}
    >
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
