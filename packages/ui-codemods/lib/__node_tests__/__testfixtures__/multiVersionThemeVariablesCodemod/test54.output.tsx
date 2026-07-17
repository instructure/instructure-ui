// @ts-nocheck
// Spread inside `componentOverrides` on InstUISettingsProvider: Spinner
// `xSmallBorderWidth` -> `strokeWidthXs` and the override relocates (spread
// preserved), but the spread's contents can't be inspected -> warns.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      themeOverride={{
        components: {
          ...extraOverrides,
          Spinner: { strokeWidthXs: '2rem' }
        }
      }}
    >
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
