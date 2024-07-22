/* eslint-disable */
import { List } from '@instructure/ui-list'

const aVar = {}
const a = (
  <p>
    <List variant="default"></List>
    <List variant="unstyled"></List>
    <List variant="inline" delimiter="dashed" >
      <List.Item>test</List.Item>
      {...aVar}
    </List>
    // delimiter prop should trigger a warning
    <List delimiter="|">
      <List.Item delimiter="," />
    </List>
  </p>
)
