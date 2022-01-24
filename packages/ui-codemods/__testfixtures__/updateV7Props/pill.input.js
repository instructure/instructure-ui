/* eslint-disable */
import { Pill } from '@instructure/ui-pill'

const aVar = () => 'hello'
const a = (
  <p>
    <Pill text="abc" />
    <Pill text={aVar()} />
    <Pill text="bcd">aaa</Pill>
  </p>
)
