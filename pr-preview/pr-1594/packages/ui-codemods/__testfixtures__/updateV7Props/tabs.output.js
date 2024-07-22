/* eslint-disable */
import { Tabs } from '@instructure/ui-tabs'

const aVar = () => 'hello'
const a = (
  <p>
    <Tabs maxWidth={34} />
    <Tabs maxWidth={34} />
    <Tabs maxWidth="30em" />
    // triggers manual upgrade warning
    <Tabs size={aVar()} />
    // triggers manual upgrade warning
    <Tabs selectedIndex={23} />
  </p>
)
