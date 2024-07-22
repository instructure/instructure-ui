/* eslint-disable */
import { Heading } from '@instructure/ui'

const aVar = false
const a = (
  <p>
    <Heading>abc</Heading>
    <Heading ellipsis >abc</Heading>
    <Heading ellipsis={true}>abc</Heading>
    <Heading ellipsis={false}>abc</Heading>
    <Heading ellipsis={aVar}>abc</Heading>
  </p>
)
