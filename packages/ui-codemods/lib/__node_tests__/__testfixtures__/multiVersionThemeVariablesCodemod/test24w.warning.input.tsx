// @ts-nocheck
// Quoted / string keys ('xSmallBorderWidth', 'Spinner') resolve like identifier
// keys: per-instance and InstUISettingsProvider `xSmallBorderWidth` ->
// `strokeWidthXs`, and the InstUISettingsProvider override relocates to `themeOverride.components`.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <div>
    <Spinner
      renderTitle="anchor"
      themeOverride={{ xSmallBorderWidth: '2rem' }}
    />
    <Spinner
      renderTitle="quoted token key"
      themeOverride={{ xSmallBorderWidth: '1rem' }}
    />
    <InstUISettingsProvider
      theme={{ componentOverrides: { Spinner: { xSmallBorderWidth: '3rem' } } }}
    >
      <Spinner renderTitle="quoted component key" />
    </InstUISettingsProvider>
  </div>
)
