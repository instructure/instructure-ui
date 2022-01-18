/* eslint-disable */
import { CloseButton } from '@instructure/ui-buttons'

let a = (
  <p>
    <CloseButton elementRef={(_e) => 3} />
    <CloseButton />
    <CloseButton color="primary-inverse" />
    <CloseButton>this should trigger a warning</CloseButton>
  </p>
)
