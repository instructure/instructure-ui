import React from 'react'
import {
  Button,
  SearchInstUIIcon,
  PlusInstUIIcon,
  InfoInstUIIcon,
  Text
} from '@instructure/ui'

function MyComponent() {
  return (
    <div>
      <Button renderIcon={<SearchInstUIIcon />}>Click me</Button>
      <Button renderIcon={InfoInstUIIcon}>Info</Button>
      <PlusInstUIIcon />
      <Text>Hello</Text>
    </div>
  )
}

export default MyComponent
