/* eslint-disable */
import { Button, IconButton } from '@instructure/ui-buttons'

let a = (
  <p>
    <Button variant="icon" />
    <Button variant="icon-inverse" />
    <Button variant="circle-default" />
    <Button variant="icon">some text</Button>
    <Button variant="icon-inverse">
      <p>text</p>
    </Button>
    <Button variant="icon-inverse">
      <ScreenReaderContent>Close something</ScreenReaderContent>
    </Button>
  </p>
)
