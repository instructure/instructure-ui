/* eslint-disable */
import { CloseButton } from '@instructure/ui-buttons'

let a = (
  <p>
    <CloseButton buttonRef={(_e) => 3} />
    <CloseButton variant="icon" />
    <CloseButton variant="icon-inverse" />
    <CloseButton>this should trigger a warning</CloseButton>
  </p>
)
