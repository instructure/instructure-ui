// @ts-nocheck
// The theme-specific `theme.themeOverrides.canvas` block has no v2 equivalent, so
// it is left untouched (NOT relocated or renamed) and warned. The sibling
// per-instance Spinner `themeOverride` `xSmallBorderWidth` -> `strokeWidthXs` IS
// migrated (control: proves the file changes).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <div>
      <InstUISettingsProvider
        theme={{
          themeOverrides: {
            canvas: {
              componentOverrides: { Spinner: { xSmallBorderWidth: '3rem' } }
            }
          }
        }}
      >
        <Spinner renderTitle="x" />
      </InstUISettingsProvider>
      <Spinner renderTitle="y" themeOverride={{ strokeWidthXs: '2rem' }} />
    </div>
  )
}
