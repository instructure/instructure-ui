/* eslint-disable */
import { List, InlineList } from '@instructure/ui-lists'

const aVar = {}
const a = (
  <p>
    <List></List>
    <List isUnstyled></List>
    <InlineList delimiter=",">
      <InlineList.Item>test</InlineList.Item>
      {...aVar}
    </InlineList>
    // delimiter prop should trigger a warning
    <List delimiter="|">
      <List.Item delimiter="," />
    </List>
  </p>
)
