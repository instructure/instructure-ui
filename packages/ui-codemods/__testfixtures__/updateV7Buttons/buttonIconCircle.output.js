/* eslint-disable */
import { Button, IconButton } from '@instructure/ui-buttons'

let a = (
  <p>
    <IconButton withBackground={false} withBorder={false} />
    <IconButton
      color="primary-inverse"
      withBackground={false}
      withBorder={false}
    />
    <IconButton
      color="circle-default"
      withBackground={false}
      withBorder={false}
    />
    <Button variant="icon">some text</Button>
    <Button variant="icon-inverse">
      <p>text</p>
    </Button>
    <IconButton
      color="primary-inverse"
      withBorder={false}
      withBackground={false}
    >
      <ScreenReaderContent>Close something</ScreenReaderContent>
    </IconButton>
  </p>
)
