import React from 'react'
import { Button, IconSearchLine, IconAddLine, Text } from '@instructure/ui'

function MyComponent() {
  return (
    <div>
      <Button renderIcon={<IconSearchLine />}>Click me</Button>
      <IconAddLine />
      <Text>Hello</Text>
    </div>
  )
}

export default MyComponent
