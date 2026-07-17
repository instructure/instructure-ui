// @ts-nocheck
// InstUISettingsProvider `theme` set to a function returning `componentOverrides`:
// can't be inspected statically, one warning, left untouched. Sibling Spinner
// anchor `xSmallBorderWidth` -> `strokeWidthXs` (control).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <InstUISettingsProvider
      theme={(t) => ({
        componentOverrides: { Spinner: { xSmallBorderWidth: '1px' } }
      })}
    >
      <Spinner renderTitle="function" />
    </InstUISettingsProvider>
  </div>
)
