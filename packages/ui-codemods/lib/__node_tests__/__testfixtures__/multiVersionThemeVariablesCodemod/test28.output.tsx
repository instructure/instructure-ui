// @ts-nocheck
// Aliased parent import (`Modal as M`): the dotted child `<M.Body>` is still
// resolved and its token `inverseBackground` -> `inverseBackgroundColor` is renamed.
import { Modal as M } from '@instructure/ui-modal/v11_7'

const test = () => (
  <M.Body themeOverride={{ inverseBackgroundColor: 'navy' }}>x</M.Body>
)
