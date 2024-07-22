/* eslint-disable */
import { Pill } from '@instructure/ui-pill'

const aVar = () => 'hello'
const a = (
  <p>
    <Pill>abc</Pill>
    <Pill>{aVar()}</Pill>
    <Pill>aaabcd</Pill>
  </p>
)
