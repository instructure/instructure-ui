// @ts-nocheck

import {
  canvasTheme,
  canvasHighContrastTheme,
  somethingElse
} from '@instructure/ui-themes'
import { canvasTheme as theme } from '@instructure/ui-themes'
import { canvasHighContrastTheme as anotherTheme } from '@instructure/ui-themes'
import * as myThemes from '@instructure/ui-themes'

function asd() {
  const a = canvasTheme
  const b = canvasHighContrastTheme
  const c = canvasThemeLocalCustom
  const d = myThemes.canvasTheme
  const e = myThemes.canvasHighContrastTheme

  canvasTheme()
  canvasHighContrastTheme()

  const { canvasTheme } = myThemes
  const { canvasHighContrastTheme } = myThemes

  return (
    <div>
      <InstUISettingsProvider theme={canvasTheme}>
        <div>asd</div>
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={{
          ...canvasTheme,
          ...{
            typography: { fontFamily: 'monospace' }
          }
        }}
      >
        <div>asd</div>
      </InstUISettingsProvider>
      <InstUISettingsProvider theme={canvasHighContrastTheme}>
        <div>asd</div>
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={{
          ...canvasHighContrastTheme,
          ...{
            typography: { fontFamily: 'monospace' }
          }
        }}
      >
        <div>asd</div>
      </InstUISettingsProvider>
    </div>
  )
}
