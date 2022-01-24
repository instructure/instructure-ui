/* eslint-disable */
import { List, InlineList } from '@instructure/ui-lists'

const aVar = {}
const a = (
  <p>
    <List></List>
    <List isUnstyled></List>
    <InlineList>
      <InlineList.Item>test</InlineList.Item>
      {...aVar}
    </InlineList>
  </p>
)
