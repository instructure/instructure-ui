// @ts-nocheck

import { InstUISettingsProvider as ABC } from '@instructure/emotion'
import { Button } from '@instructure/ui-buttons'

function asd() {
  const a = (
    <ABC
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
    </ABC>
  )

  return (
    <ABC dir="rtl">
      as
      <div dir="rtl">as</div>
    </ABC>
  )
}
