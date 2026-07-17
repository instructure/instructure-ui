// @ts-nocheck
// Aliased InstUISettingsProvider import (`as P`): relocation + Spinner
// `xSmallBorderWidth` -> `strokeWidthXs` still work when the InstUISettingsProvider is imported
// under an alias.
import { Spinner } from '@instructure/ui-spinner/v11_7'
import { InstUISettingsProvider as P } from '@instructure/emotion'

function test() {
  return (
    <P
      themeOverride={{
        components: { Spinner: { strokeWidthXs: '2rem' } }
      }}
    >
      <Spinner renderTitle="x" />
    </P>
  )
}
