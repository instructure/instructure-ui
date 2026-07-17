// @ts-nocheck
// Computed component key ([List.Item.componentId]) on InstUISettingsProvider is a
// runtime value: it is relocated as-is but can't be dot-stripped, so it would be
// dead in v2 -> warns.
import { List } from '@instructure/ui-list/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      themeOverride={{
        components: { [List.Item.componentId]: { color: 'red' } }
      }}
    >
      <List>
        <List.Item>x</List.Item>
      </List>
    </InstUISettingsProvider>
  )
}
