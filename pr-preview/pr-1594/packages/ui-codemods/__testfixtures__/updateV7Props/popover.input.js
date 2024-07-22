/* eslint-disable */
import { Popover } from '@instructure/ui-popover'

const aVar = () => 'hello'
const a = (
  <p>
    // trigger
    <Popover>
      <Popover.Trigger>abc</Popover.Trigger>
    </Popover>
    <Popover><Popover.Trigger><a/></Popover.Trigger></Popover>
    <Popover>
      <Popover.Trigger>
        {aVar()}
      </Popover.Trigger>
    </Popover>
    // content
    <Popover><Popover.Content>abc</Popover.Content></Popover>
    <Popover><Popover.Content><a/></Popover.Content></Popover>
    <Popover><Popover.Content>{aVar()}</Popover.Content></Popover>
    <Popover><Popover.Content><a/><i/></Popover.Content></Popover>
    // this just triggers a warning
    <Popover onToggle={aVar}>ppp</Popover>
  </p>
)
