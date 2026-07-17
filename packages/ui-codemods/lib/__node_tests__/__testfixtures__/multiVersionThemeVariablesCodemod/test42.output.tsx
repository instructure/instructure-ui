// @ts-nocheck
// Checkbox with a spread ({...props}) that could carry `variant`: the variant can't
// be resolved statically, so the divergent token (`checkedBackground`) is left
// unchanged + warned, while the non-divergent `background` -> `backgroundColor`
// still renames.
import { Checkbox } from '@instructure/ui-checkbox/v11_7'

const test = (props) => (
  <Checkbox
    {...props}
    themeOverride={{ backgroundColor: 'pink', checkedBackground: 'green' }}
  />
)
