/* eslint-disable */
import { Button } from '@instructure/ui-buttons'

const fun = () => 'test'
let a = (
  <p>
    <Button variant="icon" />
    <Button variant="icon-inverse" />
    <Button variant="circle-default" />
    <Button variant="circle-primary" />
    <Button variant="circle-danger" />
    <Button variant="icon">some text</Button>
    <Button variant="icon-inverse">
      <p>text</p>
    </Button>
    <Button variant="icon-inverse"><ScreenReaderContent>abc</ScreenReaderContent></Button>
    <Button variant="icon">
      <ScreenReaderContent>{fun()}</ScreenReaderContent>
    </Button>
  </p>
)
