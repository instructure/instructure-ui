/* eslint-disable */
import { Tabs } from '@instructure/ui-tabs'

const aVar = () => 'hello'
const a = (
  <p>
    <Tabs size="small" maxWidth={34} />
    <Tabs size={435} maxWidth={34} />
    <Tabs size="small" />
    // triggers manual upgrade warning
    <Tabs size={aVar()} />
    // triggers manual upgrade warning
    <Tabs selectedIndex={23} />
  </p>
)
