// @ts-nocheck
// InstUISettingsProvider `theme` is a spread + brand var with NO
// `componentOverrides`: nothing relocates, but the opaque `...canvas` spread is
// warned (it may hide changed tokens). Sibling Spinner anchor `xSmallBorderWidth`
// -> `strokeWidthXs` (control).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <InstUISettingsProvider
      theme={{ ...canvas, 'ic-brand-button--primary-bgd': 'magenta' }}
    >
      <Spinner renderTitle="spread + brand" />
    </InstUISettingsProvider>
  </div>
)
