import { makeTheme } from '../../themeable/registry'

import modernTheme from './base'
import modernA11yTheme from './a11y'

export default makeTheme({
  theme: modernTheme,
  a11y: modernA11yTheme
})
