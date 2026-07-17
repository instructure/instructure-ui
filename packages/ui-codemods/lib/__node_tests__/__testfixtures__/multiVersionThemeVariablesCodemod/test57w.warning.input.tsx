// @ts-nocheck
// Theme-name-scoped override (`theme.themeOverrides.canvas`) on
// InstUISettingsProvider: applies only when the `canvas` theme is active. v2's
// `themeOverride` is unconditional, so this can't be migrated - left untouched and
// warned.
import { Alert } from '@instructure/ui-alerts/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

function test() {
  return (
    <InstUISettingsProvider
      theme={{
        themeOverrides: {
          canvas: {
            componentOverrides: {
              Alert: {
                warningIconBackground: 'deeppink',
                warningBorderColor: 'deeppink'
              }
            }
          }
        }
      }}
    >
      <Alert variant="warning">x</Alert>
    </InstUISettingsProvider>
  )
}
