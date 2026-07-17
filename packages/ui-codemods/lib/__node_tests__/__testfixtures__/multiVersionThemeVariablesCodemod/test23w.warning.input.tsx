// @ts-nocheck
// InstUISettingsProvider `componentOverrides` with spreads nested inside (token
// level and componentOverrides level): Spinner `xSmallBorderWidth` ->
// `strokeWidthXs`, Metric `padding` removed (warns) / `valueColor` kept; both
// overrides relocate to `themeOverride.components` with spreads preserved. Each
// InstUISettingsProvider warns about its opaque spread and the v11.6 channel.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Metric } from '@instructure/ui-metric/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          Spinner: { ...spinnerOverrides, xSmallBorderWidth: '2rem' }
        }
      }}
    >
      <Spinner renderTitle="spread in component" />
    </InstUISettingsProvider>
    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          ...extraOverrides,
          Metric: { padding: '10px', valueColor: 'keep' }
        }
      }}
    >
      <Metric renderLabel="x" renderValue="y" />
    </InstUISettingsProvider>
  </div>
)
