// @ts-nocheck
// Modal `themeOverride`: `boxShadow` is kept but warned (its value is now an object,
// not a CSS string); the `background` -> `backgroundColor` rename still applies in
// the same override.
import { Modal } from '@instructure/ui-modal/v11_7'

const test = () => (
  <Modal
    themeOverride={{
      boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.25)',
      backgroundColor: 'pink'
    }}
  >
    x
  </Modal>
)
