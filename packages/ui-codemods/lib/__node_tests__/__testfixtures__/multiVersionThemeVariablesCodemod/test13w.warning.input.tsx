// @ts-nocheck
// InstUISettingsProvider `theme.componentOverrides`: Spinner
// `xSmallBorderWidth` -> `strokeWidthXs` (rename, `valueColor` kept) relocated to
// `themeOverride.components`. A second InstUISettingsProvider whose only token
// (Billboard `iconColor`, a silent removal) empties out is unwrapped.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { Billboard } from '@instructure/ui-billboard/v11_7'
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
          Spinner: { xSmallBorderWidth: '2rem', valueColor: 'keep' }
        }
      }}
    >
      <Spinner renderTitle="renamed" />
    </InstUISettingsProvider>
    <InstUISettingsProvider
      theme={{ componentOverrides: { Billboard: { iconColor: 'red' } } }}
    >
      <Billboard heading="unwrapped" />
    </InstUISettingsProvider>
  </div>
)
