// @ts-nocheck
// Multiple variant-dependent tokens with a dynamic `variant` (`checkedBackground`,
// `labelLineHeight`, `labelColor`): a single consolidated warning lists them all,
// not one warning per token.
import { Checkbox } from '@instructure/ui-checkbox/v11_7'

const test = (v) => (
  <Checkbox
    label="x"
    variant={v}
    themeOverride={{
      checkedBackground: 'green',
      labelLineHeight: 1.5,
      labelColor: 'blue'
    }}
  />
)
