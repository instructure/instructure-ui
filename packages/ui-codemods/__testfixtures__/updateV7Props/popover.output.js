/* eslint-disable */
import { Popover } from '@instructure/ui-popover'

const aVar = () => 'hello'
const a = (
  <p>
    // trigger
    <Popover renderTrigger="abc"></Popover>
    <Popover renderTrigger={<a />}></Popover>
    <Popover renderTrigger={aVar()}></Popover>
    // content
    <Popover>abc</Popover>
    <Popover>
      <a />
    </Popover>
    <Popover>{aVar()}</Popover>
    <Popover>
      <a />
      <i />
    </Popover>
    // this just triggers a warning
    <Popover onToggle={aVar}>ppp</Popover>
  </p>
)
