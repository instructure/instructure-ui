import { makeTheme } from '../themeable/registry'

import canvasTheme from './canvas'
import canvasA11yTheme from './canvas-a11y'
import modernTheme from './modern'
import modernA11yTheme from './modern-a11y'

export const canvas = makeTheme({
  theme: canvasTheme,
  a11y: canvasA11yTheme
})

export const modern = makeTheme({
  theme: modernTheme,
  a11y: modernA11yTheme
})
