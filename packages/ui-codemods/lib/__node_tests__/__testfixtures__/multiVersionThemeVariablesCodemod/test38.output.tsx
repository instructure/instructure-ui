// @ts-nocheck
// Checkbox variant="toggle": `themeOverride` forwards to ToggleFacade.
// `background` -> `backgroundColor` (non-divergent rename); `checkedBackground` ->
// `checkedBackgroundColor` and `labelFontSizeMedium` -> `labelFontSizeMd` (toggle
// slot names); `labelColor` kept; `labelLineHeight` dropped + warned (no 1:1
// successor - split).
import { Checkbox } from '@instructure/ui-checkbox/v11_7'

const test = () => (
  <Checkbox
    label="x"
    variant="toggle"
    themeOverride={{
      backgroundColor: 'pink',
      checkedBackgroundColor: 'green',
      labelFontSizeMd: '1rem',
      labelColor: 'blue'
    }}
  />
)
