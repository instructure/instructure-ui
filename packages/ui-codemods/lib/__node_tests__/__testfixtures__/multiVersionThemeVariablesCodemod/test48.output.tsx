// @ts-nocheck
// First InstUISettingsProvider `theme={canvas}` (a theme switch, no
// `componentOverrides`) is left untouched. The second relocates Spinner
// `xSmallBorderWidth` -> `strokeWidthXs` to `themeOverride.components` (that change
// is what makes this a comparable fixture; a pure no-op can't be).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <div>
      <InstUISettingsProvider theme={canvas}>
        <Spinner renderTitle="untouched" />
      </InstUISettingsProvider>
      <InstUISettingsProvider
        themeOverride={{
          components: { Spinner: { strokeWidthXs: '2rem' } }
        }}
      >
        <Spinner renderTitle="relocated" />
      </InstUISettingsProvider>
    </div>
  )
}
