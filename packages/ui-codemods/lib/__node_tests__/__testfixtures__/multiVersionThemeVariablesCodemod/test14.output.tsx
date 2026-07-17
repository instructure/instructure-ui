// @ts-nocheck
// InstUISettingsProvider `theme` with a spread alongside `componentOverrides`,
// Metric `padding` removed (warns), `valueColor` kept; the override is
// relocated to `themeOverride.components` while `theme` keeps the `...canvas`
// spread. Warns about the removed token, the opaque spread, and the v11.6 channel.
import { Metric } from '@instructure/ui-metric/v11_7'
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner renderTitle="anchor" themeOverride={{ strokeWidthXs: '2rem' }} />
    <InstUISettingsProvider
      theme={{
        ...canvas
      }}
      themeOverride={{
        components: {
          Metric: {
            valueColor: 'keep'
          }
        }
      }}
    >
      <Metric renderLabel="x" renderValue="y" />
    </InstUISettingsProvider>
  </div>
)
