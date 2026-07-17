// @ts-nocheck
// Existing-key collision: `background` -> `backgroundColor`, but `backgroundColor`
// is already set here (and not itself renamed), so `background` is left unchanged
// and warned; the `inverseBackground` -> `inverseBackgroundColor` rename still
// applies.
import { Modal } from '@instructure/ui-modal/v11_7'

const test = () => (
  <Modal
    themeOverride={{
      background: 'x',
      backgroundColor: 'y',
      inverseBackgroundColor: 'z'
    }}
  >
    hi
  </Modal>
)
