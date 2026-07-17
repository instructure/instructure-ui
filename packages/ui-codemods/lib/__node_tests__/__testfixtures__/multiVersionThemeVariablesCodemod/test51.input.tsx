// @ts-nocheck
// Dotted child-component keys on InstUISettingsProvider are dot-stripped to the v2
// componentId ('List.Item' -> `ListItem`, 'Table.RowHeader' -> `TableRowHeader`)
// and relocated to `themeOverride.components`. Tokens (`color`, `background`) are
// unmapped (unchanged).
import { List } from '@instructure/ui-list/v11_7'
import { Table } from '@instructure/ui-table/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          'List.Item': { color: 'blue' },
          'Table.RowHeader': { background: 'cyan' }
        }
      }}
    >
      <List>
        <List.Item>x</List.Item>
      </List>
    </InstUISettingsProvider>
  )
}
