// @ts-nocheck
// No token changes (Badge `size` is unmapped), but the InstUISettingsProvider
// `theme.componentOverrides` is still relocated to `themeOverride.components` -
// v2 components only read overrides from the new location.
import { Badge } from '@instructure/ui-badge/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = (
  <InstUISettingsProvider
    themeOverride={{
      components: { Badge: { size: '1.5rem' } }
    }}
  >
    <Badge count={1}>x</Badge>
  </InstUISettingsProvider>
)
