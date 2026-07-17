// @ts-nocheck
// Dotted component key in InstUISettingsProvider `componentOverrides`:
// the key `'Modal.Footer'` is dot-stripped to `ModalFooter`, its token
// `background` -> `backgroundColor` is renamed, and it relocates to
// `themeOverride.components`.
import { Modal } from '@instructure/ui-modal/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const test = () => (
  <InstUISettingsProvider
    themeOverride={{
      components: { ModalFooter: { backgroundColor: 'cyan' } }
    }}
  >
    <Modal.Footer>x</Modal.Footer>
  </InstUISettingsProvider>
)
