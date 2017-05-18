import { makeTheme } from '../../themeable/registry'

import canvasTheme from './base'
import canvasA11yTheme from './a11y'

export default makeTheme({
  theme: canvasTheme,
  a11y: canvasA11yTheme
})
