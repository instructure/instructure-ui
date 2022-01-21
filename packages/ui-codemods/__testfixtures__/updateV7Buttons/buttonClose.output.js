/* eslint-disable */
import { CloseButton } from '@instructure/ui-buttons'

const fun = () => 'asdf'
let a = (
  <p>
    <CloseButton elementRef={(_e) => 3} />
    <CloseButton />
    <CloseButton color="primary-inverse" />
    <CloseButton screenReaderLabel="simple text message" />
    <CloseButton screenReaderLabel={fun()} />
    <CloseButton>This cannot be updated {fun()}</CloseButton>
  </p>
)
