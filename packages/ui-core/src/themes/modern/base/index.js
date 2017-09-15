import { registerTheme, makeTheme } from '../../../themeable/registry'
import KEYS from '../../keys'

import borders from './borders'
import colors from './colors'
import typography from './typography'
import spacing from './spacing'
import forms from './forms'
import media from './media'
import breakpoints from './breakpoints'
import shadows from './shadows'
import stacking from './stacking'

const theme = {
  key: KEYS.MODERN,
  variables: {
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
}

registerTheme(theme)

export default makeTheme({ theme })
