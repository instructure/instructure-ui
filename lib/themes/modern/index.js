import { registerTheme } from '../../themeable/registry'

import borders from './borders'
import colors from './colors'
import a11y from './a11y'
import typography from './typography'
import spacing from './spacing'
import forms from './forms'
import media from './media'
import breakpoints from './breakpoints'
import shadows from './shadows'
import stacking from './stacking'

const theme = {
  borders,
  colors,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,
  stacking
}

registerTheme('modern', theme)
registerTheme('modern-a11y', { ...theme, ...a11y })

export default theme
