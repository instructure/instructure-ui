/* eslint-disable */
import { Tabs } from '@instructure/ui-tabs'
import { Button } from '@instructure/ui'
import { Avatar } from '@instructure/ui'

const aVar = () => 'hello'
const a = (
  <p>
    <Tabs theme={aVar()} />
    <Button theme={aVar} />
    <Avatar theme={{ aaa: 3, bbb: 'asdf' }} />
  </p>
)
