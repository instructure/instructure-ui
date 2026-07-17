// @ts-nocheck
// InstUISettingsProvider `theme` set to a ternary: can't be inspected, one
// warning, no change. Sibling Spinner anchor `xSmallBorderWidth` -> `strokeWidthXs`
// (control).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <InstUISettingsProvider theme={isMobile ? darkTheme : lightTheme}>
      <Spinner renderTitle="ternary" />
    </InstUISettingsProvider>
  </div>
)
