// @ts-nocheck

import { InstUISettingsProvider } from '@instructure/emotion'
import { Button } from '@instructure/ui-buttons'

function asd() {
  const aaa = { as: 34 }
  const a = (
    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          AppNav: { borderWidth: 0 },
          'AppNav.Item': {
            as: 23,
            fontWeight: 400,
            textColor: 'white',
            textColorSelected: 'white'
          }
        }
      }}
    >
      as
      <Button as="div" />
    </InstUISettingsProvider>
  )

  return (
    <InstUISettingsProvider dir="rtl" {...aaa}>
      as
      <div dir="rtl">as</div>
    </InstUISettingsProvider>
  )
}
