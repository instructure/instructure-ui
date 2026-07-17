// @ts-nocheck
// Empty `componentOverrides` on InstUISettingsProvider: nothing to relocate, so the
// now-empty `theme` prop is dropped entirely.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider theme={{ componentOverrides: {} }}>
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
