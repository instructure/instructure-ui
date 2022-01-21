/* eslint-disable */
import { CloseButton } from '@instructure/ui-buttons'

const fun = () => "asdf"
let a = (
  <p>
    <CloseButton buttonRef={(_e) => 3} />
    <CloseButton variant="icon" />
    <CloseButton variant="icon-inverse" />
    <CloseButton>simple text message</CloseButton>
    <CloseButton>
      {fun()}
    </CloseButton>
    <CloseButton>
       This cannot be updated {fun()}
    </CloseButton>
  </p>
)
