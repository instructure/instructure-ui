/* eslint-disable */
import { ApplyTheme } from '@instructure/ui-themeable'

const fun = () => "asdf"
let a = (
  <p>
    <ApplyTheme theme={fun()} />
    <ApplyTheme theme={fun()}>
      <span>hello</span>
    </ApplyTheme>
  </p>
)
