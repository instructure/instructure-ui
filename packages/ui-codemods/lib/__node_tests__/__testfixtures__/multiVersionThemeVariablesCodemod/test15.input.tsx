// @ts-nocheck
// InstUISettingsProvider `theme` set to a bare identifier (theme switch): nothing
// to migrate, no warning. Sibling Spinner anchor `xSmallBorderWidth` ->
// `strokeWidthXs` (control).
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <InstUISettingsProvider theme={canvas}>
      <Spinner renderTitle="theme switch" />
    </InstUISettingsProvider>
  </div>
)
