import { registerTheme, makeTheme } from '../../../themeable/registry'
import KEYS from '../../keys'

import colors from './colors'
import base from '../base'

const theme = {
  key: KEYS.CANVAS_A11Y,
  accessible: true,
  description: 'This theme meets WCAG 2.0 AA rules for color contrast.',
  variables: {
    ...base.variables,
    colors
  }
}

registerTheme(theme)

export default makeTheme({ theme })
