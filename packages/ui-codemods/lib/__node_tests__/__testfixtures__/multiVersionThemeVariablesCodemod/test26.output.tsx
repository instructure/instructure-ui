// @ts-nocheck
// `themeOverride` on a dotted sub-component `<Modal.Header>`: `background` ->
// `backgroundColor` and `inverseBackground` -> `inverseBackgroundColor` are renamed
// even though the element is a member expression, not a plain identifier.
import { Modal } from '@instructure/ui-modal/v11_7'

const test = () => (
  <Modal.Header
    themeOverride={{ backgroundColor: 'pink', inverseBackgroundColor: 'navy' }}
  >
    x
  </Modal.Header>
)
