// @ts-nocheck
// InstUISettingsProvider already has a `themeOverride` prop: the relocated Spinner
// override (`xSmallBorderWidth` -> `strokeWidthXs`) is merged into its existing
// `components` object (next to the existing Metric override).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      themeOverride={{
        components: {
          Metric: { valueColor: 'red' },
          Spinner: { strokeWidthXs: '2rem' }
        }
      }}
    >
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
