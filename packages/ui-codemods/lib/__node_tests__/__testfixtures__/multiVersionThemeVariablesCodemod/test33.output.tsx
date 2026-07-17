// @ts-nocheck
// Pill per-instance `themeOverride`: `padding` -> `paddingHorizontal` (rename that
// warns), `background` -> `backgroundColor` (silent rename), `primaryColor` removed
// (warns: split into baseTextColor/baseBorderColor).
import { Pill } from '@instructure/ui-pill/v11_7'

const test = () => (
  <Pill
    themeOverride={{
      paddingHorizontal: '0 1rem',
      backgroundColor: 'pink'
    }}
  >
    x
  </Pill>
)
