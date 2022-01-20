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
    <IconButton color="secondary" shape="circle" />
    <IconButton color="primary" shape="circle" />
    <IconButton color="danger" shape="circle" />
    <Button variant="icon">some text</Button>
    <Button variant="icon-inverse">
      <p>text</p>
    </Button>
    <IconButton
      color="primary-inverse"
      withBackground={false}
      withBorder={false}
      screenReaderLabel="abc"
    ></IconButton>
    <IconButton
      screenReaderLabel="hello"
      withBackground={false}
      withBorder={false}
    ></IconButton>
  </p>
)
