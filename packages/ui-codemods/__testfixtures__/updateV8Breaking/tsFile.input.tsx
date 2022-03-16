/* eslint-disable */
import { ApplyTheme } from '@instructure/ui-themeable'

const fun = () => 'asdf'
let a = (
  <p>
    <ApplyTheme theme={fun()} />
    <ApplyTheme theme={fun()}>
      <span>hello</span>
    </ApplyTheme>
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
