// @ts-nocheck
// A mapped component with a spread ({...props}) and NO explicit `themeOverride`: a
// `themeOverride` could be hidden in the spread, so a warning is emitted (its tokens
// can't be inspected/migrated). No transform change.
import { Spinner } from '@instructure/ui-spinner/v11_7'

const test = (props) => <Spinner {...props} renderTitle="x" />
