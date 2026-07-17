// @ts-nocheck
// Version gating (per-instance): only the v2 import (`/v11_7`) Spinner is migrated
// (`xSmallBorderWidth` -> `strokeWidthXs`). The v1 (bare) Spinner uses the old
// theming and its `themeOverride` is left untouched.
import { Spinner } from '@instructure/ui-spinner'
import { Spinner as SpinnerV2 } from '@instructure/ui-spinner/v11_7'

const test = () => (
  <div>
    <Spinner renderTitle="v1" themeOverride={{ xSmallBorderWidth: '1rem' }} />
    <SpinnerV2 renderTitle="v2" themeOverride={{ xSmallBorderWidth: '2rem' }} />
  </div>
)
