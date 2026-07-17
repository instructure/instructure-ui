// @ts-nocheck
// Only `componentOverrides` on InstUISettingsProvider: Spinner `xSmallBorderWidth`
// -> `strokeWidthXs` and the override relocates to `themeOverride.components`; the
// now-empty `theme` prop is dropped.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      theme={{ componentOverrides: { Spinner: { xSmallBorderWidth: '2rem' } } }}
    >
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
