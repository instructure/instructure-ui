// @ts-nocheck

import {
  canvasThemeLocal,
  canvasHighContrastThemeLocal,
  somethingElse
} from '@instructure/ui-themes'
import { canvasThemeLocal as theme } from '@instructure/ui-themes'
import { canvasHighContrastThemeLocal as anotherTheme } from '@instructure/ui-themes'
import * as myThemes from '@instructure/ui-themes'

function asd() {
  const a = canvasThemeLocal
  const b = canvasHighContrastThemeLocal
  const c = canvasThemeLocalCustom
  const d = myThemes.canvasThemeLocal
  const e = myThemes.canvasHighContrastThemeLocal

  canvasThemeLocal()
  canvasHighContrastThemeLocal()

  const { canvasThemeLocal } = myThemes
  const { canvasHighContrastThemeLocal } = myThemes

  return (
    <div>
      <InstUISettingsProvider theme={canvasThemeLocal}>
        <div>asd</div>
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={{
          ...canvasThemeLocal,
          ...{
            typography: { fontFamily: 'monospace' }
          }
        }}
      >
        <div>asd</div>
      </InstUISettingsProvider>
      <InstUISettingsProvider theme={canvasHighContrastThemeLocal}>
        <div>asd</div>
      </InstUISettingsProvider>
      <InstUISettingsProvider
        theme={{
          ...canvasHighContrastThemeLocal,
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
