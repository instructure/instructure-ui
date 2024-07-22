/* eslint-disable */
import { ApplyTheme } from '@instructure/ui-themeable'
import { Button } from '@instructure/ui'
import { Avatar as AAA } from '@instructure/ui-avatar'
import { Link } from '@instructure/ui-link'
import { List } from '@instructure/ui-list'

const fun = () => 3
const a = (
  <p>
    <ApplyTheme theme={{
        [Link.theme]: { color: 'red' },
        [AAA.theme]: { color: 'red' },
        [List.Item.theme]: {} // it cannot handle this case
      }}
    >
      <Link href="#">I should be Red</Link>
    </ApplyTheme>
  </p>
)
const b = Button.theme
