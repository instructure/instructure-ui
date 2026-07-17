// @ts-nocheck
// Spread + all-removed componentOverrides: Metric's only override token (`padding`)
// is removed in v2, so `componentOverrides` empties out. The `theme` prop keeps its
// remaining `...canvas` spread (so the InstUISettingsProvider is NOT unwrapped) and
// no `themeOverride` is added (nothing left to relocate). Warns about the removed
// token and the opaque spread.
import { Metric } from '@instructure/ui-metric/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = (
  <InstUISettingsProvider
    theme={{
      ...canvas
    }}
  >
    <Metric renderLabel="x" renderValue="y" />
  </InstUISettingsProvider>
)
