// @ts-nocheck
// Checkbox with a dynamic `variant`: the codemod can't tell checkbox vs toggle, so
// the variant-dependent token (`checkedBackground`) is left unchanged and warned.
import { Checkbox } from '@instructure/ui-checkbox/v11_7'

const test = (v) => (
  <Checkbox
    label="x"
    variant={v}
    themeOverride={{ checkedBackground: 'green' }}
  />
)
