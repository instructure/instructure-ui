/* eslint-disable */
import { Button, IconButton } from '@instructure/ui-buttons'

const fun = () => 'test'
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
    />
    <IconButton
      screenReaderLabel={fun()}
      withBackground={false}
      withBorder={false}
    />
    <IconButton
      screenReaderLabel={fun.t('Remove %{filename}', { filename: file.name })}
      withBackground={false}
      withBorder={false}
    />
  </p>
)
