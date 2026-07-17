// @ts-nocheck
// Dotted child key: the InstUISettingsProvider override `'List.Item'` is
// dot-stripped to the v2 componentId `ListItem` and relocated to
// `themeOverride.components`. Token `spacing` is unmapped (unchanged).
import { List } from '@instructure/ui-list/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = (
  <InstUISettingsProvider
    themeOverride={{
      components: { ListItem: { spacing: 'small' } }
    }}
  >
    <List>
      <List.Item>x</List.Item>
    </List>
  </InstUISettingsProvider>
)
