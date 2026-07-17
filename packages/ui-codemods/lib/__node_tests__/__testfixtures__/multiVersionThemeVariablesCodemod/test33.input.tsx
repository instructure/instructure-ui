// @ts-nocheck
// Pill per-instance `themeOverride`: `padding` -> `paddingHorizontal` (rename that
// warns), `background` -> `backgroundColor` (silent rename), `primaryColor` removed
// (warns: split into baseTextColor/baseBorderColor).
import { Pill } from '@instructure/ui-pill/v11_7'

const test = () => (
  <Pill
    themeOverride={{
      padding: '0 1rem',
      background: 'pink',
      primaryColor: 'grey'
    }}
  >
    x
  </Pill>
)
