import React from 'react'
import { Button, SearchInstUIIcon, PlusInstUIIcon, Text } from '@instructure/ui'

function MyComponent() {
  return (
    <div>
      <Button renderIcon={<SearchInstUIIcon />}>Click me</Button>
      <PlusInstUIIcon />
      <Text>Hello</Text>
    </div>
  )
}

export default MyComponent
