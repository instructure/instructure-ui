// @ts-nocheck
// InstUISettingsProvider that has BOTH `theme.componentOverrides` and an opaque
// (non-object-literal) `themeOverride` prop. The overrides can't be merged into an
// opaque `themeOverride`, and adding a second `themeOverride` attribute would be
// invalid JSX (the later one silently wins), so the relocation is skipped: the
// componentOverrides stay on `theme` and a warning is emitted. Token renames still
// apply in place: `requiredInvalidColor` -> `asteriskColor`.
import { Checkbox } from '@instructure/ui-checkbox/v11_7'
import { InstUISettingsProvider } from '@instructure/emotion'

const extraOverride = { transitions: { duration: '1s' } }

function test() {
  return (
    <InstUISettingsProvider
      theme={{ componentOverrides: { Checkbox: { asteriskColor: 'red' } } }}
      themeOverride={extraOverride}
    >
      <Checkbox label="x" />
    </InstUISettingsProvider>
  )
}
