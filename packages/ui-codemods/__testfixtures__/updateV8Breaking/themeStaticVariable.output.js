/* eslint-disable */
import { ApplyTheme } from '@instructure/ui-themeable'
import { Button } from '@instructure/ui'
import { Avatar as AAA } from '@instructure/ui-avatar'
import { Link } from '@instructure/ui-link'
import { List } from '@instructure/ui-list'

import { InstUISettingsProvider } from '@instructure/emotion'

const fun = () => 3
const a = (
  <p>
    <InstUISettingsProvider
      theme={{
        [Link.componentId]: { color: 'red' },
        [AAA.componentId]: { color: 'red' },
        [List.Item.theme]: {} // it cannot handle this case
      }}
    >
      <Link href="#">I should be Red</Link>
    </InstUISettingsProvider>
  </p>
)
const b = Button.componentId
