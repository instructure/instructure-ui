/* eslint-disable */
import { List } from '@instructure/ui-list'

import { InlineList } from '@instructure/ui'

const aVar = {}
const a = (
  <p>
    <List></List>
    <List isUnstyled></List>
    <InlineList delimiter="dashed">
      <InlineList.Item>test</InlineList.Item>
      {...aVar}
    </InlineList>
    // delimiter prop should trigger a warning
    <List delimiter="|">
      <List.Item delimiter="," />
    </List>
  </p>
)
