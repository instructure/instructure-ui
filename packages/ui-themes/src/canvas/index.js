import { makeTheme } from '@instructure/ui-themeable/lib/registry'

import theme from './base'
import highContrast from './high-contrast'

export default makeTheme({
  theme,
  a11y: highContrast
})
