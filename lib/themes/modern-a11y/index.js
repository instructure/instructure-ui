import { registerTheme, makeTheme } from '../../themeable/registry'
import KEYS from '../keys'

import colors from './colors'
import modern from '../modern'

const theme = {
  key: KEYS.MODERN_A11Y,
  variables: {
    ...modern.variables,
    colors
  }
}

registerTheme(theme)

export default makeTheme({ theme })
