/* eslint-disable */
import { ApplyTheme } from '@instructure/ui-themeable'

import { InstUISettingsProvider } from '@instructure/emotion'

const fun = () => 'asdf'
let a = (
  <p>
    <InstUISettingsProvider theme={fun()} />
    <InstUISettingsProvider theme={fun()}>
      <span>hello</span>
    </InstUISettingsProvider>
  </p>
)
// some TS code that should not trigger parser/linter errors
type ContentItemError = {
  field: string
  message: string
}
function updateSubmissionAndPageEffects(data?: {
  excuse?: boolean
  latePolicyStatus?: string
  secondsLateOverride?: number
}) {}
