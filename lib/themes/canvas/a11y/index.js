import { registerTheme, makeTheme } from '../../../themeable/registry'
import KEYS from '../../keys'

import colors from './colors'
import base from '../base'

const theme = {
  key: KEYS.CANVAS_A11Y,
  variables: {
    ...base.variables,
    colors
  }
}

registerTheme(theme)

export default makeTheme({ theme })
