// @ts-nocheck
// Mixed on one InstUISettingsProvider: the top-level `componentOverrides` (Spinner
// `xSmallBorderWidth` -> `strokeWidthXs`) is relocated to `themeOverride.components`,
// while the theme-specific `themeOverrides.canvas` block is left untouched (no v2
// equivalent) and warned.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      theme={{
        componentOverrides: { Spinner: { xSmallBorderWidth: '2rem' } },
        themeOverrides: {
          canvas: {
            componentOverrides: { Spinner: { largeBorderWidth: '3rem' } }
          }
        }
      }}
    >
      <Spinner renderTitle="x" />
    </InstUISettingsProvider>
  )
}
