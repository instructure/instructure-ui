// @ts-nocheck
// Tokens inside the theme-specific `theme.themeOverrides.canvas` block are NOT
// renamed (left untouched). The sibling per-instance Spinner `themeOverride`
// `xSmallBorderWidth` -> `strokeWidthXs` IS (control).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <InstUISettingsProvider
    theme={{
      themeOverrides: {
        canvas: {
          componentOverrides: { Spinner: { xSmallBorderWidth: '2rem' } }
        }
      }
    }}
  >
    <Spinner renderTitle="x" themeOverride={{ xSmallBorderWidth: '1rem' }} />
  </InstUISettingsProvider>
)
