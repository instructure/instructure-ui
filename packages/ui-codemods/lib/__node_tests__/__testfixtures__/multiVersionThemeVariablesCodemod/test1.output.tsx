// @ts-nocheck
// InstUISettingsProvider `theme.componentOverrides`:
// Spinner `xSmallBorderWidth` -> `strokeWidthXs` (rename) and `smallSize` removed
// (warns), Alert override (unmapped, unchanged); the whole block is relocated to
// `themeOverride.components`. The sibling per-instance Spinner `themeOverride` is
// renamed the same way.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Alert } from '@instructure/ui-alerts/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <div>
      <InstUISettingsProvider
        themeOverride={{
          components: {
            Spinner: {
              strokeWidthXs: '2rem'
            },
            Alert: {
              background: 'pink'
            }
          }
        }}
      >
        <Spinner renderTitle="Loading" />
      </InstUISettingsProvider>
      <Spinner
        renderTitle="Loading"
        themeOverride={{
          strokeWidthXs: '2rem'
        }}
      />
    </div>
  )
}
