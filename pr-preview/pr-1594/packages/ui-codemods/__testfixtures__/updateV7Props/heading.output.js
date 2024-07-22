/* eslint-disable */
import { Heading, TruncateText } from '@instructure/ui'

const aVar = false
const a = (
  <p>
    <Heading>abc</Heading>
    <Heading>
      <TruncateText>abc</TruncateText>
    </Heading>
    <Heading>
      <TruncateText>abc</TruncateText>
    </Heading>
    <Heading>abc</Heading>
    <Heading ellipsis={aVar}>abc</Heading>
  </p>
)

