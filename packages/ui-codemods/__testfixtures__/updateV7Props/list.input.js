/* eslint-disable */
import { List } from '@instructure/ui-lists'

const aVar = {}
const a = (
  <p>
    <List variant="default"></List>
    <List variant="unstyled"></List>
    <List variant="inline">
      <List.Item>test</List.Item>
      {...aVar}
    </List>
  </p>
)
