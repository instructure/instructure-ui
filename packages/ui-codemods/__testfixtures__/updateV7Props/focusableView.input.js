/* eslint-disable */
import { FocusableView } from '@instructure/ui-focusable'

const a = (
  <p>
    <FocusableView focused />
    <FocusableView focused={true} />
    <FocusableView focused={false} />
    <FocusableView shape="asdf" />
    <FocusableView color="primary" />
    <FocusableView color="error" />
    <FocusableView color="inverse" />
  </p>
)
