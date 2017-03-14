import { registerTheme, makeTheme } from '../../themeable/registry'
import KEYS from '../keys'

import colors from './colors'
import canvas from '../canvas'

const theme = {
  key: KEYS.CANVAS_A11Y,
  variables: {
    ...canvas.variables,
    colors
  }
}

registerTheme(theme)

export default makeTheme({ theme })
