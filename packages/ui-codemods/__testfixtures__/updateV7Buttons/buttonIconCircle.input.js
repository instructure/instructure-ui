/* eslint-disable */
import { Button } from '@instructure/ui-buttons'

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
  </p>
)
