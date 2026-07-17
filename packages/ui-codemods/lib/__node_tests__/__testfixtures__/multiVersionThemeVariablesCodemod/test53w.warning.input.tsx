// @ts-nocheck
// Non-static `componentOverrides` value (a variable/expression) on
// InstUISettingsProvider: still relocated to `themeOverride.components`, but its
// contents can't be processed -> warns.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider theme={{ componentOverrides: myOverrides }}>
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
